import {
  toWeiInv,
  ITokenObject,
  numberToBytes32,
  ICommissionInfo,
} from '@modules/global';
import { BigNumber, TransactionReceipt, Utils, Wallet } from '@ijstech/eth-wallet';
import {
  getAddresses,
  ToUSDPriceFeedAddressesMap,
  tokenPriceAMMReference,
  getChainId,
  getTokenMap,
  IOTCQueueConfig,
  getWETH,
  getWallet,
  getSlippageTolerance,
  getTransactionDeadline,
  getChainNativeToken,
  QueueOfferDetail,
  SwapData,
  getProxyAddress,
} from '@modules/store';
import { Contracts } from '@scom/oswap-openswap-contract';
import { Contracts as ProxyContracts } from '@scom/commission-proxy';
import { Contracts as ChainLinkContracts } from '@scom/oswap-chainlink-contract';
import { moment } from '@ijstech/components';

const TRADE_FEE = { fee: '20', base: '1000' };

const getHybridRouterAddress = (): string => {
  let Address = getAddresses(getChainId());
  return Address['OSWAP_HybridRouter2'];
};

const getAddressByKey = (key: string) => {
  let Address = getAddresses(getChainId());
  return Address[key];
}

const getTokenObjectByAddress = (address: string) => {
  let chainId = getChainId();
  if (address.toLowerCase() === getAddressByKey('WETH9').toLowerCase()) {
    return getWETH(chainId);
  }
  let tokenMap = getTokenMap();
  return tokenMap[address.toLowerCase()] as ITokenObject;
}

const getTokens = async (pairAddress: string) => {
  let token0 = '';
  let token1 = '';
  try {
    const pair = new Contracts.OSWAP_OtcPair(Wallet.getClientInstance(), pairAddress);
    token0 = await pair.token0();
    token1 = await pair.token1();
  } catch { };
  return {
    token0,
    token1
  }
}

const getTokenPrice = async (token: string) => { // in USD value
  let wallet = Wallet.getClientInstance();
  let chainId = wallet.chainId;
  let tokenPrice: string;

  // get price from price feed 
  let tokenPriceFeedAddress = ToUSDPriceFeedAddressesMap[chainId][token.toLowerCase()];
  if (tokenPriceFeedAddress) {
    let aggregator = new ChainLinkContracts.EACAggregatorProxy(wallet, tokenPriceFeedAddress);
    let tokenLatestRoundData = await aggregator.latestRoundData();
    let tokenPriceFeedDecimals = await aggregator.decimals();
    return tokenLatestRoundData.answer.shiftedBy(-tokenPriceFeedDecimals).toFixed();
  }

  // get price from AMM
  let referencePair = tokenPriceAMMReference[chainId][token.toLowerCase()]
  if (!referencePair) return null;
  let pair = new Contracts.OSWAP_Pair(wallet, referencePair);
  let token0 = await pair.token0();
  let token1 = await pair.token1();
  let reserves = await pair.getReserves()
  let token0PriceFeedAddress = ToUSDPriceFeedAddressesMap[chainId][token0.toLowerCase()]
  let token1PriceFeedAddress = ToUSDPriceFeedAddressesMap[chainId][token1.toLowerCase()]

  if (token0PriceFeedAddress || token1PriceFeedAddress) {
    if (token0PriceFeedAddress) {
      let aggregator = new ChainLinkContracts.EACAggregatorProxy(wallet, token0PriceFeedAddress);
      let token0LatestRoundData = await aggregator.latestRoundData();
      let token0PriceFeedDecimals = await aggregator.decimals();
      let token0USDPrice = new BigNumber(token0LatestRoundData.answer).shiftedBy(-token0PriceFeedDecimals).toFixed();
      if (new BigNumber(token.toLowerCase()).lt(token0.toLowerCase())) {
        tokenPrice = new BigNumber(reserves._reserve1).div(reserves._reserve0).times(token0USDPrice).toFixed()
      } else {
        tokenPrice = new BigNumber(reserves._reserve0).div(reserves._reserve1).times(token0USDPrice).toFixed()
      }
    } else {
      let aggregator = new ChainLinkContracts.EACAggregatorProxy(wallet, token1PriceFeedAddress);
      let token1LatestRoundData = await aggregator.latestRoundData();
      let token1PriceFeedDecimals = await aggregator.decimals();
      let token1USDPrice = new BigNumber(token1LatestRoundData.answer).shiftedBy(-token1PriceFeedDecimals).toFixed();
      if (new BigNumber(token.toLowerCase()).lt(token1.toLowerCase())) {
        tokenPrice = new BigNumber(reserves._reserve1).div(reserves._reserve0).times(token1USDPrice).toFixed()
      } else {
        tokenPrice = new BigNumber(reserves._reserve0).div(reserves._reserve1).times(token1USDPrice).toFixed()
      }
    }
  } else {
    if (token0.toLowerCase() == token.toLowerCase()) {//for other reference pair
      let token1Price = await getTokenPrice(token1);
      if (!token1Price) return null;
      tokenPrice = new BigNumber(token1Price).times(reserves._reserve1).div(reserves._reserve0).toFixed()
    } else {
      let token0Price = await getTokenPrice(token0);
      if (!token0Price) return null;
      tokenPrice = new BigNumber(token0Price).times(reserves._reserve0).div(reserves._reserve1).toFixed()
    }
  }
  return tokenPrice;
}

