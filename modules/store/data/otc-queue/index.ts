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
    RestrictedFactory: "0x1890472CEb3a1977BC0ab036Cd5ddB1c96953438",
    ConfigStore: "0x5fD4d3175B02bFC1d5468744379f59A374399599",
    RestrictedPairCreator: "0xe6BC80a251964248bce8980ca94EfABb22Df92c2",
    RestrictedLiquidityProvider: "0xD996aB223375C371d02F5A4a07F7587aC40a3b01",
    VotingExecutor4: "0xFe4EeEf531C06795Ef73100e64D8839588047F0d"
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
