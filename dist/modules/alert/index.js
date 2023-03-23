var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@modules/alert/alert.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = components_1.Styles.style({
        textAlign: 'center',
        $nest: {
            'i-label > *': {
                color: '#fff',
                fontSize: '.875rem',
                wordBreak: 'normal',
            },
            '.modal': {
                minWidth: '25%',
                maxWidth: '100%',
                width: 455,
            },
            '.i-modal-close svg': {
                fill: '#F05E61'
            },
            '.i-modal_content': {
                padding: '0 2.563rem 1.5rem'
            },
            '.i-modal_header': {
                borderBottom: 'none !important'
            },
            '.waiting-txt > *': {
                color: '#F6C958',
                fontSize: '1.125rem'
            },
            '.confirm-txt > *': {
                color: '#C2C3CB'
            },
            '.red-link *': {
                color: '#FD4A4C',
                textDecoration: 'none'
            },
            '.mb': {
                marginBottom: '1rem'
            },
            'i-button': {
                padding: '1rem 2rem',
                textAlign: 'center'
            },
            '.address-txt > *': {
                lineHeight: '1.5rem'
            },
            '.btn-submit': {
                padding: '.35rem 2.438rem',
                borderRadius: 5
            },
            '.btn-cancel': {
                padding: '.35rem 2.438rem',
                borderRadius: 5,
                background: '#2B304A 0% 0% no-repeat padding-box'
            }
        }
    });
});
define("@modules/alert/alert.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@modules/global", "@modules/store", "@modules/alert/alert.css.ts", "@modules/assets"], function (require, exports, components_2, eth_wallet_1, global_1, store_1, alert_css_1, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Alert = void 0;
    ;
    let Alert = class Alert extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        get message() {
            return this._message;
        }
        set message(value) {
            this._message = value;
            this.renderUI();
        }
        ;
        async init() {
            this.classList.add(alert_css_1.default);
            super.init();
            this.confirmModal.onClose = () => {
                if (this.onCustomClose) {
                    this.onCustomClose();
                }
                this.onCloseRedirect();
            };
        }
        closeModal() {
            this.confirmModal.visible = false;
        }
        showModal() {
            this.confirmModal.visible = true;
        }
        onCloseRedirect() {
            var _a;
            const customRedirect = (_a = this.message) === null || _a === void 0 ? void 0 : _a.customRedirect;
            if (customRedirect && customRedirect.name) {
                this._message.customRedirect = null;
                if (customRedirect.params) {
                    const queries = new URLSearchParams(customRedirect.params).toString();
                    window.location.assign(`/#/${customRedirect.name}?${queries}`);
                }
                else {
                    window.location.assign(`/#/${customRedirect.name}`);
                }
            }
        }
        async buildLink() {
            if (this.message.txtHash) {
                const chainId = await eth_wallet_1.Wallet.getClientInstance().getChainId();
                store_1.viewOnExplorerByTxHash(chainId, this.message.txtHash);
            }
        }
        async renderUI() {
            this.mainContent.innerHTML = '';
            const mainSection = await components_2.VStack.create({
                horizontalAlignment: 'center'
            });
            if (this.message.status === 'warning') {
                mainSection.id = "warningSection";
                const loading = (this.$render("i-panel", { height: 100 },
                    this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay", height: "100%", background: { color: "transparent" } },
                        this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                            this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_1.default.fullPath('img/loading.svg'), width: 24, height: 24 } }),
                            this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C' }, class: "i-loading-spinner_text" })))));
                mainSection.appendChild(loading);
                const section = new components_2.VStack();
                section.margin = { bottom: 20 };
                const captionList = ['Waiting For Confirmation', this.message.content || '', 'Confirm this transaction in your wallet'];
                const classList = ['waiting-txt mb-1', 'mb-1', 'confirm-txt'];
                for (let i = 0; i < captionList.length; i++) {
                    const caption = captionList[i];
                    const label = await components_2.Label.create();
                    label.caption = caption;
                    if (classList[i]) {
                        const classes = classList[i].split(' ');
                        classes.forEach(className => label.classList.add(className));
                    }
                    section.appendChild(label);
                }
                ;
                mainSection.appendChild(section);
            }
            else if (this.message.status === 'success') {
                const chainId = await eth_wallet_1.Wallet.getClientInstance().getChainId();
                const explorerName = store_1.getNetworkExplorerName(chainId);
                const image = await components_2.Image.create({
                    width: '50px',
                    url: assets_1.default.fullPath('img/success-icon.svg')
                });
                image.classList.add("inline-block", "mb");
                mainSection.appendChild(image);
                const label = await components_2.Label.create();
                label.caption = 'Transaction Submitted';
                label.classList.add("waiting-txt");
                mainSection.appendChild(label);
                const contentSection = await components_2.Panel.create();
                contentSection.id = "contentSection";
                mainSection.appendChild(contentSection);
                const contentLabel = await components_2.Label.create();
                contentLabel.caption = this.message.content || '';
                contentSection.appendChild(contentLabel);
                if (this.message.txtHash) {
                    const section = new components_2.VStack();
                    const label1 = await components_2.Label.create({
                        caption: this.message.txtHash.substr(0, 33),
                        margin: { bottom: 4 }
                    });
                    section.appendChild(label1);
                    const label2 = await components_2.Label.create({
                        caption: this.message.txtHash.substr(33, this.message.txtHash.length)
                    });
                    label2.classList.add("mb-1");
                    section.appendChild(label2);
                    const link = await components_2.Label.create({
                        caption: `View on ${explorerName}`,
                    });
                    link.onClick = this.buildLink.bind(this);
                    link.classList.add("red-link", "block", "pointer");
                    section.appendChild(link);
                    contentSection.appendChild(section);
                }
                const button = new components_2.Button(mainSection, {
                    width: '100%',
                    caption: 'Close'
                });
                button.classList.add('btn-os');
                button.classList.add('btn-approve');
                button.classList.add('mt-1');
                button.onClick = () => this.closeModal();
                mainSection.appendChild(button);
            }
            else {
                const image = await components_2.Image.create({
                    width: '50px',
                    url: assets_1.default.fullPath('img/oswap_error.png')
                });
                image.classList.add("inline-block", "mb");
                mainSection.appendChild(image);
                const label = await components_2.Label.create({
                    caption: 'Transaction Rejected.'
                });
                label.classList.add("waiting-txt", "mb");
                mainSection.appendChild(label);
                const section = await components_2.VStack.create();
                section.id = "contentSection";
                const contentLabel = await components_2.Label.create({
                    caption: await this.onErrMsgChanged()
                });
                contentLabel.classList.add("mb-1");
                section.appendChild(contentLabel);
                mainSection.appendChild(section);
                const button = new components_2.Button(mainSection, {
                    width: '100%',
                    caption: 'Cancel'
                });
                button.classList.add('btn-os');
                button.classList.add('btn-approve');
                button.classList.add('mt-1');
                button.onClick = () => this.closeModal();
                mainSection.appendChild(button);
            }
            this.mainContent.clearInnerHTML();
            this.mainContent.appendChild(mainSection);
        }
        async onErrMsgChanged() {
            if (this.message.status !== 'error')
                return this.message.content;
            if (this.message.content.message && this.message.content.message.includes('Internal JSON-RPC error.')) {
                this.message.content.message = JSON.parse(this.message.content.message.replace('Internal JSON-RPC error.\n', '')).message;
            }
            return await global_1.parseContractError(this.message.content.message, this.message.obj);
        }
        render() {
            return (this.$render("i-modal", { id: "confirmModal", closeIcon: { name: 'times' }, class: "confirm-modal", minHeight: "280px" },
                this.$render("i-panel", { id: "mainContent", class: "i-modal_content" })));
        }
    };
    Alert = __decorate([
        components_2.customElements('otc-queue-alert')
    ], Alert);
    exports.Alert = Alert;
    ;
});
define("@modules/alert", ["require", "exports", "@modules/alert/alert.tsx"], function (require, exports, alert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Alert = void 0;
    Object.defineProperty(exports, "Alert", { enumerable: true, get: function () { return alert_1.Alert; } });
});
