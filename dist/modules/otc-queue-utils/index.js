define("@modules/otc-queue-utils", ["require", "exports", "@modules/global", "@ijstech/eth-wallet", "@modules/store", "@scom/oswap-openswap-contract", "@scom/scom-commission-proxy-contract", "@scom/oswap-chainlink-contract", "@ijstech/components"], function (require, exports, global_1, eth_wallet_1, store_1, oswap_openswap_contract_1, scom_commission_proxy_contract_1, oswap_chainlink_contract_1, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getHybridRouterAddress = exports.getTokenPrice = exports.getTokens = exports.getOffers = exports.executeSell = void 0;
    const TRADE_FEE = { fee: '20', base: '1000' };
    const getHybridRouterAddress = () => {
        let Address = store_1.getAddresses(store_1.getChainId());
        return Address['OSWAP_HybridRouter2'];
    };
    exports.getHybridRouterAddress = getHybridRouterAddress;
    const getAddressByKey = (key) => {
        let Address = store_1.getAddresses(store_1.getChainId());
        return Address[key];
    };
    const getTokenObjectByAddress = (address) => {
        let chainId = store_1.getChainId();
        if (address.toLowerCase() === getAddressByKey('WETH9').toLowerCase()) {
            return store_1.getWETH(chainId);
        }
        let tokenMap = store_1.getTokenMap();
        return tokenMap[address.toLowerCase()];
    };
    const getTokens = async (pairAddress) => {
        let token0 = '';
        let token1 = '';
        try {
            const pair = new oswap_openswap_contract_1.Contracts.OSWAP_OtcPair(eth_wallet_1.Wallet.getClientInstance(), pairAddress);
            token0 = await pair.token0();
            token1 = await pair.token1();
        }
        catch (_a) { }
        ;
        return {
            token0,
            token1
        };
    };
    exports.getTokens = getTokens;
    const getTokenPrice = async (token) => {
        let wallet = eth_wallet_1.Wallet.getClientInstance();
        let chainId = wallet.chainId;
        let tokenPrice;
        // get price from price feed 
        let tokenPriceFeedAddress = store_1.ToUSDPriceFeedAddressesMap[chainId][token.toLowerCase()];
        if (tokenPriceFeedAddress) {
            let aggregator = new oswap_chainlink_contract_1.Contracts.EACAggregatorProxy(wallet, tokenPriceFeedAddress);
            let tokenLatestRoundData = await aggregator.latestRoundData();
            let tokenPriceFeedDecimals = await aggregator.decimals();
            return tokenLatestRoundData.answer.shiftedBy(-tokenPriceFeedDecimals).toFixed();
        }
        // get price from AMM
        let referencePair = store_1.tokenPriceAMMReference[chainId][token.toLowerCase()];
        if (!referencePair)
            return null;
        let pair = new oswap_openswap_contract_1.Contracts.OSWAP_Pair(wallet, referencePair);
        let token0 = await pair.token0();
        let token1 = await pair.token1();
        let reserves = await pair.getReserves();
        let token0PriceFeedAddress = store_1.ToUSDPriceFeedAddressesMap[chainId][token0.toLowerCase()];
        let token1PriceFeedAddress = store_1.ToUSDPriceFeedAddressesMap[chainId][token1.toLowerCase()];
        if (token0PriceFeedAddress || token1PriceFeedAddress) {
            if (token0PriceFeedAddress) {
                let aggregator = new oswap_chainlink_contract_1.Contracts.EACAggregatorProxy(wallet, token0PriceFeedAddress);
                let token0LatestRoundData = await aggregator.latestRoundData();
                let token0PriceFeedDecimals = await aggregator.decimals();
                let token0USDPrice = new eth_wallet_1.BigNumber(token0LatestRoundData.answer).shiftedBy(-token0PriceFeedDecimals).toFixed();
                if (new eth_wallet_1.BigNumber(token.toLowerCase()).lt(token0.toLowerCase())) {
                    tokenPrice = new eth_wallet_1.BigNumber(reserves._reserve1).div(reserves._reserve0).times(token0USDPrice).toFixed();
                }
                else {
                    tokenPrice = new eth_wallet_1.BigNumber(reserves._reserve0).div(reserves._reserve1).times(token0USDPrice).toFixed();
                }
            }
            else {
                let aggregator = new oswap_chainlink_contract_1.Contracts.EACAggregatorProxy(wallet, token1PriceFeedAddress);
                let token1LatestRoundData = await aggregator.latestRoundData();
                let token1PriceFeedDecimals = await aggregator.decimals();
                let token1USDPrice = new eth_wallet_1.BigNumber(token1LatestRoundData.answer).shiftedBy(-token1PriceFeedDecimals).toFixed();
                if (new eth_wallet_1.BigNumber(token.toLowerCase()).lt(token1.toLowerCase())) {
                    tokenPrice = new eth_wallet_1.BigNumber(reserves._reserve1).div(reserves._reserve0).times(token1USDPrice).toFixed();
                }
                else {
                    tokenPrice = new eth_wallet_1.BigNumber(reserves._reserve0).div(reserves._reserve1).times(token1USDPrice).toFixed();
                }
            }
        }
        else {
            if (token0.toLowerCase() == token.toLowerCase()) { //for other reference pair
                let token1Price = await getTokenPrice(token1);
                if (!token1Price)
                    return null;
                tokenPrice = new eth_wallet_1.BigNumber(token1Price).times(reserves._reserve1).div(reserves._reserve0).toFixed();
            }
            else {
                let token0Price = await getTokenPrice(token0);
                if (!token0Price)
                    return null;
                tokenPrice = new eth_wallet_1.BigNumber(token0Price).times(reserves._reserve0).div(reserves._reserve1).toFixed();
            }
        }
        return tokenPrice;
    };
    exports.getTokenPrice = getTokenPrice;
    function toTokenAmount(token, amount) {
        return (eth_wallet_1.BigNumber.isBigNumber(amount) ? amount : new eth_wallet_1.BigNumber(amount.toString())).shiftedBy(Number(token.decimals)).decimalPlaces(0, eth_wallet_1.BigNumber.ROUND_FLOOR);
    }
    const mapTokenObjectSet = (obj) => {
        var _a;
        let chainId = store_1.getChainId();
        const WETH9 = store_1.getWETH(chainId);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!((_a = obj[key]) === null || _a === void 0 ? void 0 : _a.address))
                    obj[key] = WETH9;
            }
        }
        return obj;
    };
    const hybridTradeExactIn = async (wallet, path, pairs, amountIn, amountOutMin, toAddress, deadline, data, commissionFee, commissionFeeTo, callback, confirmationCallback) => {
        if (path.length < 2) {
            return null;
        }
        let tokenIn = path[0];
        let tokenOut = path[path.length - 1];
        const hybridRouterAddress = getHybridRouterAddress();
        const hybridRouter = new oswap_openswap_contract_1.Contracts.OSWAP_HybridRouter2(wallet, hybridRouterAddress);
        const proxyAddress = store_1.getProxyAddress();
        const proxy = new scom_commission_proxy_contract_1.Contracts.Proxy(wallet, proxyAddress);
        const amount = tokenIn.address ? eth_wallet_1.Utils.toDecimals(amountIn, tokenIn.decimals).dp(0) : eth_wallet_1.Utils.toDecimals(amountIn).dp(0);
        const _amountOutMin = eth_wallet_1.Utils.toDecimals(amountOutMin, tokenOut.decimals).dp(0);
        const _commissions = [];
        let commissionsAmount = new eth_wallet_1.BigNumber(0);
        if (commissionFee && commissionFeeTo) {
            commissionsAmount = eth_wallet_1.Utils.toDecimals(commissionFee, tokenIn.decimals).dp(0);
            _commissions.push({
                to: commissionFeeTo,
                amount: commissionsAmount
            });
        }
        let receipt;
        if (!tokenIn.address) {
            const params = {
                amountOutMin: _amountOutMin,
                pair: pairs,
                to: toAddress,
                deadline,
                data
            };
            if (_commissions.length == 0) {
                receipt = await hybridRouter.swapExactETHForTokens(params, amount);
            }
            else {
                const txData = await hybridRouter.swapExactETHForTokens.txData(params, amount);
                receipt = await proxy.proxyCall({
                    target: hybridRouterAddress,
                    tokensIn: [
                        {
                            token: eth_wallet_1.Utils.nullAddress,
                            amount: amount.plus(commissionsAmount),
                            directTransfer: false,
                            commissions: _commissions
                        }
                    ],
                    data: txData,
                    to: wallet.address,
                    tokensOut: []
                });
            }
        }
        else {
            const tokensIn = {
                token: tokenIn.address,
                amount: amount.plus(commissionsAmount),
                directTransfer: false,
                commissions: _commissions
            };
            const params = {
                amountIn: amount,
                amountOutMin: _amountOutMin,
                pair: pairs,
                to: toAddress,
                deadline,
                data
            };
            if (_commissions.length == 0) {
                if (!tokenOut.address) {
                    receipt = await hybridRouter.swapExactTokensForETH(params);
                }
                else {
                    receipt = await hybridRouter.swapExactTokensForTokens(Object.assign(Object.assign({}, params), { tokenIn: tokenIn.address }));
                }
            }
            else {
                let txData;
                let tokensOutAddress;
                if (!tokenOut.address) {
                    txData = await hybridRouter.swapExactTokensForETH.txData(params);
                    tokensOutAddress = eth_wallet_1.Utils.nullAddress;
                }
                else {
                    txData = await hybridRouter.swapExactTokensForTokens.txData(Object.assign(Object.assign({}, params), { tokenIn: tokenIn.address }));
                    tokensOutAddress = tokenOut.address;
                }
                receipt = await proxy.proxyCall({
                    target: hybridRouterAddress,
                    tokensIn: [
                        tokensIn
                    ],
                    data: txData,
                    to: wallet.address,
                    tokensOut: []
                });
            }
        }
        return receipt;
    };
    const getGroupQueueItemsForTrader = async (pairAddress, tokenIn, tokenOut) => {
        let wallet = store_1.getWallet();
        let chainId = store_1.getChainId();
        const nativeToken = store_1.getChainNativeToken(chainId);
        var direction = new eth_wallet_1.BigNumber(tokenIn.address.toLowerCase()).lt(tokenOut.address.toLowerCase());
        let trader = wallet.address;
        const pairContract = new oswap_openswap_contract_1.Contracts.OSWAP_OtcPair(wallet, pairAddress);
        let traderOffer = await pairContract.getTraderOffer({ trader, direction, start: 0, length: 100 });
        let amounts = traderOffer.amountAndPrice.slice(0, traderOffer.amountAndPrice.length / 2);
        let prices = traderOffer.amountAndPrice.slice(traderOffer.amountAndPrice.length / 2, traderOffer.amountAndPrice.length);
        let startDates = traderOffer.startDateAndExpire.slice(0, traderOffer.startDateAndExpire.length / 2);
        let endDates = traderOffer.startDateAndExpire.slice(traderOffer.startDateAndExpire.length / 2, traderOffer.startDateAndExpire.length);
        let locked = traderOffer.lockedAndAllowAll.slice(0, traderOffer.lockedAndAllowAll.length);
        let queueArr = [];
        let tradeFeeObj = TRADE_FEE;
        let tradeFee = new eth_wallet_1.BigNumber(tradeFeeObj.base).minus(tradeFeeObj.fee).div(tradeFeeObj.base).toFixed();
        const WETH9Address = getAddressByKey('WETH9');
        const isTokenInNative = tokenIn.address.toLowerCase() == WETH9Address.toLowerCase();
        const isTokenOutNative = tokenOut.address.toLowerCase() == WETH9Address.toLowerCase();
        for (let i = 0; i < amounts.length; i++) {
            if (amounts[i].eq("0"))
                continue;
            let allocation = await getGroupQueueAllocation(trader, traderOffer.index[i].toFixed(), pairAddress, tokenIn, tokenOut);
            if (allocation.eq("0"))
                continue;
            let tokenOutAvailable = new eth_wallet_1.BigNumber(amounts[i]).gt(new eth_wallet_1.BigNumber(allocation)) ? allocation : amounts[i];
            let tokenInAvailable = new eth_wallet_1.BigNumber(tokenOutAvailable).dividedBy(new eth_wallet_1.BigNumber(prices[i])).shiftedBy(18 - tokenOut.decimals).dividedBy(new eth_wallet_1.BigNumber(tradeFee)).decimalPlaces(tokenIn.decimals, 1).toFixed();
            queueArr.push({
                pairAddress,
                tokenIn: isTokenInNative ? nativeToken.symbol : tokenIn.address,
                tokenOut: isTokenOutNative ? nativeToken.symbol : tokenOut.address,
                index: traderOffer.index[i],
                provider: traderOffer.provider[i],
                amount: amounts[i],
                allocation,
                tokenInAvailable,
                price: prices[i],
                start: startDates[i].toNumber() * 1000,
                expire: endDates[i].toNumber() * 1000,
                allowAll: false,
                locked: locked[i],
                tradeFee
            });
        }
        return queueArr.filter(v => components_1.moment().isBetween(v.start, v.expire));
    };
    const getGroupQueueItemsForAllowAll = async (pairAddress, tokenIn, tokenOut) => {
        let wallet = store_1.getWallet();
        let chainId = store_1.getChainId();
        const nativeToken = store_1.getChainNativeToken(chainId);
        var direction = new eth_wallet_1.BigNumber(tokenIn.address.toLowerCase()).lt(tokenOut.address.toLowerCase());
        const oracleContract = new oswap_openswap_contract_1.Contracts.OSWAP_OtcPair(wallet, pairAddress);
        let allOffer = await oracleContract.getOffers({ direction, start: 0, length: 100 });
        let amounts = allOffer.amountAndPrice.slice(0, allOffer.amountAndPrice.length / 2);
        let prices = allOffer.amountAndPrice.slice(allOffer.amountAndPrice.length / 2, allOffer.amountAndPrice.length);
        let startDates = allOffer.startDateAndExpire.slice(0, allOffer.startDateAndExpire.length / 2);
        let endDates = allOffer.startDateAndExpire.slice(allOffer.startDateAndExpire.length / 2, allOffer.startDateAndExpire.length);
        let allowAll = allOffer.lockedAndAllowAll.slice(allOffer.lockedAndAllowAll.length / 2, allOffer.lockedAndAllowAll.length);
        let locked = allOffer.lockedAndAllowAll.slice(0, allOffer.lockedAndAllowAll.length);
        let queueArr = [];
        let tradeFeeObj = TRADE_FEE;
        let tradeFee = new eth_wallet_1.BigNumber(tradeFeeObj.base).minus(tradeFeeObj.fee).div(tradeFeeObj.base).toFixed();
        const WETH9Address = getAddressByKey('WETH9');
        const isTokenInNative = tokenIn.address.toLowerCase() == WETH9Address.toLowerCase();
        const isTokenOutNative = tokenOut.address.toLowerCase() == WETH9Address.toLowerCase();
        for (let i = 0; i < amounts.length; i++) {
            let tokenOutAvailable = amounts[i];
            let tokenInAvailable = tokenOutAvailable.dividedBy(prices[i]).shiftedBy(18 - tokenOut.decimals).dividedBy(new eth_wallet_1.BigNumber(tradeFee)).decimalPlaces(tokenIn.decimals, 1).toFixed();
            queueArr.push({
                pairAddress,
                tokenIn: isTokenInNative ? nativeToken.symbol : tokenIn.address,
                tokenOut: isTokenOutNative ? nativeToken.symbol : tokenOut.address,
                index: allOffer.index[i],
                provider: allOffer.provider[i],
                amount: amounts[i],
                allocation: amounts[i],
                tokenInAvailable,
                price: prices[i],
                start: startDates[i].toNumber() * 1000,
                expire: endDates[i].toNumber() * 1000,
                allowAll: allowAll[i],
                locked: locked[i],
                tradeFee
            });
        }
        return queueArr.filter(v => (components_1.moment().isBetween(v.start, v.expire) && v.allowAll == true));
    };
    const getGroupQueueAllocation = async (traderAddress, offerIndex, pairAddress, tokenIn, tokenOut) => {
        let direction = new eth_wallet_1.BigNumber(tokenIn.address.toLowerCase()).lt(tokenOut.address.toLowerCase());
        return await new oswap_openswap_contract_1.Contracts.OSWAP_OtcPair(store_1.getWallet(), pairAddress).traderAllocation({ param1: direction, param2: Number(offerIndex), param3: traderAddress });
    };
    const getGroupQueueTraderDataObj = async (pairAddress, tokenIn, tokenOut, amountIn, offerIndex) => {
        let tokens = mapTokenObjectSet({ tokenIn, tokenOut });
        let tokenAmountIn = toTokenAmount(tokens.tokenIn, amountIn).toFixed();
        let tradeFeeObj = TRADE_FEE;
        let tradeFee = new eth_wallet_1.BigNumber(tradeFeeObj.base).minus(tradeFeeObj.fee).div(tradeFeeObj.base).toFixed();
        let queueArr = await getGroupQueueItemsForTrader(pairAddress, tokens.tokenIn, tokens.tokenOut);
        let queueAll = await getGroupQueueItemsForAllowAll(pairAddress, tokens.tokenIn, tokens.tokenOut);
        queueArr = queueArr.concat(queueAll);
        queueArr = queueArr.map(v => {
            return Object.assign(Object.assign({}, v), { amountIn: new eth_wallet_1.BigNumber(tokenAmountIn).shiftedBy(-tokens.tokenIn.decimals).toFixed(), amountOut: new eth_wallet_1.BigNumber(tokenAmountIn).times(v.price).shiftedBy(-18 - Number(tokens.tokenIn.decimals) + Number(tokens.tokenOut.decimals)).times(tradeFee).toFixed() });
        }).filter(v => new eth_wallet_1.BigNumber(v.tokenInAvailable).gte(new eth_wallet_1.BigNumber(v.amountIn))).sort((a, b) => new eth_wallet_1.BigNumber(b.amountOut).minus(a.amountOut).toNumber());
        if (queueArr.length == 0) {
            return {
                sufficientLiquidity: false
            };
        }
        let ratioArr = [global_1.toWeiInv('1')];
        let queueItem;
        if (offerIndex) {
            queueItem = queueArr.find(o => o.index.eq(offerIndex));
            if (!queueItem)
                return null;
        }
        else {
            queueItem = queueArr[0];
        }
        let indexArr = [queueItem.index];
        let amountOut = queueItem.amount; //was amountOut
        let price = new eth_wallet_1.BigNumber(1).shiftedBy(18).div(queueItem.price).toFixed();
        let priceSwap = new eth_wallet_1.BigNumber(queueItem.price).shiftedBy(-18).toFixed();
        let data = "0x" + global_1.numberToBytes32((indexArr.length * 2 + 1) * 32) + global_1.numberToBytes32(indexArr.length) + indexArr.map(e => global_1.numberToBytes32(e)).join('') + ratioArr.map(e => global_1.numberToBytes32(e)).join('');
        return {
            sufficientLiquidity: true,
            price: parseFloat(price),
            priceSwap: parseFloat(priceSwap),
            amountIn,
            amountOut: new eth_wallet_1.BigNumber(amountOut).shiftedBy(-tokens.tokenOut.decimals).toFixed(),
            data,
            tradeFeeObj
        };
    };
    const getOffers = async (params) => {
        const { pairAddress, direction, offerIndex } = params;
        const pair = new oswap_openswap_contract_1.Contracts.OSWAP_OtcPair(eth_wallet_1.Wallet.getClientInstance(), pairAddress);
        const tokens = await getTokens(pairAddress);
        let tokenIn;
        let tokenOut;
        if (direction) {
            tokenIn = getTokenObjectByAddress(tokens.token0);
            tokenOut = getTokenObjectByAddress(tokens.token1);
        }
        else {
            tokenIn = getTokenObjectByAddress(tokens.token1);
            tokenOut = getTokenObjectByAddress(tokens.token0);
        }
        const offer = await pair.offers({
            param1: direction,
            param2: Number(offerIndex)
        });
        const originalAmount = new eth_wallet_1.BigNumber(offer.originalAmount).shiftedBy(-Number(tokenIn.decimals));
        const amount = new eth_wallet_1.BigNumber(offer.amount);
        const tradeFee = new eth_wallet_1.BigNumber(TRADE_FEE.base).minus(TRADE_FEE.fee).div(TRADE_FEE.base).toFixed();
        const restrictedPrice = new eth_wallet_1.BigNumber(offer.restrictedPrice).shiftedBy(-18).toFixed();
        const offerPrice = global_1.toWeiInv(restrictedPrice).shiftedBy(-18).toFixed();
        const offerInfo = Object.assign(Object.assign({ pairAddress, totalAmount: new eth_wallet_1.BigNumber(originalAmount).times(offerPrice).dividedBy(tradeFee), availableAmount: new eth_wallet_1.BigNumber(amount).times(new eth_wallet_1.BigNumber(1).shiftedBy(18)).idiv(offer.restrictedPrice).shiftedBy(-Number(tokenIn.decimals)), tradeFee,
            offerIndex }, offer), { startDate: new eth_wallet_1.BigNumber(offer.startDate).multipliedBy(1000).toNumber(), expire: new eth_wallet_1.BigNumber(offer.expire).multipliedBy(1000).toNumber(), offerPrice, restrictedPrice: restrictedPrice, tokenIn,
            tokenOut });
        return offerInfo;
    };
    exports.getOffers = getOffers;
    const executeSell = async (swapData) => {
        let receipt = null;
        const wallet = store_1.getWallet();
        try {
            const toAddress = wallet.account.address;
            const slippageTolerance = store_1.getSlippageTolerance();
            const transactionDeadlineInMinutes = store_1.getTransactionDeadline();
            const transactionDeadline = Math.floor(Date.now() / 1000 + transactionDeadlineInMinutes * 60);
            if (swapData.provider === "RestrictedOracle") {
                const obj = await getGroupQueueTraderDataObj(swapData.pairs[0], swapData.routeTokens[0], swapData.routeTokens[1], swapData.fromAmount.toFixed(), swapData.offerIndex);
                if (!obj || !obj.data)
                    return {
                        receipt: null,
                        error: { message: "No data from Group Queue Trader" },
                    };
                const data = obj.data;
                const amountOutMin = swapData.toAmount.times(1 - slippageTolerance / 100);
                receipt = await hybridTradeExactIn(wallet, swapData.routeTokens, swapData.pairs, swapData.fromAmount.toFixed(), amountOutMin.toFixed(), toAddress, transactionDeadline, data, swapData.commissionFee, swapData.commissionFeeTo);
            }
        }
        catch (error) {
            return { receipt: null, error: error };
        }
        return { receipt, error: null };
    };
    exports.executeSell = executeSell;
});
