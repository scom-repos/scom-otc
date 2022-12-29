export interface INetwork {
    chainId: number;
    name: string;
    img: string;
    rpc?: string;
    isDisabled?: boolean;
    isMainChain?: boolean;
    isCrossChainSupported?: boolean;
    explorerName?: string;
    explorerTxUrl?: string;
    explorerAddressUrl?: string;
    isTestnet?: boolean;
};

export enum QueueType {
    PRIORITY_QUEUE,
    RANGE_QUEUE,
    GROUP_QUEUE,
    PEGGED_QUEUE
}

export const ABIKeys = {
    Factory: 'OAXDEX_Factory',
    Pair: 'OAXDEX_Pair',
    //New
    OracleFactory: 'OSWAP_OracleFactory',
    OraclePair: 'OSWAP_OraclePair',
    OracleLiquidityProvider: 'OSWAP_OracleLiquidityProvider',
    HybridRouterRegistry: 'OSWAP_HybridRouterRegistry',
    HybridRouter: 'OSWAP_HybridRouter2',
    RangeFactory: 'OSWAP_RangeFactory',
    RangePair: 'OSWAP_RangePair',
    RangeLiquidityProvider: 'OSWAP_RangeLiquidityProvider',
    OracleAdaptor: 'OSWAP_OracleAdaptor',
    RestrictedFactory: 'OSWAP_RestrictedFactory',
    RestrictedPair: 'OSWAP_RestrictedPair',
    RestrictedLiquidityProvider: 'OSWAP_RestrictedLiquidityProvider',
    ConfigStore: 'OSWAP_ConfigStore',
    PeggedOracleFactory: 'OSWAP_PeggedOracleFactory',
    PeggedOraclePair: 'OSWAP_PeggedOraclePair',
    PeggedOracleLiquidityProvider: 'OSWAP_PeggedOracleLiquidityProvider'
};

export const enum EventId {
    ConnectWallet = 'connectWallet',
    IsWalletConnected = 'isWalletConnected',
    IsWalletDisconnected = 'IsWalletDisconnected',
    Paid = 'Paid',
    chainChanged = 'chainChanged',
    EmitButtonStatus = 'emitButtonStatus',
    EmitInput = 'emitInput',
    EmitNewToken = 'emitNewToken',
}

export interface ITokenObject {
    address?: string;
    name: string;
    decimals: number;
    symbol: string;
    status?: boolean | null;
    logoURI?: string;
    isCommon?: boolean | null;
    balance?: string | number;
    isNative?: boolean | null;
    isWETH?: boolean | null;
    isNew?: boolean | null;
};

export type TokenMapType = { [token: string]: ITokenObject; };

export * from './utils/index';
