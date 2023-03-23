var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@modules/panel-config/campaign.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@modules/global", "@modules/otc-queue-utils", "@modules/store"], function (require, exports, components_1, eth_wallet_1, global_1, otc_queue_utils_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CampaignConfig = void 0;
    ;
    let CampaignConfig = class CampaignConfig extends components_1.Module {
        constructor(parent, options) {
            super(parent, options);
            this.pairAddress = '';
            this.logoUrl = '';
            this.firstToken = '';
            this.secondToken = '';
            this.isInitialized = false;
            this.setupInput = () => {
            };
            this.setupData = async () => {
                if (this.data) {
                    const { title, description, pairAddress, offerIndex, direction, logo, commissionFee } = this.data;
                    if (this.isInitialized) {
                        if (this.setLoading) {
                            this.setLoading(true);
                        }
                        this.inputName.value = title;
                        this.inputDesc.value = description;
                        this.pairAddress = pairAddress;
                        this.inputPairAddress.value = pairAddress;
                        this.inputOfferIndex.value = `${offerIndex}` || '';
                        this.ckbDirection.checked = direction === undefined ? true : direction;
                        this.inputCommissionFee.value = commissionFee;
                        if (logo) {
                            this.uploadLogo.preview(logo);
                            this.logoUrl = logo;
                        }
                        await this.getTokens();
                        if (this.setLoading) {
                            this.setLoading(false);
                        }
                        this.emitInput();
                    }
                }
            };
            this.getTokens = async () => {
                const pairAddress = this.inputPairAddress.value;
                this.pairAddress = pairAddress;
                if (pairAddress && pairAddress.length >= 32) {
                    const tokens = await otc_queue_utils_1.getTokens(pairAddress);
                    this.firstToken = tokens.token0;
                    this.secondToken = tokens.token1;
                    this.updateTokens(pairAddress);
                }
                else {
                    this.wrapperTokens.visible = false;
                    this.emitInput();
                }
            };
            this.updateTokens = (pairAddress) => {
                this.emitInput();
                if (pairAddress && pairAddress !== this.pairAddress)
                    return;
                if (!this.firstToken || !this.secondToken) {
                    this.wrapperTokens.visible = false;
                    return;
                }
                this.wrapperTokens.visible = true;
                if (this.ckbDirection.checked) {
                    this.imgFirstToken.url = store_1.getTokenIcon(this.firstToken);
                    this.imgSecondToken.url = store_1.getTokenIcon(this.secondToken);
                    this.lbFirstToken.caption = store_1.tokenSymbol(this.firstToken);
                    this.lbSecondToken.caption = store_1.tokenSymbol(this.secondToken);
                }
                else {
                    this.imgFirstToken.url = store_1.getTokenIcon(this.secondToken);
                    this.imgSecondToken.url = store_1.getTokenIcon(this.firstToken);
                    this.lbFirstToken.caption = store_1.tokenSymbol(this.secondToken);
                    this.lbSecondToken.caption = store_1.tokenSymbol(this.firstToken);
                }
            };
            this.emitInput = () => {
                components_1.application.EventBus.dispatch("emitInput" /* EmitInput */);
            };
            this.onInputPair = async () => {
                await this.getTokens();
            };
            this.onInputIndex = () => {
                let value = this.inputOfferIndex.value;
                value = value.replace(/[^0-9]+/g, "");
                this.inputOfferIndex.value = value;
                this.emitInput();
            };
            this.onInputText = () => {
                this.emitInput();
            };
            this.checkValidation = () => {
                return !!this.inputName.value && this.inputPairAddress.value &&
                    this.firstToken && this.secondToken && global_1.isValidNumber(this.inputOfferIndex.value);
            };
            this.getData = () => {
                const campaign = {
                    chainId: eth_wallet_1.Wallet.getClientInstance().chainId,
                    title: this.inputName.value,
                    description: this.inputDesc.value,
                    logo: this.logoUrl || undefined,
                    pairAddress: this.inputPairAddress.value,
                    offerIndex: this.inputOfferIndex.value,
                    direction: this.ckbDirection.checked,
                    commissionFee: this.inputCommissionFee.value,
                    commissionFeeTo: ''
                };
                return campaign;
            };
        }
        set isNew(value) {
            this._isNew = value;
            this.setupInput();
        }
        get isNew() {
            return this._isNew;
        }
        set data(value) {
            this._data = value;
            this.setupData();
        }
        get data() {
            return this._data;
        }
        onBeforeUpload(target, file) {
            return new Promise((resolve, reject) => {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    reject('File size can not exceed 2MB!');
                }
                resolve(isLt2M);
            });
        }
        async onChangeFile(source, files) {
            if (!files.length)
                return;
            const data = await this.uploadLogo.toBase64(files[0]);
            this.logoUrl = data || '';
        }
        onRemove(source, file) {
            this.logoUrl = '';
        }
        async init() {
            super.init();
            this.setupInput();
            this.isInitialized = true;
            this.setupData();
        }
        render() {
            return (this.$render("i-panel", { class: "custom-scroll" },
                this.$render("i-vstack", { gap: 10, verticalAlignment: "center", class: "main-content" },
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Title" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-input", { id: "inputName", class: "input-text w-input", onChanged: this.onInputText })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-label", { class: "lb-title", caption: "Description" }),
                        this.$render("i-input", { id: "inputDesc", class: "input-area w-input", inputType: "textarea", rows: 3, onChanged: this.onInputText })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-label", { class: "lb-title", caption: "Logo" }),
                        this.$render("i-vstack", { gap: 4, verticalAlignment: "center", class: "w-input", position: "relative" },
                            this.$render("i-upload", { id: "uploadLogo", class: "input-text w-input cs-upload", accept: "image/*", onUploading: this.onBeforeUpload.bind(this), onChanged: this.onChangeFile.bind(this), onRemoved: this.onRemove.bind(this) }))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Pair Address" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-input", { id: "inputPairAddress", class: "input-text w-input", onChanged: this.onInputPair })),
                    this.$render("i-hstack", { gap: 10, class: "row-mobile", margin: { top: 5, bottom: 5 }, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-label", { class: "lb-title", caption: "Direction" }),
                        this.$render("i-hstack", { gap: 20, verticalAlignment: "center", horizontalAlignment: "start", class: "w-input" },
                            this.$render("i-checkbox", { id: "ckbDirection", height: "auto", checked: true, onChanged: () => this.updateTokens() }),
                            this.$render("i-hstack", { id: "wrapperTokens", visible: false, gap: 8, verticalAlignment: "center" },
                                this.$render("i-image", { id: "imgFirstToken", width: 24, height: 24 }),
                                this.$render("i-label", { id: "lbFirstToken" }),
                                this.$render("i-icon", { name: "minus", fill: "#fff", width: 12, height: 12 }),
                                this.$render("i-image", { id: "imgSecondToken", width: 24, height: 24 }),
                                this.$render("i-label", { id: "lbSecondToken" })))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Offer Index" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-input", { id: "inputOfferIndex", class: "input-text w-input", onChanged: this.onInputIndex })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Commission Fee" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-input", { id: "inputCommissionFee", class: "input-text w-input", onChanged: this.onInputText })))));
        }
    };
    CampaignConfig = __decorate([
        components_1.customElements('campaign-config')
    ], CampaignConfig);
    exports.CampaignConfig = CampaignConfig;
});
define("@modules/panel-config/panel-config.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    components_2.Styles.cssRule('.panel-config', {
        background: "#192046",
        padding: '1rem',
        margin: 'auto',
        $nest: {
            '.modal': {
                width: 800,
                maxWidth: '100%',
                borderRadius: '1rem',
                padding: '1.5rem 1rem',
            },
            'i-button': {
                padding: '6px 12px',
                textAlign: 'center',
            },
            '.pnl-label': {
                $nest: {
                    'i-icon': {
                        display: 'none',
                        cursor: 'pointer'
                    },
                    '&:hover i-icon': {
                        display: 'block',
                    },
                }
            },
            '.btn-item': {
                background: `#f50057 !important`,
                borderRadius: 0,
                color: '#FFFFFF',
                $nest: {
                    '&.btn-active': {
                        background: `#F15E61 !important`,
                        cursor: 'default',
                    }
                }
            },
            '.w-input': {
                width: 'calc(100% - 130px) !important',
            },
            'input': {
                $nest: {
                    '&::-webkit-outer-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: '0',
                    },
                    '&::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: '0',
                    },
                    '&:focus::placeholder': {
                        opacity: 0,
                    }
                }
            },
            '.input-area': {
                height: '80px !important',
                borderRadius: 12,
                padding: 8,
                background: "#0C1234",
                $nest: {
                    'textarea': {
                        width: '100% !important',
                        height: '100% !important',
                        background: 'transparent',
                        boxShadow: 'none',
                        outline: 'none',
                        border: 'none',
                        color: '#FFFFFF',
                        fontSize: '1rem',
                    }
                }
            },
            '.input-text': {
                height: '40px !important',
                borderRadius: 12,
                paddingInline: 8,
                background: "#0C1234",
                $nest: {
                    '&.w-100': {
                        width: '100% !important',
                    },
                    input: {
                        border: 'none',
                        width: '100% !important',
                        height: '100% !important',
                        backgroundColor: 'transparent',
                        color: '#FFFFFF',
                        fontSize: '1rem',
                        textAlign: 'left'
                    },
                }
            },
            'i-checkbox .checkmark': {
                backgroundColor: "#0C1234",
                border: `1px solid #6573c3`,
                borderRadius: 6,
                width: 20,
                height: 20,
                $nest: {
                    '&:after': {
                        borderWidth: 2,
                        top: 3
                    }
                }
            },
            'i-checkbox.is-checked .checkmark': {
                backgroundColor: '#f73378'
            },
            'i-upload.cs-upload': {
                maxWidth: 300,
                minHeight: '150px !important',
                maxHeight: '200px',
                height: 'auto !important',
                borderRadius: 12,
                padding: 4,
                $nest: {
                    '.i-upload-wrapper': {
                        margin: 4,
                        height: 'inherit',
                        cursor: 'pointer',
                        borderColor: '#F15E61'
                    },
                    '.i-upload-wrapper i-button': {
                        background: '#F15E61',
                        color: '#FFFFFF'
                    },
                    '.i-upload_preview': {
                        minHeight: 'auto',
                    },
                    'i-image': {
                        display: 'flex',
                    },
                    'i-image img': {
                        margin: 'auto',
                        objectFit: 'contain',
                        width: 300,
                        height: 150,
                    },
                }
            },
            '#modalAddCommission': {
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
                        $nest: {
                            'span': {
                                color: '#F15E61',
                            },
                        }
                    },
                    '.i-modal_header > i-icon': {
                        fill: `#F15E61 !important`
                    },
                }
            },
            '#tableCommissions': {
                boxSizing: 'border-box',
                backdropFilter: 'blur(74px)',
                color: '#fff',
                $nest: {
                    '.i-table-header': {
                        background: '#221946',
                    },
                    '.i-table-header>tr>th': {
                        borderBottom: '1px solid #646068'
                    },
                    '.i-table-body>tr>td': {
                        borderBottom: '1px solid #646068',
                    },
                    '.i-table-body>tr:last-child': {
                        borderBottom: 'none',
                        $nest: {
                            '&>td': {
                                borderBottom: 'none',
                            }
                        }
                    },
                    'tr:hover td': {
                        background: 'transparent',
                        color: '#fff'
                    },
                    'table': {
                        $nest: {
                            'thead': {
                                background: '#182045',
                            },
                            'thead th': {
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                padding: '1rem',
                                $nest: {
                                    '&:first-child': {
                                        textAlign: "left"
                                    }
                                }
                            },
                            'tbody tr': {
                                fontSize: '1rem',
                                background: '#182045',
                                $nest: {
                                    'td:first-child': {
                                        textAlign: 'left'
                                    }
                                }
                            },
                        },
                    },
                }
            },
            '.main-content': {
                $nest: {
                    '.lb-title ': {
                        color: '#fff'
                    },
                }
            },
            '#lbMinLockTime': {
                opacity: 0.8
            },
            'token-selection.disabled #btnToken': {
                cursor: 'default !important',
            },
            '.network-selection': {
                $nest: {
                    '.btn-select:hover': {
                        background: `rgba(0, 0, 0, 0.54) !important`,
                    },
                    '.btn-select.disabled': {
                        color: `#fff !important`,
                        cursor: 'default !important',
                    },
                    '.modal': {
                        padding: '0.75rem 0',
                        background: '#0C1234',
                        borderRadius: 6,
                        border: `1px solid #2c387e`,
                        $nest: {
                            '& > i-vstack': {
                                maxHeight: '40vh',
                                overflow: 'auto',
                            },
                            'i-button': {
                                boxShadow: 'none',
                                color: '#FFFFFF'
                            },
                            'i-button:hover': {
                                background: `linear-gradient(254.8deg, rgba(231,91,102,.1) -8.08%, rgba(181,32,130,.1) 84.35%) !important`,
                            },
                        },
                    },
                },
            },
            '.cursor-pointer': {
                cursor: 'pointer',
            },
            '&.custom-scroll *': {
                $nest: {
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '&::-webkit-scrollbar': {
                        width: '5px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#F15E61',
                        borderRadius: '5px',
                    }
                }
            },
            '#loadingElm': {
                $nest: {
                    '&.i-loading--active': {
                        marginTop: '2rem',
                        position: 'initial',
                        $nest: {
                            '.i-loading-spinner': {
                                marginTop: '2rem',
                            },
                        },
                    },
                    '&.i-loading-overlay': {
                        background: '#192046 !important'
                    },
                },
            },
            '@media screen and (max-width: 525px)': {
                $nest: {
                    '.main-content': {
                        $nest: {
                            '.w-input': {
                                width: '100% !important'
                            },
                            '.row-mobile': {
                                flexWrap: 'nowrap',
                                $nest: {
                                    '.lb-title': {
                                        whiteSpace: 'nowrap',
                                    }
                                }
                            },
                            '.network-selection': {
                                $nest: {
                                    'i-button': {
                                        maxWidth: 'inherit !important',
                                    },
                                    'i-modal': {
                                        width: '100%',
                                        maxWidth: 'inherit !important',
                                        $nest: {
                                            '.modal': {
                                                background: '#192046',
                                                maxWidth: 'inherit !important',
                                            }
                                        }
                                    }
                                }
                            },
                            'i-hstack': {
                                flexWrap: 'wrap',
                            },
                        }
                    }
                }
            }
        }
    });
});
define("@modules/panel-config/panel-config.tsx", ["require", "exports", "@ijstech/components", "@modules/global", "@modules/store", "@modules/alert", "@modules/panel-config/campaign.tsx", "@modules/assets", "@modules/panel-config/panel-config.css.ts"], function (require, exports, components_3, global_2, store_2, alert_1, campaign_1, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PanelConfig = void 0;
    ;
    let PanelConfig = class PanelConfig extends components_3.Module {
        constructor(parent, options) {
            super(parent, options);
            this.registerEvent = () => {
                this.$eventBus.register(this, "emitInput" /* EmitInput */, this.updateButton);
                this.$eventBus.register(this, "isWalletConnected" /* IsWalletConnected */, this.renderUI);
                this.$eventBus.register(this, "IsWalletDisconnected" /* IsWalletDisconnected */, this.renderUI);
                this.$eventBus.register(this, "chainChanged" /* chainChanged */, this.onChangeChanged);
            };
            this.renderUI = () => {
                const isConnected = store_2.isWalletConnected();
                this.networkElm.visible = !isConnected;
                this.otcCampaignElm.visible = isConnected;
                this.updateNetworkName(store_2.getChainId());
            };
            this.onChangeChanged = () => {
                const chainId = store_2.getChainId();
                this.updateNetworkName(chainId);
                this.updateButton();
            };
            this.showInputCampaign = async (isNew, campaign) => {
                this.pnlInfoElm.clearInnerHTML();
                this.onAddCampaign(campaign);
            };
            this.onAddCampaign = async (campaign) => {
                this.campaignConfig = new campaign_1.CampaignConfig();
                this.campaignConfig.setLoading = (status) => { this.loadingElm.visible = status; };
                this.campaignConfig.data = campaign;
                this.pnlInfoElm.clearInnerHTML();
                this.pnlInfoElm.appendChild(this.campaignConfig);
            };
            this.onBack = () => {
                this.pnlInfoElm.clearInnerHTML();
                if (this.onReset) {
                    this.onReset();
                }
            };
            this.updateNetworkName = (chainId) => {
                const network = store_2.getNetworkInfo(chainId);
                this.lbNetworkName.caption = network ? network.name : 'Unknown Network';
            };
            this.updateButton = () => {
                const valid = !!this.checkValidation();
                this.btnSave.enabled = valid;
                this.btnExport.enabled = valid;
            };
            this.checkValidation = () => {
                if (this.campaignConfig) {
                    return this.campaignConfig.checkValidation();
                }
                return false;
            };
            this.getCampaignData = () => {
                return this.campaignConfig.getData();
            };
            this.onSave = () => {
                const campaign = this.getCampaignData();
                this.onConfigSave(campaign);
            };
            this.onDownload = () => {
                if (this.checkValidation()) {
                    const campaign = this.getCampaignData();
                    global_2.downloadJsonFile('otc-queue.json', campaign);
                }
            };
            this.$eventBus = components_3.application.EventBus;
            this.registerEvent();
        }
        onPreview() {
            const campaign = this.getCampaignData();
            this.onConfigSave(campaign);
        }
        onConfirm() {
            this.onSave();
        }
        init() {
            super.init();
            this.otcQueueAlert = new alert_1.Alert();
            this.appendChild(this.otcQueueAlert);
        }
        render() {
            return (this.$render("i-panel", { class: "panel-config custom-scroll" },
                this.$render("i-panel", { id: "configCampaigElm", margin: { left: 'auto', right: 'auto' }, width: "100%", maxWidth: 800 },
                    this.$render("i-hstack", { gap: 4, width: "fit-content", margin: { top: 5, bottom: 15, left: 'auto' }, verticalAlignment: "center", class: "cursor-pointer", onClick: this.onBack },
                        this.$render("i-icon", { name: "arrow-left", fill: '#FFFFFF', width: 20, height: 20 }),
                        this.$render("i-label", { caption: "Back", font: { size: '20px', bold: true, color: '#FFFFFF' } })),
                    this.$render("i-hstack", { id: "networkElm", width: "100%", height: 150, verticalAlignment: "center", horizontalAlignment: "center" },
                        this.$render("i-label", { caption: "Please connect with your network!", font: { color: '#FFFFFF' } })),
                    this.$render("i-panel", { visible: false, id: "otcCampaignElm", width: "100%" },
                        this.$render("i-hstack", { width: "100%", margin: { bottom: 10 }, verticalAlignment: "center", horizontalAlignment: "center" },
                            this.$render("i-label", { id: "lbNetworkName", font: { color: '#F15E61', size: '20px', bold: true } })),
                        this.$render("i-vstack", { gap: 10, verticalAlignment: "center", class: "main-content", position: "relative" },
                            this.$render("i-vstack", { id: "loadingElm", visible: false, class: "i-loading-overlay" },
                                this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                                    this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                                    this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                            this.$render("i-panel", { id: "pnlInfoElm" }),
                            this.$render("i-hstack", { gap: 10, margin: { top: 20 }, verticalAlignment: "center", horizontalAlignment: "center", wrap: "wrap" },
                                this.$render("i-button", { id: "btnSave", caption: "Save", enabled: false, width: 200, maxWidth: "100%", class: "btn-os", onClick: this.onSave }),
                                this.$render("i-button", { id: "btnExport", caption: "Export JSON", enabled: false, width: 200, maxWidth: "100%", class: "btn-os", onClick: () => this.onDownload() })))))));
        }
    };
    PanelConfig = __decorate([
        components_3.customElements('otc-queue-config')
    ], PanelConfig);
    exports.PanelConfig = PanelConfig;
});
define("@modules/panel-config", ["require", "exports", "@modules/panel-config/panel-config.tsx"], function (require, exports, panel_config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PanelConfig = void 0;
    Object.defineProperty(exports, "PanelConfig", { enumerable: true, get: function () { return panel_config_1.PanelConfig; } });
});
