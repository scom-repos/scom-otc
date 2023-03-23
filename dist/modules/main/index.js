var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@modules/main/index.css.ts", ["require", "exports", "@ijstech/components", "@modules/assets", "@modules/store"], function (require, exports, components_1, assets_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    components_1.Styles.Theme.defaultTheme.background.main = '#0c1234';
    components_1.Styles.Theme.defaultTheme.text.primary = '#fff';
    components_1.Styles.Theme.defaultTheme.background.modal = '#0c1234';
    components_1.Styles.Theme.defaultTheme.layout.container.textAlign = 'left';
    components_1.Styles.Theme.applyTheme(components_1.Styles.Theme.defaultTheme);
    const colorVar = {
        primaryButton: 'transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box',
        primaryGradient: 'linear-gradient(255deg,#f15e61,#b52082)',
        darkBg: '#181E3E 0% 0% no-repeat padding-box',
        primaryDisabled: 'transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box !important'
    };
    components_1.Styles.fontFace({
        fontFamily: "Apple SD Gothic Neo",
        src: `url("${assets_1.default.fullPath('fonts/FontsFree-Net-Apple-SD-Gothic-Neo-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Montserrat Regular",
        src: `url("${assets_1.default.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
        fontWeight: 'nomal',
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Montserrat Bold",
        src: `url("${assets_1.default.fullPath('fonts/montserrat/Montserrat-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Montserrat Light",
        src: `url("${assets_1.default.fullPath('fonts/montserrat/Montserrat-Light.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Montserrat Medium",
        src: `url("${assets_1.default.fullPath('fonts/montserrat/Montserrat-Medium.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Montserrat SemiBold",
        src: `url("${assets_1.default.fullPath('fonts/montserrat/Montserrat-SemiBold.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Raleway Regular",
        src: `url("${assets_1.default.fullPath('fonts/raleway/Raleway-Regular.ttf')}") format("truetype")`,
        fontWeight: 'nomal',
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Raleway Bold",
        src: `url("${assets_1.default.fullPath('fonts/raleway/Raleway-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Raleway Light",
        src: `url("${assets_1.default.fullPath('fonts/raleway/Raleway-Light.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Raleway Medium",
        src: `url("${assets_1.default.fullPath('fonts/raleway/Raleway-Medium.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Raleway SemiBold",
        src: `url("${assets_1.default.fullPath('fonts/raleway/Raleway-SemiBold.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.cssRule('.pageblock-otc-queue', {
        $nest: {
            'i-label': {
                fontFamily: 'Montserrat Regular',
                color: '#fff',
            },
            'span': {
                letterSpacing: '0.15px',
            },
            '#otcQueueElm': {
                background: '#192046',
            },
            '.i-loading-overlay': {
                background: '#192046',
            },
            '.overflow-inherit': {
                overflow: 'inherit',
            },
            '::selection': {
                color: '#fff',
                background: '#1890ff'
            },
            '.label-network': {
                background: colorVar.primaryButton
            },
            '.btn-os': {
                background: colorVar.primaryButton,
                height: 'auto !important',
                color: '#fff',
                transition: 'background .3s ease',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'Raleway Bold',
                $nest: {
                    'i-icon.loading-icon': {
                        marginInline: '0.25rem',
                        width: '16px !important',
                        height: '16px !important',
                    },
                },
            },
            '.btn-os:not(.disabled):not(.is-spinning):hover, .btn-os:not(.disabled):not(.is-spinning):focus': {
                background: colorVar.primaryGradient,
                backgroundColor: 'transparent',
                boxShadow: 'none',
                opacity: .9
            },
            '.btn-os:not(.disabled):not(.is-spinning):focus': {
                boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
            },
            '.btn-os.disabled, .btn-os.is-spinning': {
                background: colorVar.primaryDisabled,
                opacity: 1
            },
            '.dark-bg, .dark-modal > div > div': {
                background: colorVar.darkBg,
                borderRadius: 5
            },
            '.btn-transparent, .btn-transparent:not(.disabled):focus, .btn-transparent:not(.disabled):hover': {
                background: 'transparent',
                boxShadow: 'none',
                backgroundColor: 'transparent'
            },
            '.mr-0-5': {
                marginRight: '.5rem'
            },
            '.ml-0-5': {
                marginLeft: '.5rem'
            },
            '.mb-0-5': {
                marginBottom: '.5rem'
            },
            '.hidden': {
                display: 'none !important'
            },
            '.no-wrap': {
                whiteSpace: 'nowrap'
            },
            '.flex-nowrap': {
                flexWrap: 'nowrap',
            },
            '.py-1': {
                paddingTop: '1rem',
                paddingBottom: '1rem'
            },
            '.px-1': {
                paddingLeft: '1rem',
                paddingRight: '1rem'
            },
            '.align-middle': {
                alignItems: 'center'
            },
            '.otc-queue-layout': {
                width: '100%',
                marginInline: 'auto',
                overflow: 'hidden',
            },
            'i-link': {
                display: 'flex',
                $nest: {
                    '&:hover *': {
                        color: '#fff',
                        opacity: 0.9,
                    },
                },
            },
            '.opacity-50': {
                opacity: 0.5
            },
            '.cursor-default': {
                cursor: 'default',
            },
            '.text-overflow': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
            '.line-clamp': {
                display: '-webkit-box',
                '-webkit-line-clamp': 5,
                // @ts-ignore
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden'
            },
            '.smart-contract--link span': {
                textDecoration: 'underline',
                cursor: 'pointer',
            },
            'i-progress': {
                $nest: {
                    '.i-progress_wrapbar': {
                        borderRadius: 15,
                    },
                    '.i-progress_bar.has-bg': {
                        background: '#232B5A',
                    },
                    '.i-progress--active': {
                        $nest: {
                            '.i-progress_wrapbar > .i-progress_overlay': {
                                background: 'linear-gradient(255deg,#f15e61,#b52082) !important'
                            }
                        }
                    }
                }
            },
            '.wrapper': {
                width: '100%',
                height: '100%',
                maxHeight: store_1.MAX_HEIGHT,
                $nest: {
                    '.bg-color': {
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#fff',
                        minHeight: '485px',
                        height: '100%',
                        borderRadius: '15px',
                        paddingBottom: '1rem',
                        position: 'relative',
                    },
                    '.btn-import, .btn-sell': {
                        width: 370,
                        maxWidth: '100%',
                        padding: '0.625rem 0',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        borderRadius: 12,
                    },
                    '.btn-max': {
                        height: '12px !important',
                        marginBlock: 'auto',
                    },
                    '.no-campaign': {
                        padding: '3rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        justifyContent: 'center',
                        $nest: {
                            'i-label > *': {
                                fontSize: '1.3rem',
                                marginTop: '1rem',
                            }
                        }
                    },
                    '.slider-arrow': {
                        fill: '#f15e61',
                    }
                },
            },
            '.custom-timer': {
                display: 'flex',
                $nest: {
                    '.timer-value': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'linear-gradient(255deg,#f15e61,#b52082)',
                        borderRadius: 4,
                        paddingInline: 4,
                        minWidth: 20,
                        height: 20,
                        fontSize: 14,
                        fontFamily: 'Montserrat Regular',
                    },
                    '.timer-unit': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                },
            },
            '.input-amount > input': {
                border: 'none',
                width: '100% !important',
                height: '100% !important',
                backgroundColor: 'transparent',
                color: '#fff',
                fontSize: '1rem',
                textAlign: 'right',
            },
            '.highlight-box': {
                borderColor: '#E53780 !important'
            },
            'i-panel.container': {
                width: Theme.layout.container.width,
                maxWidth: Theme.layout.container.maxWidth,
                overflow: Theme.layout.container.overflow,
                textAlign: Theme.layout.container.textAlign,
                margin: '0 auto'
            },
            '.ml-auto': {
                marginLeft: 'auto',
            },
            '.mr-025': {
                marginRight: '0.25rem',
            },
            '.input-disabled': {
                opacity: 0.4,
                cursor: 'default',
                $nest: {
                    '*': {
                        cursor: 'default',
                    }
                }
            },
            '#importFileErrModal': {
                $nest: {
                    '.modal': {
                        borderRadius: 12,
                    },
                    '.i-modal_header': {
                        marginBottom: '1.5rem',
                        paddingBottom: '0.5rem',
                        borderBottom: `2px solid #F15E61`,
                        color: '#F15E61',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                    },
                    '.i-modal_header > i-icon': {
                        fill: `#F15E61 !important`
                    },
                    '#importFileErr span': {
                        fontSize: '16px !important'
                    }
                }
            },
            'i-modal .modal': {
                background: '#192046',
            },
            '#loadingElm.i-loading--active': {
                marginTop: '2rem',
                position: 'initial',
                $nest: {
                    '#otcQueueElm': {
                        display: 'none !important',
                    },
                    '.i-loading-spinner': {
                        marginTop: '2rem',
                    },
                },
            },
            '.connect-wallet': {
                display: 'block',
                textAlign: 'center',
                paddingTop: '1rem',
            },
        }
    });
});
define("@modules/main", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@modules/assets", "@modules/global", "@modules/store", "@modules/otc-queue-utils", "@modules/alert", "@modules/panel-config", "@modules/global", "@modules/main/index.css.ts"], function (require, exports, components_2, eth_wallet_1, assets_2, global_1, store_2, otc_queue_utils_1, alert_1, panel_config_1, global_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Main = void 0;
    let Main = class Main extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this.isImportNewCampaign = false;
            this.tokenPrice = '';
            this.registerEvent = () => {
                this.$eventBus.register(this, "isWalletConnected" /* IsWalletConnected */, this.onWalletConnect);
                this.$eventBus.register(this, "IsWalletDisconnected" /* IsWalletDisconnected */, this.onWalletConnect);
                this.$eventBus.register(this, "chainChanged" /* chainChanged */, this.onChainChange);
            };
            this.onWalletConnect = async (connected) => {
                await this.onSetupPage(connected);
            };
            this.onChainChange = async () => {
                const isConnected = store_2.isWalletConnected();
                await this.onSetupPage(isConnected);
            };
            this.initWalletData = async () => {
                let accountsChangedEventHandler = async (account) => {
                    store_2.setTokenMap();
                };
                let chainChangedEventHandler = async (hexChainId) => {
                    store_2.setTokenMap();
                };
                let selectedProvider = localStorage.getItem('walletProvider');
                if (!selectedProvider && store_2.hasMetaMask()) {
                    selectedProvider = eth_wallet_1.WalletPlugin.MetaMask;
                }
                const isValidProvider = Object.values(eth_wallet_1.WalletPlugin).includes(selectedProvider);
                if (!eth_wallet_1.Wallet.getClientInstance().chainId) {
                    eth_wallet_1.Wallet.getClientInstance().chainId = store_2.getDefaultChainId();
                }
                if (store_2.hasWallet() && isValidProvider) {
                    await store_2.connectWallet(selectedProvider, {
                        'accountsChanged': accountsChangedEventHandler,
                        'chainChanged': chainChangedEventHandler
                    });
                }
            };
            this.onSetupPage = async (connected, hideLoading) => {
                var _a, _b;
                const chainId = store_2.getChainId();
                if (this.data && this.data.chainId && chainId != this.data.chainId) {
                    await this.renderSwitchNetworkUI(this.data.chainId);
                    await store_2.switchNetwork(this.data.chainId);
                }
                else {
                    if (!hideLoading && this.loadingElm) {
                        this.loadingElm.visible = true;
                    }
                    if (!connected || !this.data) {
                        await this.renderEmpty();
                        return;
                    }
                    try {
                        this.otcQueueInfo = await otc_queue_utils_1.getOffers(this.data);
                        await store_2.updateTokenBalances([this.otcQueueInfo.tokenIn, this.otcQueueInfo.tokenOut]);
                        this.firstTokenObject = this.otcQueueInfo.tokenIn;
                        this.secondTokenObject = this.otcQueueInfo.tokenOut;
                        this.tokenPrice = await otc_queue_utils_1.getTokenPrice((_a = this.secondTokenObject) === null || _a === void 0 ? void 0 : _a.address);
                        await this.renderOTCQueueCampaign();
                        if (this.firstTokenObject && this.firstTokenObject.symbol !== ((_b = store_2.ChainNativeTokenByChainId[chainId]) === null || _b === void 0 ? void 0 : _b.symbol)) {
                            await this.initApprovalModelAction();
                        }
                    }
                    catch (err) {
                        console.log('err', err);
                        // await this.renderEmpty();
                    }
                    if (!hideLoading && this.loadingElm) {
                        this.loadingElm.visible = false;
                    }
                }
            };
            this.initInputFile = (importFileElm) => {
                var _a;
                importFileElm.caption = '<input type="file" accept=".json" />';
                const inputElm = (_a = importFileElm.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild;
                if (inputElm) {
                    inputElm.onchange = (event) => {
                        const reader = new FileReader();
                        const files = event.target.files;
                        if (!files.length) {
                            return;
                        }
                        const file = files[0];
                        reader.readAsBinaryString(file);
                        reader.onload = (event) => {
                            const { loaded, total } = event;
                            const isCompleted = loaded === total;
                            if (isCompleted) {
                                this.initInputFile(importFileElm);
                                this.convertJSONToObj(reader.result);
                            }
                        };
                    };
                }
            };
            this.convertJSONToObj = async (result) => {
                if (!result)
                    this.showImportJsonError('Data is corrupted. No data were recovered.');
                try {
                    const campaignObj = JSON.parse(result);
                    const length = Object.keys(campaignObj).length;
                    if (!length) {
                        this.showImportJsonError('No data found in the imported file.');
                    }
                    else if (campaignObj.chainId && campaignObj.chainId !== store_2.getChainId()) {
                        const networkName = store_2.getNetworkInfo(campaignObj.chainId) ? store_2.getNetworkInfo(campaignObj.chainId).name : `ChainId = ${campaignObj.chainId}`;
                        this.showImportJsonError(`Please switch the network to ${networkName}`);
                    }
                    else {
                        this.onEditCampaign(this.isImportNewCampaign, campaignObj);
                    }
                }
                catch (_a) {
                    this.showImportJsonError('Data is corrupted. No data were recovered.');
                }
            };
            this.getFirstTokenBalance = () => {
                var _a, _b;
                const tokenBalances = store_2.getTokenBalances();
                const tokenBalance = new eth_wallet_1.BigNumber(tokenBalances[(_b = (_a = this.firstTokenObject) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.toLowerCase()]);
                return tokenBalance.toFixed();
            };
            this.getFirstAvailableBalance = () => {
                var _a, _b;
                if (!this.otcQueueInfo || this.isSellDisabled) {
                    return '0';
                }
                const { availableAmount, tradeFee } = this.otcQueueInfo;
                const tokenBalances = store_2.getTokenBalances();
                const tokenBalance = new eth_wallet_1.BigNumber(tokenBalances[(_b = (_a = this.firstTokenObject) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.toLowerCase()]);
                let maxTokenBalance = new eth_wallet_1.BigNumber(0);
                if (this.data.commissionFee && this.data.commissionFeeTo) {
                    maxTokenBalance = new eth_wallet_1.BigNumber(tokenBalance).div(new eth_wallet_1.BigNumber(1).div(tradeFee).plus(this.data.commissionFee));
                }
                else {
                    maxTokenBalance = new eth_wallet_1.BigNumber(tokenBalance).div(new eth_wallet_1.BigNumber(1).div(tradeFee));
                }
                return (eth_wallet_1.BigNumber.minimum(availableAmount, maxTokenBalance)).toFixed();
            };
            this.handleFocusInput = (first, isFocus) => {
                const elm = first ? this.firstInputBox : this.secondInputBox;
                if (isFocus) {
                    elm.classList.add('highlight-box');
                }
                else {
                    elm.classList.remove('highlight-box');
                }
            };
            this.setMaxBalance = () => {
                this.firstInput.value = this.getFirstAvailableBalance();
                this.firstInputChange();
            };
            this.calculateCommissionFee = () => {
                const commissionsAmount = this.data.commissionFee && this.data.commissionFeeTo ? new eth_wallet_1.BigNumber(this.firstInput.value).times(this.data.commissionFee) : new eth_wallet_1.BigNumber(0);
                return commissionsAmount;
            };
            this.firstInputChange = () => {
                var _a;
                const firstToken = this.firstTokenObject;
                const secondToken = this.secondTokenObject;
                // limitInputNumber(this.firstInput, firstToken?.decimals || 18);
                if (!this.otcQueueInfo)
                    return;
                const info = this.otcQueueInfo;
                const { offerPrice, tradeFee, restrictedPrice } = info;
                const symbol = ((_a = this.firstTokenObject) === null || _a === void 0 ? void 0 : _a.symbol) || '';
                const outputVal = new eth_wallet_1.BigNumber(this.firstInput.value).times(restrictedPrice);
                if (outputVal.isNaN()) {
                    this.secondInput.value = '';
                    this.orderSubTotal = '0';
                    this.orderTotal = '0';
                    this.commissionAmount = '0';
                    this.lbCommissionFee.caption = `0 ${symbol}`;
                    this.lbOrderSubTotal.caption = `0 ${symbol}`;
                    this.lbOrderTotal.caption = `0 ${symbol}`;
                }
                else {
                    this.secondInput.value = outputVal.toFixed();
                    const commissionsAmount = this.calculateCommissionFee();
                    this.commissionAmount = commissionsAmount.toFixed();
                    this.lbCommissionFee.caption = `${global_1.formatNumber(commissionsAmount, 6)} ${symbol}`;
                    this.orderSubTotal = new eth_wallet_1.BigNumber(this.firstInput.value).shiftedBy(this.firstTokenObject.decimals).idiv(tradeFee).shiftedBy(-this.firstTokenObject.decimals).toFixed();
                    this.orderTotal = commissionsAmount.plus(this.orderSubTotal).toFixed();
                    this.lbOrderSubTotal.caption = `${global_1.formatNumber(this.orderSubTotal, 6)} ${symbol}`;
                    this.lbOrderTotal.caption = `${global_1.formatNumber(this.orderTotal, 6)} ${symbol}`;
                }
                this.btnSell.caption = this.submitButtonText;
                this.updateBtnSell();
            };
            this.secondInputChange = () => {
                var _a;
                const firstToken = this.firstTokenObject;
                const secondToken = this.secondTokenObject;
                // limitInputNumber(this.secondInput, secondToken?.decimals || 18);
                if (!this.otcQueueInfo)
                    return;
                const info = this.otcQueueInfo || {};
                const { offerPrice, tradeFee } = info;
                const symbol = ((_a = this.firstTokenObject) === null || _a === void 0 ? void 0 : _a.symbol) || '';
                const inputVal = new eth_wallet_1.BigNumber(this.secondInput.value).multipliedBy(offerPrice);
                if (inputVal.isNaN()) {
                    this.firstInput.value = '';
                    this.orderSubTotal = '0';
                    this.orderTotal = '0';
                    this.commissionAmount = '0';
                    this.lbCommissionFee.caption = `0 ${symbol}`;
                    this.lbOrderSubTotal.caption = `0 ${symbol}`;
                    this.lbOrderTotal.caption = `0 ${symbol}`;
                }
                else {
                    this.firstInput.value = inputVal.toFixed();
                    const commissionsAmount = this.calculateCommissionFee();
                    this.commissionAmount = commissionsAmount.toFixed();
                    this.lbCommissionFee.caption = `${global_1.formatNumber(commissionsAmount, 6)} ${symbol}`;
                    this.orderSubTotal = new eth_wallet_1.BigNumber(this.firstInput.value).shiftedBy(this.firstTokenObject.decimals).idiv(tradeFee).shiftedBy(-this.firstTokenObject.decimals).toFixed();
                    this.orderTotal = commissionsAmount.plus(this.orderSubTotal).toFixed();
                    this.lbOrderSubTotal.caption = `${global_1.formatNumber(this.orderSubTotal, 6)} ${symbol}`;
                    this.lbOrderTotal.caption = `${global_1.formatNumber(this.orderTotal, 6)} ${symbol}`;
                }
                this.btnSell.caption = this.submitButtonText;
                this.updateBtnSell();
            };
            this.updateBtnSell = () => {
                if (!this.otcQueueInfo)
                    return;
                if (this.isSellDisabled) {
                    this.btnSell.enabled = false;
                    return;
                }
                const firstVal = new eth_wallet_1.BigNumber(this.firstInput.value);
                const firstAvailable = this.getFirstAvailableBalance();
                if (firstVal.isNaN() || firstVal.lte(0) || firstVal.gt(firstAvailable)) {
                    this.btnSell.enabled = false;
                }
                else {
                    this.btnSell.enabled = true;
                }
            };
            this.onSell = () => {
                if (this.otcQueueInfo && this.firstTokenObject && this.isApproveButtonShown) {
                    this.approvalModelAction.doApproveAction(this.firstTokenObject, this.otcQueueInfo.availableAmount.toFixed());
                }
                else {
                    this.approvalModelAction.doPayAction();
                }
            };
            this.onSubmit = async () => {
                if (!this.otcQueueInfo)
                    return;
                const firstToken = Object.assign({}, this.firstTokenObject);
                const secondToken = Object.assign({}, this.secondTokenObject);
                const { pairAddress, offerIndex } = this.otcQueueInfo;
                this.showResultMessage(this.otcQueueAlert, 'warning', `Transferring ${global_1.formatNumber(this.orderTotal)} ${(firstToken === null || firstToken === void 0 ? void 0 : firstToken.symbol) || ''} for ${global_1.formatNumber(this.secondInput.value)} ${(secondToken === null || secondToken === void 0 ? void 0 : secondToken.symbol) || ''}`);
                const params = {
                    provider: "RestrictedOracle",
                    queueType: global_1.QueueType.GROUP_QUEUE,
                    routeTokens: [firstToken, secondToken],
                    bestSmartRoute: [firstToken, secondToken],
                    pairs: [pairAddress],
                    fromAmount: new eth_wallet_1.BigNumber(this.orderSubTotal),
                    toAmount: new eth_wallet_1.BigNumber(this.secondInput.value),
                    isFromEstimated: false,
                    commissionFee: this.commissionAmount,
                    commissionFeeTo: this.data.commissionFeeTo,
                    offerIndex: offerIndex
                };
                const { error } = await otc_queue_utils_1.executeSell(params);
                if (error) {
                    this.showResultMessage(this.otcQueueAlert, 'error', error);
                }
            };
            this.updateInput = (enabled) => {
                this.firstInput.enabled = enabled;
                this.secondInput.enabled = enabled;
                this.btnMax.enabled = enabled;
            };
            this.initApprovalModelAction = async () => {
                let spenderAddress;
                if (this.data.commissionFee && this.data.commissionFeeTo) {
                    spenderAddress = store_2.getProxyAddress();
                }
                else {
                    spenderAddress = otc_queue_utils_1.getHybridRouterAddress();
                }
                this.approvalModelAction = await global_2.getERC20ApprovalModelAction(spenderAddress, {
                    sender: this,
                    payAction: this.onSubmit,
                    onToBeApproved: async (token) => {
                        this.isApproveButtonShown = true;
                        this.btnSell.enabled = true;
                        this.btnSell.caption = 'Approve';
                    },
                    onToBePaid: async (token) => {
                        this.updateBtnSell();
                        this.btnSell.caption = this.submitButtonText;
                        this.isApproveButtonShown = false;
                    },
                    onApproving: async (token, receipt, data) => {
                        this.showResultMessage(this.otcQueueAlert, 'success', receipt || '');
                        this.btnSell.rightIcon.visible = true;
                        this.btnSell.caption = 'Approving';
                        this.updateInput(false);
                    },
                    onApproved: async (token, data) => {
                        this.isApproveButtonShown = false;
                        this.btnSell.rightIcon.visible = false;
                        this.btnSell.caption = this.submitButtonText;
                        this.updateInput(true);
                        this.updateBtnSell();
                    },
                    onApprovingError: async (token, err) => {
                        this.showResultMessage(this.otcQueueAlert, 'error', err);
                        this.updateInput(true);
                        this.btnSell.caption = 'Approve';
                        this.btnSell.rightIcon.visible = false;
                    },
                    onPaying: async (receipt, data) => {
                        this.showResultMessage(this.otcQueueAlert, 'success', receipt || '');
                        this.btnSell.rightIcon.visible = true;
                        this.btnSell.caption = this.submitButtonText;
                        this.updateInput(false);
                    },
                    onPaid: async (data) => {
                        await store_2.updateTokenBalances([this.firstTokenObject, this.secondTokenObject]);
                        await this.onSetupPage(store_2.isWalletConnected(), true);
                        this.firstInput.value = '';
                        this.secondInput.value = '';
                        this.btnSell.rightIcon.visible = false;
                        this.btnSell.caption = this.submitButtonText;
                    },
                    onPayingError: async (err) => {
                        this.showResultMessage(this.otcQueueAlert, 'error', err);
                        this.btnSell.rightIcon.visible = false;
                        this.btnSell.enabled = true;
                        this.btnSell.caption = this.submitButtonText;
                    }
                });
                this.approvalModelAction.checkAllowance(this.firstTokenObject, this.getFirstAvailableBalance());
            };
            this.showResultMessage = (result, status, content) => {
                if (!result)
                    return;
                let params = { status };
                if (status === 'success') {
                    params.txtHash = content;
                }
                else {
                    params.content = content;
                }
                result.message = Object.assign({}, params);
                result.showModal();
            };
            this.initEmptyUI = async () => {
                if (!this.noCampaignSection) {
                    this.noCampaignSection = await components_2.Panel.create({ height: '100%' });
                    this.noCampaignSection.classList.add('container');
                }
                const isConnected = store_2.isWalletConnected();
                const isBtnShown = !this.data && isConnected;
                let importFileElm;
                let onImportCampaign;
                let onClose;
                if (isBtnShown) {
                    importFileElm = await components_2.Label.create({ visible: false });
                    onImportCampaign = (isNew) => {
                        var _a, _b;
                        this.isImportNewCampaign = isNew;
                        (_b = (_a = importFileElm.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.click();
                    };
                    onClose = () => {
                        this.importFileErrModal.visible = false;
                    };
                    this.initInputFile(importFileElm);
                }
                this.noCampaignSection.clearInnerHTML();
                this.noCampaignSection.appendChild(this.$render("i-panel", { class: "no-campaign", height: "100%", background: { color: '#0c1234' } },
                    this.$render("i-vstack", { gap: 10, verticalAlignment: "center" },
                        this.$render("i-image", { url: assets_2.default.fullPath('img/TrollTrooper.svg') }),
                        this.$render("i-label", { font: { color: '#FFFFFF' }, caption: isConnected ? 'No Campaigns' : 'Please connect with your wallet!' }),
                        isBtnShown ? (this.$render("i-hstack", { gap: 10, margin: { top: 10 }, verticalAlignment: "center", horizontalAlignment: "center" },
                            this.$render("i-button", { id: "btnInputCampaign", maxWidth: 220, caption: "Input Campaign", class: "btn-os btn-import", font: { size: '14px' }, rightIcon: { visible: false, spin: true, fill: '#fff' }, onClick: () => this.onEditCampaign(false) }),
                            this.$render("i-button", { id: "btnImportCampaign", maxWidth: 220, caption: "Import Campaign", class: "btn-os btn-import", font: { size: '14px' }, rightIcon: { visible: false, spin: true, fill: '#fff' }, onClick: () => onImportCampaign(false) }),
                            importFileElm,
                            this.$render("i-modal", { id: "importFileErrModal", maxWidth: "100%", width: 420, title: "Import Campaign Error", closeIcon: { name: 'times' } },
                                this.$render("i-vstack", { gap: 20, margin: { bottom: 10 }, verticalAlignment: "center", horizontalAlignment: "center" },
                                    this.$render("i-label", { id: "importFileErr", font: { size: '16px', color: '#fff' } }),
                                    this.$render("i-button", { caption: "Close", class: "btn-os btn-import", width: 120, onClick: onClose }))))) : [])));
                this.noCampaignSection.visible = true;
            };
            this.renderSwitchNetworkUI = async (chainId) => {
                if (!this.switchNetworkSection) {
                    this.switchNetworkSection = await components_2.Panel.create({ height: '100%' });
                    this.switchNetworkSection.classList.add('container');
                }
                this.switchNetworkSection.clearInnerHTML();
                const networkInfo = store_2.getNetworkInfo(chainId);
                this.switchNetworkSection.appendChild(this.$render("i-panel", { class: "no-campaign", height: "100%", background: { color: '#0c1234' } },
                    this.$render("i-vstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "center" },
                        this.$render("i-image", { url: assets_2.default.fullPath('img/TrollTrooper.svg') }),
                        this.$render("i-hstack", { verticalAlignment: 'center', gap: 4, wrap: "wrap" },
                            this.$render("i-label", { caption: 'Please switch your network to' }),
                            this.$render("i-label", { padding: { left: '0.3rem', right: '0.3rem', top: '0.1rem', bottom: '0.1rem' }, caption: networkInfo.name, class: 'pointer label-network', border: { radius: '0.5rem' }, onClick: () => store_2.switchNetwork(chainId) })))));
                this.switchNetworkSection.visible = true;
                if (this.otcQueueElm) {
                    this.otcQueueElm.clearInnerHTML();
                    this.otcQueueElm.appendChild(this.switchNetworkSection);
                }
                if (this.loadingElm) {
                    this.loadingElm.visible = false;
                }
            };
            this.renderEmpty = async () => {
                await this.initEmptyUI();
                if (this.otcQueueElm) {
                    this.otcQueueElm.clearInnerHTML();
                    this.otcQueueElm.appendChild(this.noCampaignSection);
                }
                if (this.loadingElm) {
                    this.loadingElm.visible = false;
                }
            };
            this.renderOTCQueueCampaign = async () => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                if (this.otcQueueInfo) {
                    this.otcQueueElm.clearInnerHTML();
                    const { pairAddress, availableAmount, restrictedPrice, startDate, expire } = this.otcQueueInfo;
                    const { title, description, logo } = this.data;
                    const chainId = store_2.getChainId();
                    const firstSymbol = ((_a = this.firstTokenObject) === null || _a === void 0 ? void 0 : _a.symbol) || '';
                    const usd = this.tokenPrice ? new eth_wallet_1.BigNumber(restrictedPrice).times(this.tokenPrice).toFixed() : '0';
                    const hStackTimer = await components_2.HStack.create({ gap: 8, verticalAlignment: 'center' });
                    const lbTimer = await components_2.Label.create({ caption: 'Starts In', font: { size: '0.8rem' } });
                    lbTimer.classList.add('opacity-50');
                    const lbHour = await components_2.Label.create();
                    const lbDay = await components_2.Label.create();
                    const lbMin = await components_2.Label.create();
                    lbHour.classList.add('timer-value');
                    lbDay.classList.add('timer-value');
                    lbMin.classList.add('timer-value');
                    hStackTimer.appendChild(lbTimer);
                    hStackTimer.appendChild(this.$render("i-panel", { lineHeight: "29px" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center", class: "custom-timer" },
                            lbDay,
                            this.$render("i-label", { caption: "D", class: "timer-unit" }),
                            lbHour,
                            this.$render("i-label", { caption: "H", class: "timer-unit" }),
                            lbMin,
                            this.$render("i-label", { caption: "M", class: "timer-unit" }))));
                    const hStackEndTime = await components_2.HStack.create({ gap: 8, verticalAlignment: 'center', visible: false });
                    const lbEndTime = await components_2.Label.create({ caption: 'Ended On', font: { size: '0.8rem' } });
                    lbEndTime.classList.add('opacity-50');
                    hStackEndTime.appendChild(lbEndTime);
                    hStackEndTime.appendChild(this.$render("i-label", { caption: global_1.formatDate(expire), font: { size: '0.8rem', bold: true }, lineHeight: "29px" }));
                    let interval;
                    const setTimer = () => {
                        let days = 0;
                        let hours = 0;
                        let mins = 0;
                        if (components_2.moment().isBefore(components_2.moment(startDate))) {
                            lbTimer.caption = 'Starts In';
                            days = components_2.moment(startDate).diff(components_2.moment(), 'days');
                            hours = components_2.moment(startDate).diff(components_2.moment(), 'hours') - days * 24;
                            mins = components_2.moment(startDate).diff(components_2.moment(), 'minutes') - days * 24 * 60 - hours * 60;
                        }
                        else if (components_2.moment(components_2.moment()).isBefore(expire)) {
                            lbTimer.caption = 'Ends In';
                            days = components_2.moment(expire).diff(components_2.moment(), 'days');
                            hours = components_2.moment(expire).diff(components_2.moment(), 'hours') - days * 24;
                            mins = components_2.moment(expire).diff(components_2.moment(), 'minutes') - days * 24 * 60 - hours * 60;
                        }
                        else {
                            hStackTimer.visible = false;
                            hStackEndTime.visible = true;
                            lbEndTime.caption = 'Ended On';
                            days = hours = mins = 0;
                            clearInterval(interval);
                        }
                        lbDay.caption = `${days}`;
                        lbHour.caption = `${hours}`;
                        lbMin.caption = `${mins}`;
                    };
                    setTimer();
                    interval = setInterval(() => {
                        setTimer();
                    }, 1000);
                    const tradeFeePercent = new eth_wallet_1.BigNumber(1).minus(this.otcQueueInfo.tradeFee).times(100).toFixed();
                    const orderSubTotalCaption = `Order Subtotal (With ${tradeFeePercent}% Trade Fee)`;
                    const isCommissionVisible = this.data.commissionFee && this.data.commissionFeeTo;
                    const logoUrl = logo ? logo.replace('ipfs://', store_2.getIPFSGatewayUrl()) : null;
                    this.otcQueueElm.clearInnerHTML();
                    this.otcQueueElm.appendChild(this.$render("i-panel", { class: "pnl-ofc-queue container", padding: { bottom: 15, top: 15, right: 20, left: 20 }, height: "auto" },
                        this.$render("i-hstack", { horizontalAlignment: "center" },
                            this.$render("i-vstack", { gap: 10, width: 215, margin: { right: 20 }, padding: { right: 20 }, border: { right: { width: 1.5, style: 'solid', color: '#04081D' } }, position: "relative", verticalAlignment: "center" },
                                this.$render("i-label", { caption: title || '', font: { size: '16px', name: 'Montserrat Bold', bold: true } }),
                                logoUrl ? this.$render("i-image", { width: 80, height: 80, margin: { left: 'auto', right: 'auto' }, url: logoUrl, fallbackUrl: store_2.fallBackUrl }) : [],
                                this.$render("i-label", { caption: description || '', class: "opacity-50 line-clamp", font: { size: '10px', color: '#FFF' } }),
                                this.$render("i-vstack", { gap: 4, margin: { top: 8 }, verticalAlignment: "center" },
                                    this.$render("i-label", { caption: "Smart Contract", class: "opacity-50", font: { size: '8px', color: '#FFF' } }),
                                    this.$render("i-label", { caption: global_1.truncateAddress(pairAddress), font: { size: '10px', color: '#FFF' }, class: "smart-contract--link", onClick: () => store_2.viewOnExplorerByAddress(chainId, pairAddress) })),
                                this.$render("i-label", { caption: "Terms & Condition", link: { href: 'https://docs.scom.dev/' }, display: "block", margin: { top: 'auto' }, class: "opacity-50", font: { size: '10px', color: '#FFF' } })),
                            this.$render("i-vstack", { verticalAlignment: "start" },
                                this.$render("i-hstack", { gap: '2.1rem', verticalAlignment: "center" },
                                    this.$render("i-vstack", { margin: { top: '0.5rem' }, width: "50%" },
                                        this.$render("i-label", { caption: "Offer to Buy", font: { size: '1.1rem' }, class: "opacity-50" }),
                                        this.$render("i-vstack", { gap: 4, horizontalAlignment: "start" },
                                            this.$render("i-label", { caption: `${global_1.formatNumber(restrictedPrice)} ${((_b = this.secondTokenObject) === null || _b === void 0 ? void 0 : _b.symbol) || ''}`, font: { size: 'clamp(1.3rem, 1.35rem + 0.9vw, 2.3rem)', name: 'Montserrat Bold' } }),
                                            this.$render("i-label", { caption: `~ ${global_1.formatNumber(usd)} USD`, font: { size: 'clamp(0.6rem, 0.55rem + 0.4vw, 1rem)' }, lineHeight: "22px", class: "opacity-50" }))),
                                    this.$render("i-vstack", { margin: { top: '0.5rem' }, gap: "0.5rem", width: "50%" },
                                        this.$render("i-vstack", { gap: 4 },
                                            this.$render("i-label", { caption: "Offer Availability", font: { size: '0.8rem' }, class: "opacity-50" }),
                                            this.$render("i-hstack", { gap: 4, verticalAlignment: "end" },
                                                this.$render("i-label", { caption: `${global_1.formatNumber(availableAmount)} ${((_c = this.firstTokenObject) === null || _c === void 0 ? void 0 : _c.symbol) || ''}`, font: { size: '0.8rem' } }))),
                                        this.$render("i-vstack", { gap: 4 },
                                            this.$render("i-label", { caption: "Valid Period", font: { size: '0.8rem' }, class: "opacity-50" }),
                                            hStackTimer,
                                            hStackEndTime))),
                                this.$render("i-vstack", { verticalAlignment: "center" },
                                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center" },
                                        this.$render("i-vstack", { gap: 4, width: "calc(50% - 20px)", height: 85, verticalAlignment: "center" },
                                            this.$render("i-hstack", { gap: 4, verticalAlignment: "end" },
                                                this.$render("i-label", { caption: `${((_d = this.firstTokenObject) === null || _d === void 0 ? void 0 : _d.symbol) || ''} to sell`, font: { size: '12px' }, class: "opacity-50" }),
                                                this.$render("i-label", { caption: `Balance: ${global_1.formatNumber(this.getFirstTokenBalance())} ${firstSymbol}`, font: { size: '12px' }, tooltip: { content: `${global_1.formatNumber(this.getFirstTokenBalance())} ${firstSymbol}`, placement: 'top' }, class: "opacity-50 text-overflow", maxWidth: "calc(100% - 110px)", margin: { left: 'auto' } }),
                                                this.$render("i-button", { id: "btnMax", caption: "Max", enabled: !this.isSellDisabled && new eth_wallet_1.BigNumber(this.getFirstAvailableBalance()).gt(0), class: "btn-os btn-max", width: 26, font: { size: '8px' }, onClick: this.setMaxBalance })),
                                            this.$render("i-hstack", { id: "firstInputBox", gap: 8, width: "100%", height: 50, verticalAlignment: "center", background: { color: '#232B5A' }, border: { radius: 16, width: 2, style: 'solid', color: 'transparent' }, padding: { left: 6, right: 6 } },
                                                this.$render("i-hstack", { gap: 4, width: 100, verticalAlignment: "center" },
                                                    this.$render("i-image", { width: 20, height: 20, url: store_2.getTokenIcon((_e = this.firstTokenObject) === null || _e === void 0 ? void 0 : _e.address), fallbackUrl: store_2.fallBackUrl }),
                                                    this.$render("i-label", { caption: firstSymbol, font: { size: '16px' } })),
                                                this.$render("i-input", { id: "firstInput", inputType: "number", placeholder: "0.0", class: "input-amount", width: "100%", height: "100%", enabled: !this.isSellDisabled, onChanged: this.firstInputChange, onFocus: () => this.handleFocusInput(true, true), onBlur: () => this.handleFocusInput(true, false) }))),
                                        this.$render("i-icon", { name: "arrow-right", fill: "#f15e61", width: 20, height: 20, margin: { top: 23 } }),
                                        this.$render("i-vstack", { gap: 4, width: "calc(50% - 20px)", height: 85, verticalAlignment: "center" },
                                            this.$render("i-label", { caption: "You Receive", font: { size: '12px' }, class: "opacity-50" }),
                                            this.$render("i-hstack", { id: "secondInputBox", width: "100%", height: 50, position: "relative", verticalAlignment: "center", background: { color: '#232B5A' }, border: { radius: 16, width: 2, style: 'solid', color: 'transparent' }, padding: { left: 6, right: 6 } },
                                                this.$render("i-hstack", { gap: 4, margin: { right: 8 }, width: 100, verticalAlignment: "center" },
                                                    this.$render("i-image", { width: 20, height: 20, url: store_2.getTokenIcon((_f = this.secondTokenObject) === null || _f === void 0 ? void 0 : _f.address), fallbackUrl: store_2.fallBackUrl }),
                                                    this.$render("i-label", { caption: ((_g = this.secondTokenObject) === null || _g === void 0 ? void 0 : _g.symbol) || '', font: { size: '16px' } })),
                                                this.$render("i-input", { id: "secondInput", inputType: "number", placeholder: "0.0", class: "input-amount", width: "100%", height: "100%", enabled: !this.isSellDisabled, onChanged: this.secondInputChange, onFocus: () => this.handleFocusInput(false, true), onBlur: () => this.handleFocusInput(false, false) })))),
                                    this.$render("i-vstack", { margin: { top: '0.5rem' }, padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, gap: "0.5rem", background: { color: '#0c1234' }, border: { radius: '0.75rem', width: '1px', style: 'solid', color: 'transparent' } },
                                        this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                                            this.$render("i-label", { caption: orderSubTotalCaption, font: { size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', bold: true } }),
                                            this.$render("i-label", { id: "lbOrderSubTotal", caption: `0 ${((_h = this.firstTokenObject) === null || _h === void 0 ? void 0 : _h.symbol) || ''}`, font: { size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', bold: true } })),
                                        this.$render("i-hstack", { visible: isCommissionVisible, gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                                            this.$render("i-label", { caption: "Commission Fee", font: { size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', bold: true } }),
                                            this.$render("i-label", { id: "lbCommissionFee", caption: `0 ${((_j = this.firstTokenObject) === null || _j === void 0 ? void 0 : _j.symbol) || ''}`, font: { size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', bold: true } })),
                                        this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                                            this.$render("i-label", { caption: "You will transfer", font: { size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', color: '#f15e61', bold: true } }),
                                            this.$render("i-label", { id: "lbOrderTotal", caption: `0 ${((_k = this.firstTokenObject) === null || _k === void 0 ? void 0 : _k.symbol) || ''}`, font: { size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', color: '#f15e61', bold: true } }))),
                                    this.$render("i-vstack", { margin: { top: 15 }, verticalAlignment: "center", horizontalAlignment: "center" },
                                        this.$render("i-button", { id: "btnSell", caption: "Sell Now", enabled: false, class: "btn-os btn-sell", margin: { bottom: 0 }, rightIcon: { spin: true, visible: false, fill: '#fff' }, onClick: this.onSell })))))));
                }
                else {
                    this.renderEmpty();
                }
            };
            this.init = async () => {
                super.init();
                this.pnlConfig = new panel_config_1.PanelConfig();
                this.pnlConfig.visible = false;
                this.pnlConfig.onConfigSave = (campaign) => this.onConfigSave(campaign);
                this.pnlConfig.onReset = () => {
                    this.pnlConfig.visible = false;
                    this.otcQueueLayout.visible = true;
                };
                this.otcQueueComponent.appendChild(this.pnlConfig);
                this.otcQueueAlert = new alert_1.Alert();
                this.otcQueueComponent.appendChild(this.otcQueueAlert);
                this.otcQueueAlert.visible = false;
                this.showResultMessage(this.otcQueueAlert, 'warning', '');
                setTimeout(() => {
                    this.otcQueueAlert.closeModal();
                    this.otcQueueAlert.visible = true;
                }, 100);
                this.initWalletData();
                store_2.setCurrentChainId(store_2.getDefaultChainId());
                if (!this.data) {
                    await this.renderEmpty();
                }
            };
            if (options && options) {
                store_2.setDataFromSCConfig(options);
            }
            this.$eventBus = components_2.application.EventBus;
            this.registerEvent();
        }
        validateConfig() {
        }
        async getData() {
            return this.data;
        }
        async setData(value) {
            this.data = value;
            this.pnlConfig.visible = false;
            this.otcQueueLayout.visible = true;
            await this.onSetupPage(store_2.isWalletConnected());
        }
        async getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
            if (this.tag) {
                if (this.tag.feeTo) {
                    this.data.commissionFeeTo = this.tag.feeTo;
                }
            }
        }
        async edit() {
            this.pnlConfig.showInputCampaign(!this.data, this.getCampaign());
            this.otcQueueLayout.visible = false;
            this.pnlConfig.visible = true;
        }
        async preview() {
            if (this.pnlConfig) {
                this.pnlConfig.onPreview();
            }
        }
        async confirm() {
            if (this.pnlConfig) {
                this.pnlConfig.onConfirm();
            }
        }
        async discard() {
            this.pnlConfig.visible = false;
            this.otcQueueLayout.visible = true;
        }
        async config() {
        }
        async onConfigSave(otcQueue) {
            this.data = otcQueue;
            this.pnlConfig.visible = false;
            this.otcQueueLayout.visible = true;
            await this.onSetupPage(store_2.isWalletConnected());
        }
        async onEditCampaign(isNew, data) {
            this.pnlConfig.showInputCampaign(isNew, this.getCampaign(data));
            this.otcQueueLayout.visible = false;
            this.pnlConfig.visible = true;
        }
        getCampaign(data) {
            const _data = data ? data : this.data;
            return _data;
        }
        showImportJsonError(message) {
            this.importFileErrModal.visible = true;
            this.importFileErr.caption = message;
        }
        get isSellDisabled() {
            if (!this.otcQueueInfo)
                return true;
            const { startDate, expire } = this.otcQueueInfo;
            const isUpcoming = components_2.moment().isBefore(components_2.moment(startDate));
            const isEnded = components_2.moment().isAfter(components_2.moment(expire));
            if (isUpcoming || isEnded) {
                return true;
            }
            return false;
        }
        get submitButtonText() {
            var _a, _b;
            if (this.isApproveButtonShown) {
                return ((_a = this.btnSell) === null || _a === void 0 ? void 0 : _a.rightIcon.visible) ? 'Approving' : 'Approve';
            }
            const firstVal = new eth_wallet_1.BigNumber(this.firstInput.value);
            const secondVal = new eth_wallet_1.BigNumber(this.secondInput.value);
            if (firstVal.lt(0) || secondVal.lt(0)) {
                return 'Amount must be greater than 0';
            }
            if (this.otcQueueInfo) {
                const firstMaxVal = new eth_wallet_1.BigNumber(this.getFirstAvailableBalance());
                if (firstVal.gt(firstMaxVal)) {
                    return 'Insufficient amount available';
                }
            }
            if ((_b = this.btnSell) === null || _b === void 0 ? void 0 : _b.rightIcon.visible) {
                return 'Selling';
            }
            return 'Sell Now';
        }
        ;
        render() {
            return (this.$render("i-panel", { id: "otcQueueComponent", class: "pageblock-otc-queue", minHeight: 200 },
                this.$render("i-panel", { id: "otcQueueLayout", class: "otc-queue-layout", width: "100%", height: store_2.MAX_HEIGHT },
                    this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                        this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                            this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_2.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                            this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                    this.$render("i-panel", { id: "otcQueueElm", class: "wrapper" }))));
        }
    };
    Main = __decorate([
        components_2.customModule
    ], Main);
    exports.Main = Main;
});
