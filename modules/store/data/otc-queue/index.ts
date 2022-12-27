import { BigNumber } from "@ijstech/eth-contract";
import { ICommissionInfo, ITokenObject, QueueType } from "@modules/global";

const OTCQueueAddresses: {
  [chainId: number]: {
    RestrictedFactory: string,
    ConfigStore: string,
    RestrictedPairCreator: string,
    RestrictedLiquidityProvider: string,
    VotingExecutor4: string
  }
} = {
  97: {
    RestrictedFactory: "0x7523d336D559eD709aB1F7a2899E49e41Bf77e38",
    ConfigStore: "0x40d559Ee67cEFfFbE8867299fe63d0E3cF35218f",
    RestrictedPairCreator: "0x1aC6734690C6757a79bf27FF527589551c9524F7",
    RestrictedLiquidityProvider: "0x361e297607aCB9A92eb2211f9e58F26e366A6a4C",
    VotingExecutor4: "0x318dbd1D987071A6f393BdF64FF150098Dd0f664"
  }
}

interface IOTCQueueConfig {
  title?: string;
  description?: string;
  logo?: string;
  pairAddress: string;
  direction: boolean;
  offerIndex: number;
  commissions?: ICommissionInfo[];
}

interface IOTCQueueData {
  pairAddress: string;
  provider: string;
  locked: boolean;
  allowAll: boolean;
  tradeFee: string | number;
  totalAmount: BigNumber;
  amount: BigNumber;
  availableAmount: BigNumber;
  receiving: BigNumber;
  offerPrice: string | number;
  offerIndex: number;
  startDate: number;
  expire: number;
  tokenIn: ITokenObject;
  tokenOut: ITokenObject;
}

interface SwapData {
  provider: string;
  queueType?: QueueType;
  routeTokens: any[];
  bestSmartRoute: any[];
  pairs: string[];
  fromAmount: BigNumber;
  toAmount: BigNumber;
  isFromEstimated: boolean;
  offerIndex?: number;
  commissions: ICommissionInfo[];
}

interface QueueOfferDetail {
  pairAddress: string,
  tokenIn: string,
  tokenOut: string,
  index: BigNumber,
  provider: string,
  amount: BigNumber,
  allocation: BigNumber,
  tokenInAvailable: string,
  price: BigNumber,
  start: number,
  expire: number,
  allowAll: boolean,
  locked: boolean,
  tradeFee: string,
}

export {
  OTCQueueAddresses,
  IOTCQueueConfig,
  IOTCQueueData,
  SwapData,
  QueueOfferDetail,
}
