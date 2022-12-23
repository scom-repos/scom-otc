import { BigNumber } from "@ijstech/eth-contract";
import { ITokenObject } from "@modules/global";

export interface IOTCQueueConfig {
  title?: string;
  logo?: string;
  pairAddress: string;
  direction: boolean;
  offerIndex: number;
}

export interface IOTCQueueData {
  provider: string;
  locked: boolean;
  allowAll: boolean;
  amount: BigNumber;
  receiving: BigNumber;
  reserve: BigNumber;
  offerPrice: string;
  startDate: BigNumber;
  expire: BigNumber;
  addresses: any[];
  tokenIn: ITokenObject;
  tokenOut: ITokenObject;
}