function toTokenAmount(token: any, amount: any) {
  return (BigNumber.isBigNumber(amount) ? amount : new BigNumber(amount.toString())).shiftedBy(Number(token.decimals)).decimalPlaces(0, BigNumber.ROUND_FLOOR);
}

const mapTokenObjectSet = (obj: any) => {
  let chainId = getChainId();
  const WETH9 = getWETH(chainId);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!obj[key]?.address) obj[key] = WETH9;
    }
  }
  return obj;
}

const hybridTradeExactIn = async (wallet: Wallet, path: any[], pairs: string[], amountIn: string, amountOutMin: string, toAddress: string, deadline: number, data: string, commissions: ICommissionInfo[], callback?: any, confirmationCallback?: any) => {
  if (path.length < 2) {
    return null;
  }
  let tokenIn = path[0];
  let tokenOut = path[path.length - 1];
  const hybridRouterAddress = getHybridRouterAddress();
  const hybridRouter = new Contracts.OSWAP_HybridRouter2(wallet, hybridRouterAddress);
  const proxyAddress = getProxyAddress();
  const proxy = new ProxyContracts.Proxy(wallet, proxyAddress);
  const amount = tokenIn.address ? Utils.toDecimals(amountIn, tokenIn.decimals).dp(0) : Utils.toDecimals(amountIn).dp(0);
  const _amountOutMin = Utils.toDecimals(amountOutMin, tokenOut.decimals).dp(0);
  const _commissions = (commissions || []).map(v => {
    return {
      to: v.walletAddress,
      amount: amount.times(v.share).dp(0)
    }
  });
  const commissionsAmount = _commissions.length ? _commissions.map(v => v.amount).reduce((a, b) => a.plus(b)) : new BigNumber(0);
  let receipt: any;
  if (!tokenIn.address) {
    const params = {
      amountOutMin: _amountOutMin,
      pair: pairs,
      to: toAddress,
      deadline,
      data
    };
    const txData = await hybridRouter.swapExactETHForTokens.txData(params, amount);
    await proxy.ethIn({
      target: hybridRouterAddress,
      commissions: _commissions,
      data: txData
    });
  } else {
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
    let txData: string;
    if (!tokenOut.address) {
      txData = await hybridRouter.swapExactTokensForETH.txData(params);
    } else {
      txData = await hybridRouter.swapExactTokensForTokens.txData({
        ...params,
        tokenIn: tokenIn.address
      });
    }
    receipt = await proxy.tokenIn({
      target: hybridRouterAddress,
      tokensIn,
      data: txData
    });
  }
  return receipt;
}

