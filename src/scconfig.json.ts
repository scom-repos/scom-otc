export default {
    "env": "testnet",
    "logo": "logo",
    "main": "@modules/main",
    "assets": "@modules/assets",
    "moduleDir": "modules",
    "modules": {
        "@modules/assets": {
            "path": "assets"
        },
        "@modules/global": {
            "path": "global"
        },
        "@modules/store": {
            "path": "store"
        },
        "@modules/otc-queue-utils": {
            "path": "otc-queue-utils"
        },
        "@modules/alert": {
            "path": "alert"
        },
        "@modules/panel-config": {
            "path": "panel-config"
        },
        "@modules/main": {
            "path": "main"
        }
    },
    "dependencies": {
        "@ijstech/eth-contract": "*",
        "@scom/oswap-openswap-contract": "*",
        "@scom/oswap-chainlink-contract": "*",
        "@scom/scom-commission-proxy-contract": "*"
    },
    "proxyAddresses": {
        "56": "0x9A452a5f136C8Cf1900B11DA942767394c158f66",
        "97": "0x9602cB9A782babc72b1b6C96E050273F631a6870"
    },
    "ipfsGatewayUrl": "https://ipfs.scom.dev/ipfs/"
}