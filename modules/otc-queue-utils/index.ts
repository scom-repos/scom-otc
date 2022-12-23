import {
  QueueType,
  toWeiInv,
  ABIKeys,
  numberToBytes32,
  ITokenObject,
  IERC20ApprovalEventOptions,
  ERC20ApprovalModel,
} from '@modules/global';
import { BigNumber, Utils, Wallet } from '@ijstech/eth-wallet';
import {
  getChainNativeToken,
  getAddresses,
  WETHByChainId,
  ToUSDPriceFeedAddressesMap,
  tokenPriceAMMReference,
  getWallet,
  getChainId,
  getTokenMap,
  IOTCQueueConfig,
  getWETH,
} from '@modules/store';
import { Contracts } from '@scom/oswap-openswap-contract';
import { Contracts as ChainLinkContracts } from '@scom/oswap-chainlink-contract';


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
    const pair = new Contracts.OSWAP_RestrictedPair(Wallet.getClientInstance(), pairAddress);
    token0 = await pair.token0();
    token1 = await pair.token1();
  } catch { };
  return {
    token0,
    token1
  }
}

const getOffers = async (params: IOTCQueueConfig) => {
  const { pairAddress, direction, offerIndex } = params;
  const pair = new Contracts.OSWAP_RestrictedPair(Wallet.getClientInstance(), pairAddress);
  const tokens = await getTokens(pairAddress);
  let tokenIn;
  let tokenOut;
  if (direction) {
    tokenIn = getTokenObjectByAddress(tokens.token0);
    tokenOut = getTokenObjectByAddress(tokens.token1);
  } else {
    tokenIn = getTokenObjectByAddress(tokens.token1);
    tokenOut = getTokenObjectByAddress(tokens.token0);
  }

  let approvedTraderLength = await pair.getApprovedTraderLength({ direction, offerIndex });
  let addresses: { address: string, allocation: string }[] = [];
  let totalAllocation = '0';

  for (let i = 0; i < approvedTraderLength.toNumber(); i += 100) {
    let approvedTrader = await pair.getApprovedTrader({ direction, offerIndex, start: i, length: 100 });
    addresses.push(...approvedTrader.trader.map((v: string, i: number) => {
      let allo = new BigNumber(approvedTrader.allocation[i]).shiftedBy(-Number(tokenIn.decimals));
      totalAllocation = allo.plus(totalAllocation).toFixed()
      return {
        address: v,
        allocation: allo.toFixed()
      }
    }));
  }

  const offer = await pair.offers({
    param1: direction,
    param2: offerIndex
  });

  const restrictedPrice = new BigNumber(offer.restrictedPrice).shiftedBy(-18).toFixed();
  return {
    ...offer,
    amount: new BigNumber(offer.amount).shiftedBy(-Number(tokenIn.decimals)),
    reserve: new BigNumber(offer.receiving).shiftedBy(-Number(tokenOut.decimals)),
    offerPrice: toWeiInv(restrictedPrice).shiftedBy(-18).toFixed(),
    tokenIn,
    tokenOut,
    addresses
  };
}

const executeSell = async (params: any) => {
  return '' as any;
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

export {
  executeSell,
  getOffers,
  getTokens,
  getTokenPrice,
}