const getGroupQueueItemsForTrader = async (pairAddress: string, tokenIn: any, tokenOut: any): Promise<QueueOfferDetail[]> => {
  let wallet = getWallet();
  let chainId = getChainId();
  const nativeToken = getChainNativeToken(chainId);
  var direction = new BigNumber(tokenIn.address.toLowerCase()).lt(tokenOut.address.toLowerCase());
  let trader = wallet.address;
  const pairContract = new Contracts.OSWAP_OtcPair(wallet, pairAddress);
  let traderOffer = await pairContract.getTraderOffer({ trader, direction, start: 0, length: 100 });
  let amounts = traderOffer.amountAndPrice.slice(0, traderOffer.amountAndPrice.length / 2);
  let prices = traderOffer.amountAndPrice.slice(traderOffer.amountAndPrice.length / 2, traderOffer.amountAndPrice.length);
  let startDates = traderOffer.startDateAndExpire.slice(0, traderOffer.startDateAndExpire.length / 2);
  let endDates = traderOffer.startDateAndExpire.slice(traderOffer.startDateAndExpire.length / 2, traderOffer.startDateAndExpire.length);
  let locked = traderOffer.lockedAndAllowAll.slice(0, traderOffer.lockedAndAllowAll.length);
  let queueArr: QueueOfferDetail[] = [];
  let tradeFeeObj = TRADE_FEE;
  let tradeFee = new BigNumber(tradeFeeObj.base).minus(tradeFeeObj.fee).div(tradeFeeObj.base).toFixed();
  const WETH9Address = getAddressByKey('WETH9');
  const isTokenInNative = tokenIn.address.toLowerCase() == WETH9Address.toLowerCase();
  const isTokenOutNative = tokenOut.address.toLowerCase() == WETH9Address.toLowerCase();

  for (let i = 0; i < amounts.length; i++) {
    if (amounts[i].eq("0")) continue;
    let allocation = await getGroupQueueAllocation(trader, traderOffer.index[i].toNumber(), pairAddress, tokenIn, tokenOut);
    if (allocation.eq("0")) continue;
    let tokenOutAvailable = new BigNumber(amounts[i]).gt(new BigNumber(allocation)) ? allocation : amounts[i]
    let tokenInAvailable = new BigNumber(tokenOutAvailable).dividedBy(new BigNumber(prices[i])).shiftedBy(18 - tokenOut.decimals).dividedBy(new BigNumber(tradeFee)).decimalPlaces(tokenIn.decimals, 1).toFixed();
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
  return queueArr.filter(v => moment().isBetween(v.start, v.expire));
}

const getGroupQueueItemsForAllowAll = async (pairAddress: string, tokenIn: any, tokenOut: any): Promise<QueueOfferDetail[]> => {
  let wallet = getWallet() as any;
  let chainId = getChainId();
  const nativeToken = getChainNativeToken(chainId);
  var direction = new BigNumber(tokenIn.address.toLowerCase()).lt(tokenOut.address.toLowerCase());
  const oracleContract = new Contracts.OSWAP_OtcPair(wallet, pairAddress);
  let allOffer = await oracleContract.getOffers({ direction, start: 0, length: 100 });
  let amounts = allOffer.amountAndPrice.slice(0, allOffer.amountAndPrice.length / 2);
  let prices = allOffer.amountAndPrice.slice(allOffer.amountAndPrice.length / 2, allOffer.amountAndPrice.length);
  let startDates = allOffer.startDateAndExpire.slice(0, allOffer.startDateAndExpire.length / 2);
  let endDates = allOffer.startDateAndExpire.slice(allOffer.startDateAndExpire.length / 2, allOffer.startDateAndExpire.length);
  let allowAll = allOffer.lockedAndAllowAll.slice(allOffer.lockedAndAllowAll.length / 2, allOffer.lockedAndAllowAll.length);
  let locked = allOffer.lockedAndAllowAll.slice(0, allOffer.lockedAndAllowAll.length);
  let queueArr: QueueOfferDetail[] = [];
  let tradeFeeObj = TRADE_FEE;
  let tradeFee = new BigNumber(tradeFeeObj.base).minus(tradeFeeObj.fee).div(tradeFeeObj.base).toFixed();
  const WETH9Address = getAddressByKey('WETH9');
  const isTokenInNative = tokenIn.address.toLowerCase() == WETH9Address.toLowerCase();
  const isTokenOutNative = tokenOut.address.toLowerCase() == WETH9Address.toLowerCase();

  for (let i = 0; i < amounts.length; i++) {
    let tokenOutAvailable = amounts[i]
    let tokenInAvailable = tokenOutAvailable.dividedBy(prices[i]).shiftedBy(18 - tokenOut.decimals).dividedBy(new BigNumber(tradeFee)).decimalPlaces(tokenIn.decimals, 1).toFixed();

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

  return queueArr.filter(v => (moment().isBetween(v.start, v.expire) && v.allowAll == true));
}

const getGroupQueueAllocation = async (traderAddress: string, offerIndex: number, pairAddress: string, tokenIn: any, tokenOut: any) => {
  let direction = new BigNumber(tokenIn.address.toLowerCase()).lt(tokenOut.address.toLowerCase());
  return await new Contracts.OSWAP_OtcPair(getWallet() as any, pairAddress).traderAllocation({ param1: direction, param2: offerIndex, param3: traderAddress });
};

const getGroupQueueTraderDataObj = async (pairAddress: string, tokenIn: any, tokenOut: any, amountIn: string, offerIndex?: string) => {
  let tokens = mapTokenObjectSet({ tokenIn, tokenOut });
  let tokenAmountIn = toTokenAmount(tokens.tokenIn, amountIn).toFixed();
  let tradeFeeObj = TRADE_FEE;
  let tradeFee = new BigNumber(tradeFeeObj.base).minus(tradeFeeObj.fee).div(tradeFeeObj.base).toFixed();
  let queueArr = await getGroupQueueItemsForTrader(pairAddress, tokens.tokenIn, tokens.tokenOut);
  let queueAll = await getGroupQueueItemsForAllowAll(pairAddress, tokens.tokenIn, tokens.tokenOut);
  queueArr = queueArr.concat(queueAll);
  queueArr = queueArr.map(v => {
    return {
      ...v,
      amountIn: new BigNumber(tokenAmountIn).shiftedBy(-tokens.tokenIn.decimals).toFixed(),
      amountOut: new BigNumber(tokenAmountIn).times(v.price).shiftedBy(-18 - Number(tokens.tokenIn.decimals) + Number(tokens.tokenOut.decimals)).times(tradeFee).toFixed()
    }
  }).filter(v => new BigNumber(v.tokenInAvailable).gte(new BigNumber(v.amountIn))).sort((a, b) => new BigNumber(b.amountOut).minus(a.amountOut).toNumber());

  if (queueArr.length == 0) {
    return {
      sufficientLiquidity: false
    }
  }

  let ratioArr = [toWeiInv('1')];
  let queueItem;
  if (offerIndex) {
    queueItem = queueArr.find(o => o.index.eq(offerIndex));
    if (!queueItem) return null;
  }
  else {
    queueItem = queueArr[0];
  }

  let indexArr = [queueItem.index];
  let amountOut = queueItem.amount; //was amountOut
  let price = new BigNumber(1).shiftedBy(18).div(queueItem.price).toFixed();
  let priceSwap = new BigNumber(queueItem.price).shiftedBy(-18).toFixed();

  let data = "0x" + numberToBytes32((indexArr.length * 2 + 1) * 32) + numberToBytes32(indexArr.length) + indexArr.map(e => numberToBytes32(e)).join('') + ratioArr.map(e => numberToBytes32(e)).join('');
  return {
    sufficientLiquidity: true,
    price: parseFloat(price),
    priceSwap: parseFloat(priceSwap),
    amountIn,
    amountOut: new BigNumber(amountOut).shiftedBy(-tokens.tokenOut.decimals).toFixed(),
    data,
    tradeFeeObj
  }
}

const getOffers = async (params: IOTCQueueConfig) => {
  const { pairAddress, direction, offerIndex } = params;
  const pair = new Contracts.OSWAP_OtcPair(Wallet.getClientInstance(), pairAddress);
  const tokens = await getTokens(pairAddress);
  let tokenIn: ITokenObject;
  let tokenOut: ITokenObject;
  if (direction) {
    tokenIn = getTokenObjectByAddress(tokens.token0);
    tokenOut = getTokenObjectByAddress(tokens.token1);
  } else {
    tokenIn = getTokenObjectByAddress(tokens.token1);
    tokenOut = getTokenObjectByAddress(tokens.token0);
  }

  const offer = await pair.offers({
    param1: direction,
    param2: offerIndex
  });

  const originalAmount = new BigNumber(offer.originalAmount).shiftedBy(-Number(tokenIn.decimals));
  const restrictedPrice = new BigNumber(offer.restrictedPrice).shiftedBy(-18).toFixed();
  const amount = new BigNumber(offer.amount).shiftedBy(-Number(tokenIn.decimals));
  const tradeFee = new BigNumber(TRADE_FEE.base).minus(TRADE_FEE.fee).div(TRADE_FEE.base).toFixed();
  return {
    pairAddress,
    totalAmount: originalAmount,
    availableAmount: amount,
    tradeFee,
    offerIndex,
    ...offer,
    startDate: new BigNumber(offer.startDate).multipliedBy(1000).toNumber(),
    expire: new BigNumber(offer.expire).multipliedBy(1000).toNumber(),
    amount,
    offerPrice: toWeiInv(restrictedPrice).shiftedBy(-18).toFixed(),
    restrictedPrice: restrictedPrice,
    tokenIn,
    tokenOut,
  };
}

const executeSell: (swapData: SwapData) => Promise<{
  receipt: TransactionReceipt | null;
  error: Record<string, string> | null;
}> = async (swapData: SwapData) => {
  let receipt: TransactionReceipt | null = null;
  const wallet = getWallet();
  try {
    const toAddress = wallet.account.address;
    const slippageTolerance = getSlippageTolerance();
    const transactionDeadlineInMinutes = getTransactionDeadline();
    const transactionDeadline = Math.floor(
      Date.now() / 1000 + transactionDeadlineInMinutes * 60
    );
    if (swapData.provider === "RestrictedOracle") {
      const obj = await getGroupQueueTraderDataObj(
        swapData.pairs[0],
        swapData.routeTokens[0],
        swapData.routeTokens[1],
        swapData.fromAmount.toFixed(),
        swapData.offerIndex?.toFixed()
      );
      if (!obj || !obj.data)
        return {
          receipt: null,
          error: { message: "No data from Group Queue Trader" },
        };
      const data = obj.data;
      const amountOutMin = swapData.toAmount.times(1 - slippageTolerance / 100);

      receipt = await hybridTradeExactIn(
        wallet,
        swapData.routeTokens,
        swapData.pairs,
        swapData.fromAmount.toFixed(),
        amountOutMin.toFixed(),
        toAddress,
        transactionDeadline,
        data,
        swapData.commissions,
      );
    }
  } catch (error) {
    return { receipt: null, error: error as any };
  }
  return { receipt, error: null };
};

export {
  executeSell,
  getOffers,
  getTokens,
  getTokenPrice,
  getHybridRouterAddress,
}
