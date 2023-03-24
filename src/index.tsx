import { Module, Panel, Button, Label, VStack, Container, IEventBus, application, customModule, Modal, Input, moment, HStack, customElements, ControlElement } from '@ijstech/components';
import { BigNumber, Wallet, WalletPlugin } from '@ijstech/eth-wallet';
import {} from '@ijstech/eth-contract';
import Assets from './assets';
import { formatNumber, formatDate, PageBlock, EventId, IERC20ApprovalAction, QueueType, ITokenObject, truncateAddress } from './global/index';
import { getChainId, isWalletConnected, setTokenMap, getDefaultChainId, hasWallet, connectWallet, setDataFromSCConfig, setCurrentChainId, getTokenIcon, fallBackUrl, getTokenBalances, ChainNativeTokenByChainId, getNetworkInfo, hasMetaMask, MAX_WIDTH, MAX_HEIGHT, IOTCQueueData, viewOnExplorerByAddress, getProxyAddress, updateTokenBalances, SwapData, switchNetwork, getIPFSGatewayUrl, IOTCQueueConfig, getCurrentChainId } from './store/index';
import { executeSell, getHybridRouterAddress, getOffers, getTokenPrice, getTokens } from './otc-queue-utils/index';
import { Alert } from './alert/index';
import { PanelConfig } from './panel-config/index';
import { getERC20ApprovalModelAction } from './global/index';
import scconfig from './scconfig.json';
import './index.css';

interface ScomOtcElement extends ControlElement {
	title?: string;
  description?: string;
  logo?: string;
  chainId?: number;
  pairAddress: string;
  direction?: boolean;
  offerIndex: number;
  commissionFee: string;
  commissionFeeTo?: string;
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
      ["i-scom-otc"]: ScomOtcElement;
    }
	}
}

@customModule
@customElements('i-scom-otc')
export default class ScomOTC extends Module implements PageBlock {
	private data: IOTCQueueConfig = {
		chainId: 0,
		pairAddress: '',
		direction: false,
		offerIndex: '',
		commissionFee: '',
		commissionFeeTo: ''
	};
	readonly onEdit: () => Promise<void>;
	readonly onConfirm: () => Promise<void>;
	readonly onDiscard: () => Promise<void>;

	private pnlConfig: PanelConfig;
	private $eventBus: IEventBus;
	private loadingElm: Panel;
	private otcQueueComponent: Panel;
	private otcQueueLayout: Panel;
	private otcQueueElm: Panel;
	private otcQueueAlert: Alert;
	private noCampaignSection: Panel;
	private switchNetworkSection: Panel;
	private importFileErrModal: Modal;
	private importFileErr: Label;
	private isImportNewCampaign = false;
	private btnInputCampaign: Button;
	private btnImportCampaign: Button;
	private otcQueueInfo: IOTCQueueData | null;
	private btnMax: Button;
	private firstInputBox: VStack;
	private secondInputBox: VStack;
	private firstInput: Input;
	private secondInput: Input;
	private lbOrderSubTotal: Label;
	private lbOrderTotal: Label;
	private lbCommissionFee: Label;
	private btnSell: Button;
	private approvalModelAction: IERC20ApprovalAction;
	private isApproveButtonShown: boolean;

	private firstTokenObject: ITokenObject;
	private secondTokenObject: ITokenObject;
	private tokenPrice: string = '';
	private orderSubTotal: string;
	private commissionAmount: string;
	private orderTotal: string;

	validateConfig() {}

	constructor(parent?: Container, options?: any) {
		super(parent, options);
		if (scconfig) {
			setDataFromSCConfig(scconfig);
		}
		this.$eventBus = application.EventBus;
		this.registerEvent();
	}

	static async create(options?: ScomOtcElement, parent?: Container){
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

	get chainId() {
		return this.data.chainId ?? 0;
	}
	set chainId(value: number) {
		this.data.chainId = value;
		setCurrentChainId(this.data.chainId ?? getDefaultChainId());
	}

	get pairAddress() {
		return this.data.pairAddress ?? '';
	}
	set pairAddress(value: string) {
		this.data.pairAddress = value;
	}

	get direction() {
    return this.data.direction ?? false;
  }
  set direction(value: boolean) {
    this.data.direction = value;
  }

	get offerIndex() {
		return this.data.offerIndex ?? '';
	}
	set offerIndex(value: string) {
		this.data.offerIndex = value;
	}

	get commissionFee() {
		return this.data.commissionFee ?? '';
	}
	set commissionFee(value: string) {
		this.data.commissionFee = value;
	}

	get commissionFeeTo() {
		return this.data.commissionFeeTo ?? '';
	}
	set commissionFeeTo(value: string) {
		this.data.commissionFeeTo = value;
	}
	
	get description() {
		return this.data.description ?? '';
	}
	set description(value: string) {
		this.data.description = value;
	}

	get logo() {
		return this.data.logo ?? '';
	}
	set logo(value: string) {
		this.data.logo = value;
	}

	get title() {
		return this.data.title ?? '';
	}
	set title(value: string) {
		this.data.title = value;
	}

	async getData() {
		return this.data;
	}

	async setData(value: any) {
		this.data = value;
		this.pnlConfig.visible = false;
		this.otcQueueLayout.visible = true;
		await this.onSetupPage(isWalletConnected());
	}

	async getTag() {
		return this.tag;
	}

	async setTag(value: any) {
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

	async config() {}

	async onConfigSave(otcQueue: any) {
		this.data = otcQueue;
		this.pnlConfig.visible = false;
		this.otcQueueLayout.visible = true;
		await this.onSetupPage(isWalletConnected());
	}

	async onEditCampaign(isNew: boolean, data?: any) {
		this.pnlConfig.showInputCampaign(isNew, this.getCampaign(data));
		this.otcQueueLayout.visible = false;
		this.pnlConfig.visible = true;
	}

	private getCampaign(data?: any) {
		const _data = data ? data : this.data;
		return _data;
	}

	private registerEvent = () => {
		this.$eventBus.register(this, EventId.IsWalletConnected, this.onWalletConnect);
		this.$eventBus.register(this, EventId.IsWalletDisconnected, this.onWalletConnect);
		this.$eventBus.register(this, EventId.chainChanged, this.onChainChange);
	}

	private onWalletConnect = async (connected: boolean) => {
		await this.onSetupPage(connected);
	}

	private onChainChange = async () => {
		const isConnected = isWalletConnected();
		await this.onSetupPage(isConnected);
	}

	private initWalletData = async () => {
		let accountsChangedEventHandler = async (account: string) => {
			setTokenMap();
		}
		let chainChangedEventHandler = async (hexChainId: number) => {
			setTokenMap();
		}
		let selectedProvider = localStorage.getItem('walletProvider') as WalletPlugin;
		if (!selectedProvider && hasMetaMask()) {
			selectedProvider = WalletPlugin.MetaMask;
		}
		const isValidProvider = Object.values(WalletPlugin).includes(selectedProvider);
		if (!Wallet.getClientInstance().chainId) {
			Wallet.getClientInstance().chainId = getDefaultChainId();
		}
		if (hasWallet() && isValidProvider) {
			await connectWallet(selectedProvider, {
				'accountsChanged': accountsChangedEventHandler,
				'chainChanged': chainChangedEventHandler
			});
		}
	}

	private onSetupPage = async (connected: boolean, hideLoading?: boolean) => {
		const chainId = getChainId();
		if (this.data && this.data.chainId && chainId != this.data.chainId) {
			await this.renderSwitchNetworkUI(this.data.chainId);
			await switchNetwork(this.data.chainId);
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
				this.otcQueueInfo = await getOffers(this.data);
				await updateTokenBalances([this.otcQueueInfo.tokenIn, this.otcQueueInfo.tokenOut]);
				this.firstTokenObject = this.otcQueueInfo.tokenIn;
				this.secondTokenObject = this.otcQueueInfo.tokenOut;
				this.tokenPrice = await getTokenPrice(this.secondTokenObject?.address);
				await this.renderOTCQueueCampaign();
				if (this.firstTokenObject && this.firstTokenObject.symbol !== ChainNativeTokenByChainId[chainId]?.symbol) {
					await this.initApprovalModelAction();
				}
			} catch(err) {
				console.log('err', err);
				await this.renderEmpty();
			}
			if (!hideLoading && this.loadingElm) {
				this.loadingElm.visible = false;
			}
		}
	}

	private initInputFile = (importFileElm: Label) => {
		importFileElm.caption = '<input type="file" accept=".json" />';
		const inputElm = importFileElm.firstChild?.firstChild as HTMLElement;
		if (inputElm) {
			inputElm.onchange = (event: any) => {
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
				}
			}
		}
	}

	private convertJSONToObj = async (result: any) => {
		if (!result) this.showImportJsonError('Data is corrupted. No data were recovered.');
		try {
			const campaignObj = JSON.parse(result);
			const length = Object.keys(campaignObj).length;
			if (!length) {
				this.showImportJsonError('No data found in the imported file.');
			} else if (campaignObj.chainId && campaignObj.chainId !== getChainId()) {
				const networkName = getNetworkInfo(campaignObj.chainId) ? getNetworkInfo(campaignObj.chainId).name : `ChainId = ${campaignObj.chainId}`;
				this.showImportJsonError(`Please switch the network to ${networkName}`);
			} else {
				this.onEditCampaign(this.isImportNewCampaign, campaignObj);
			}
		} catch {
			this.showImportJsonError('Data is corrupted. No data were recovered.');
		}
	}

	private showImportJsonError(message: string) {
		this.importFileErrModal.visible = true;
		this.importFileErr.caption = message;
	}

	private get isSellDisabled() {
		if (!this.otcQueueInfo) return true;
		const { startDate, expire } = this.otcQueueInfo;
		const isUpcoming = moment().isBefore(moment(startDate));
		const isEnded = moment().isAfter(moment(expire));
		if (isUpcoming || isEnded) {
			return true;
		}
		return false;
	}

	private getFirstTokenBalance = () => {
		const tokenBalances = getTokenBalances();
		const tokenBalance = new BigNumber(tokenBalances[this.firstTokenObject?.address?.toLowerCase()]);
		return tokenBalance.toFixed();
	}

	private getFirstAvailableBalance = () => {
		if (!this.otcQueueInfo || this.isSellDisabled) {
			return '0';
		}
		const { availableAmount, tradeFee } = this.otcQueueInfo;
		const tokenBalances = getTokenBalances();
		const tokenBalance = new BigNumber(tokenBalances[this.firstTokenObject?.address?.toLowerCase()]);
		let maxTokenBalance = new BigNumber(0);
		if (this.data.commissionFee && this.data.commissionFeeTo) {
			maxTokenBalance = new BigNumber(tokenBalance).div(new BigNumber(1).div(tradeFee).plus(this.data.commissionFee));
		}
		else {
			maxTokenBalance = new BigNumber(tokenBalance).div(new BigNumber(1).div(tradeFee));
		}

		return (BigNumber.minimum(availableAmount, maxTokenBalance)).toFixed();
	}

	private handleFocusInput = (first: boolean, isFocus: boolean) => {
		const elm = first ? this.firstInputBox : this.secondInputBox;
		if (isFocus) {
			elm.classList.add('highlight-box');
		} else {
			elm.classList.remove('highlight-box');
		}
	}

	private setMaxBalance = () => {
		this.firstInput.value = this.getFirstAvailableBalance();
		this.firstInputChange();		
	}

	private calculateCommissionFee = () => {
		const commissionsAmount = this.data.commissionFee && this.data.commissionFeeTo ? new BigNumber(this.firstInput.value).times(this.data.commissionFee) : new BigNumber(0);
		return commissionsAmount;
	}

	private firstInputChange = () => {
		const firstToken = this.firstTokenObject;
		const secondToken = this.secondTokenObject;
		// limitInputNumber(this.firstInput, firstToken?.decimals || 18);
		if (!this.otcQueueInfo) return;
		const info = this.otcQueueInfo;
		const { offerPrice, tradeFee, restrictedPrice } = info;
		const symbol = this.firstTokenObject?.symbol || '';
		const outputVal = new BigNumber(this.firstInput.value).times(restrictedPrice);
		if (outputVal.isNaN()) {
			this.secondInput.value = '';
			this.orderSubTotal = '0';
			this.orderTotal = '0';
			this.commissionAmount = '0';
			this.lbCommissionFee.caption = `0 ${symbol}`;
			this.lbOrderSubTotal.caption = `0 ${symbol}`;
			this.lbOrderTotal.caption = `0 ${symbol}`;
		} else {
			this.secondInput.value = outputVal.toFixed();
			const commissionsAmount = this.calculateCommissionFee();
			this.commissionAmount = commissionsAmount.toFixed();
			this.lbCommissionFee.caption = `${formatNumber(commissionsAmount, 6)} ${symbol}`;
			this.orderSubTotal = new BigNumber(this.firstInput.value).shiftedBy(this.firstTokenObject.decimals).idiv(tradeFee).shiftedBy(-this.firstTokenObject.decimals).toFixed();
			this.orderTotal = commissionsAmount.plus(this.orderSubTotal).toFixed();
			this.lbOrderSubTotal.caption = `${formatNumber(this.orderSubTotal, 6)} ${symbol}`; 
			this.lbOrderTotal.caption = `${formatNumber(this.orderTotal, 6)} ${symbol}`;
		}
		this.btnSell.caption = this.submitButtonText;
		this.updateBtnSell();
	}

	private secondInputChange = () => {
		const firstToken = this.firstTokenObject;
		const secondToken = this.secondTokenObject;
		// limitInputNumber(this.secondInput, secondToken?.decimals || 18);
		if (!this.otcQueueInfo) return;
		const info = this.otcQueueInfo || {} as any;
		const { offerPrice, tradeFee } = info;
		const symbol = this.firstTokenObject?.symbol || '';
		const inputVal = new BigNumber(this.secondInput.value).multipliedBy(offerPrice);
		if (inputVal.isNaN()) {
			this.firstInput.value = '';
			this.orderSubTotal = '0';
			this.orderTotal = '0';
			this.commissionAmount = '0';
			this.lbCommissionFee.caption = `0 ${symbol}`;
			this.lbOrderSubTotal.caption = `0 ${symbol}`;
			this.lbOrderTotal.caption = `0 ${symbol}`;
		} else {
			this.firstInput.value = inputVal.toFixed();
			const commissionsAmount = this.calculateCommissionFee();
			this.commissionAmount = commissionsAmount.toFixed();
			this.lbCommissionFee.caption = `${formatNumber(commissionsAmount, 6)} ${symbol}`;
			this.orderSubTotal = new BigNumber(this.firstInput.value).shiftedBy(this.firstTokenObject.decimals).idiv(tradeFee).shiftedBy(-this.firstTokenObject.decimals).toFixed();
			this.orderTotal = commissionsAmount.plus(this.orderSubTotal).toFixed();
			this.lbOrderSubTotal.caption = `${formatNumber(this.orderSubTotal, 6)} ${symbol}`; 
			this.lbOrderTotal.caption = `${formatNumber(this.orderTotal, 6)} ${symbol}`;
		}
		this.btnSell.caption = this.submitButtonText;
		this.updateBtnSell();
	}

	private updateBtnSell = () => {
		if (!this.otcQueueInfo) return;
		if (this.isSellDisabled) {
			this.btnSell.enabled = false;
			return;
		}
		const firstVal = new BigNumber(this.firstInput.value);
		const firstAvailable = this.getFirstAvailableBalance();
		if (firstVal.isNaN() || firstVal.lte(0) || firstVal.gt(firstAvailable)) {
			this.btnSell.enabled = false;
		} else {
			this.btnSell.enabled = true;
		}
	}

	private onSell = () => {
		if (this.otcQueueInfo && this.firstTokenObject && this.isApproveButtonShown) {
			this.approvalModelAction.doApproveAction(this.firstTokenObject, this.otcQueueInfo.availableAmount.toFixed());
		} else {
			this.approvalModelAction.doPayAction();
		}
	}

	private onSubmit = async () => {
		if (!this.otcQueueInfo) return;
		const firstToken = { ...this.firstTokenObject };
		const secondToken = { ...this.secondTokenObject };
		const { pairAddress, offerIndex } = this.otcQueueInfo;
		this.showResultMessage(this.otcQueueAlert, 'warning', `Transferring ${formatNumber(this.orderTotal)} ${firstToken?.symbol || ''} for ${formatNumber(this.secondInput.value)} ${secondToken?.symbol || ''}`);
		const params: SwapData = {
			provider: "RestrictedOracle",
			queueType: QueueType.GROUP_QUEUE,
			routeTokens: [firstToken, secondToken],
			bestSmartRoute: [firstToken, secondToken],
			pairs: [pairAddress],
			fromAmount: new BigNumber(this.orderSubTotal),
			toAmount: new BigNumber(this.secondInput.value),
			isFromEstimated: false,
			commissionFee: this.commissionAmount,
			commissionFeeTo: this.data.commissionFeeTo,
			offerIndex: offerIndex
		}
		const { error } = await executeSell(params);
		if (error) {
			this.showResultMessage(this.otcQueueAlert, 'error', error as any);
		}
	}

	private updateInput = (enabled: boolean) => {
		this.firstInput.enabled = enabled;
		this.secondInput.enabled = enabled;
		this.btnMax.enabled = enabled;
	}

	private get submitButtonText() {
		if (this.isApproveButtonShown) {
			return this.btnSell?.rightIcon.visible ? 'Approving' : 'Approve';
		}
		const firstVal = new BigNumber(this.firstInput.value);
		const secondVal = new BigNumber(this.secondInput.value);
		if (firstVal.lt(0) || secondVal.lt(0)) {
			return 'Amount must be greater than 0';
		}
		if (this.otcQueueInfo) {
			const firstMaxVal = new BigNumber(this.getFirstAvailableBalance());
			if (firstVal.gt(firstMaxVal)) {
				return 'Insufficient amount available';
			}
		}
		if (this.btnSell?.rightIcon.visible) {
			return 'Selling';
		}
		return 'Sell Now';
	};

	private initApprovalModelAction = async () => {
		let spenderAddress;
		if (this.data.commissionFee && this.data.commissionFeeTo) {
			spenderAddress = getProxyAddress();
		}
		else {
			spenderAddress = getHybridRouterAddress();
		}
		this.approvalModelAction = await getERC20ApprovalModelAction(spenderAddress,
			{
				sender: this,
				payAction: this.onSubmit,
				onToBeApproved: async (token: ITokenObject) => {
					this.isApproveButtonShown = true
					this.btnSell.enabled = true;
					this.btnSell.caption = 'Approve';
				},
				onToBePaid: async (token: ITokenObject) => {
					this.updateBtnSell();
					this.btnSell.caption = this.submitButtonText;
					this.isApproveButtonShown = false
				},
				onApproving: async (token: ITokenObject, receipt?: string, data?: any) => {
					this.showResultMessage(this.otcQueueAlert, 'success', receipt || '');
					this.btnSell.rightIcon.visible = true;
					this.btnSell.caption = 'Approving';
					this.updateInput(false);
				},
				onApproved: async (token: ITokenObject, data?: any) => {
					this.isApproveButtonShown = false;
					this.btnSell.rightIcon.visible = false;
					this.btnSell.caption = this.submitButtonText;
					this.updateInput(true);
					this.updateBtnSell();
				},
				onApprovingError: async (token: ITokenObject, err: Error) => {
					this.showResultMessage(this.otcQueueAlert, 'error', err);
					this.updateInput(true);
					this.btnSell.caption = 'Approve';
					this.btnSell.rightIcon.visible = false;
				},
				onPaying: async (receipt?: string, data?: any) => {
					this.showResultMessage(this.otcQueueAlert, 'success', receipt || '');
					this.btnSell.rightIcon.visible = true;
					this.btnSell.caption = this.submitButtonText;
					this.updateInput(false);
				},
				onPaid: async (data?: any) => {
					await updateTokenBalances([this.firstTokenObject, this.secondTokenObject]); 
					await this.onSetupPage(isWalletConnected(), true);
					this.firstInput.value = '';
					this.secondInput.value = '';
					this.btnSell.rightIcon.visible = false;
					this.btnSell.caption = this.submitButtonText;
				},
				onPayingError: async (err: Error) => {
					this.showResultMessage(this.otcQueueAlert, 'error', err);
					this.btnSell.rightIcon.visible = false;
					this.btnSell.enabled = true;
					this.btnSell.caption = this.submitButtonText;
				}
			});
		this.approvalModelAction.checkAllowance(this.firstTokenObject, this.getFirstAvailableBalance());
	}

	private showResultMessage = (result: Alert, status: 'warning' | 'success' | 'error', content?: string | Error) => {
		if (!result) return;
		let params: any = { status };
		if (status === 'success') {
			params.txtHash = content;
		} else {
			params.content = content;
		}
		result.message = { ...params };
		result.showModal();
	}

	private initEmptyUI = async () => {
		if (!this.noCampaignSection) {
			this.noCampaignSection = await Panel.create({ height: '100%' });
			this.noCampaignSection.classList.add('container');
		}
		const isConnected = isWalletConnected();
		const isBtnShown = !this.data && isConnected;
		let importFileElm: any;
		let onImportCampaign: any;
		let onClose: any;
		if (isBtnShown) {
			importFileElm = await Label.create({ visible: false });
			onImportCampaign = (isNew: boolean) => {
				this.isImportNewCampaign = isNew;
				(importFileElm.firstChild?.firstChild as HTMLElement)?.click();
			}
			onClose = () => {
				this.importFileErrModal.visible = false;
			}
			this.initInputFile(importFileElm);
		}
		this.noCampaignSection.clearInnerHTML();
		this.noCampaignSection.appendChild(
			<i-panel class="no-campaign" height="100%" background={{ color: '#0c1234' }}>
				<i-vstack gap={10} verticalAlignment="center">
					<i-image url={Assets.fullPath('img/TrollTrooper.svg')} />
					<i-label font={{ color: '#FFFFFF' }} caption={isConnected ? 'No Campaigns' : 'Please connect with your wallet!'} />
					{
						isBtnShown ? (
							<i-hstack gap={10} margin={{ top: 10 }} verticalAlignment="center" horizontalAlignment="center">
								<i-button id="btnInputCampaign" maxWidth={220} caption="Input Campaign" class="btn-os btn-import" font={{ size: '14px' }} rightIcon={{ visible: false, spin: true, fill: '#fff' }} onClick={() => this.onEditCampaign(false)} />
								<i-button id="btnImportCampaign" maxWidth={220} caption="Import Campaign" class="btn-os btn-import" font={{ size: '14px' }} rightIcon={{ visible: false, spin: true, fill: '#fff' }} onClick={() => onImportCampaign(false)} />
								{importFileElm}
								<i-modal id="importFileErrModal" maxWidth="100%" width={420} title="Import Campaign Error" closeIcon={{ name: 'times' }}>
									<i-vstack gap={20} margin={{ bottom: 10 }} verticalAlignment="center" horizontalAlignment="center">
										<i-label id="importFileErr" font={{ size: '16px', color: '#fff' }} />
										<i-button caption="Close" class="btn-os btn-import" width={120} onClick={onClose} />
									</i-vstack>
								</i-modal>
							</i-hstack>
						) : []
					}
				</i-vstack>
			</i-panel>
		);
		this.noCampaignSection.visible = true;
	}

	private renderSwitchNetworkUI = async (chainId: number) => {
		if (!this.switchNetworkSection) {
			this.switchNetworkSection = await Panel.create({ height: '100%' });
			this.switchNetworkSection.classList.add('container');
		}
		this.switchNetworkSection.clearInnerHTML();
		const networkInfo = getNetworkInfo(chainId);
		this.switchNetworkSection.appendChild(
			<i-panel class="no-campaign" height="100%" background={{ color: '#0c1234' }}>
				<i-vstack gap={10} verticalAlignment="center" horizontalAlignment="center">
					<i-image url={Assets.fullPath('img/TrollTrooper.svg')} />
					<i-hstack verticalAlignment='center' gap={4} wrap="wrap">
						<i-label caption='Please switch your network to'></i-label>
						<i-label
							padding={{ left: '0.3rem', right: '0.3rem', top: '0.1rem', bottom: '0.1rem' }}
							caption={networkInfo.name}
							class='pointer label-network'
							border={{ radius: '0.5rem' }}
							onClick={() => switchNetwork(chainId)}
						></i-label>
					</i-hstack>
				</i-vstack>
			</i-panel>
		);
		this.switchNetworkSection.visible = true;
		if (this.otcQueueElm) {
			this.otcQueueElm.clearInnerHTML();
			this.otcQueueElm.appendChild(this.switchNetworkSection);
		}
		if (this.loadingElm) {
			this.loadingElm.visible = false;
		}
	}

	private renderEmpty = async () => {
		await this.initEmptyUI();
		if (this.otcQueueElm) {
			this.otcQueueElm.clearInnerHTML();
			this.otcQueueElm.appendChild(this.noCampaignSection);
		}
		if (this.loadingElm) {
			this.loadingElm.visible = false;
		}
	}

	private renderOTCQueueCampaign = async () => {
		if (this.otcQueueInfo) {
			this.otcQueueElm.clearInnerHTML();
			const { pairAddress, availableAmount, restrictedPrice, startDate, expire } = this.otcQueueInfo;
			const { title, description, logo } = this.data;
			const chainId = getChainId();
			const firstSymbol = this.firstTokenObject?.symbol || '';
			const usd = this.tokenPrice ? new BigNumber(restrictedPrice).times(this.tokenPrice).toFixed() : '0';

			const hStackTimer = await HStack.create({ gap: 8, verticalAlignment: 'center' });
			const lbTimer = await Label.create({ caption: 'Starts In', font: { size: '0.8rem' } });
			lbTimer.classList.add('opacity-50');
			const lbHour = await Label.create();
			const lbDay = await Label.create();
			const lbMin = await Label.create();
			lbHour.classList.add('timer-value');
			lbDay.classList.add('timer-value');
			lbMin.classList.add('timer-value');
			hStackTimer.appendChild(lbTimer);
			hStackTimer.appendChild(
				<i-panel lineHeight="29px">
					<i-hstack gap={4} verticalAlignment="center" class="custom-timer">
						{lbDay}
						<i-label caption="D" class="timer-unit" />
						{lbHour}
						<i-label caption="H" class="timer-unit" />
						{lbMin}
						<i-label caption="M" class="timer-unit" />
					</i-hstack>
				</i-panel>
			);

			const hStackEndTime = await HStack.create({ gap: 8, verticalAlignment: 'center', visible: false });
			const lbEndTime = await Label.create({ caption: 'Ended On', font: { size: '0.8rem' } });
			lbEndTime.classList.add('opacity-50');
			hStackEndTime.appendChild(lbEndTime);
			hStackEndTime.appendChild(
				<i-label caption={formatDate(expire)} font={{ size: '0.8rem', bold: true }} lineHeight="29px" />
			);

			let interval: any;
			const setTimer = () => {
				let days = 0;
				let hours = 0;
				let mins = 0;
				if (moment().isBefore(moment(startDate))) {
					lbTimer.caption = 'Starts In';
					days = moment(startDate).diff(moment(), 'days');
					hours = moment(startDate).diff(moment(), 'hours') - days * 24;
					mins = moment(startDate).diff(moment(), 'minutes') - days * 24 * 60 - hours * 60;
				} else if (moment(moment()).isBefore(expire)) {
					lbTimer.caption = 'Ends In';
					days = moment(expire).diff(moment(), 'days');
					hours = moment(expire).diff(moment(), 'hours') - days * 24;
					mins = moment(expire).diff(moment(), 'minutes') - days * 24 * 60 - hours * 60;
				} else {
					hStackTimer.visible = false;
					hStackEndTime.visible = true;
					lbEndTime.caption = 'Ended On';
					days = hours = mins = 0;
					clearInterval(interval);
				}
				lbDay.caption = `${days}`;
				lbHour.caption = `${hours}`;
				lbMin.caption = `${mins}`;
			}
			setTimer();
			interval = setInterval(() => {
				setTimer();
			}, 1000);

			const tradeFeePercent = new BigNumber(1).minus(this.otcQueueInfo.tradeFee).times(100).toFixed();
			const orderSubTotalCaption = `Order Subtotal (With ${tradeFeePercent}% Trade Fee)`;
			const isCommissionVisible = !!(this.data.commissionFee && this.data.commissionFeeTo);
			const logoUrl = logo ? logo.replace('ipfs://', getIPFSGatewayUrl()) : null;
			this.otcQueueElm.clearInnerHTML();
			this.otcQueueElm.appendChild(
				<i-panel class="pnl-ofc-queue container" padding={{ bottom: 15, top: 15, right: 20, left: 20 }} height="auto">
					<i-hstack horizontalAlignment="center">
						<i-vstack gap={10} width={215} margin={{ right: 20 }} padding={{ right: 20 }} border={{ right: { width: 1.5, style: 'solid', color: '#04081D' } }} position="relative" verticalAlignment="center">
							<i-label caption={title || ''} font={{ size: '16px', name: 'Montserrat Bold', bold: true }} />
							{ 
								logoUrl ? <i-image
									width={80}
									height={80}
									margin={{ left: 'auto', right: 'auto' }}
									url={logoUrl}
									fallbackUrl={fallBackUrl}
								/> : []
							}
							<i-label caption={description || ''} class="opacity-50 line-clamp" font={{ size: '10px', color: '#FFF' }} />
							<i-vstack gap={4} margin={{ top: 8 }} verticalAlignment="center">
								<i-label caption="Smart Contract" class="opacity-50" font={{ size: '8px', color: '#FFF' }} />
								<i-label caption={truncateAddress(pairAddress)} font={{ size: '10px', color: '#FFF' }} class="smart-contract--link" onClick={() => viewOnExplorerByAddress(chainId, pairAddress)} />
							</i-vstack>
							<i-label caption="Terms & Condition" link={{ href: 'https://docs.scom.dev/' }} display="block" margin={{ top: 'auto' }} class="opacity-50" font={{ size: '10px', color: '#FFF' }} />
						</i-vstack>
						<i-vstack verticalAlignment="start">
							<i-hstack gap='2.1rem' verticalAlignment="center">
								<i-vstack margin={{ top: '0.5rem' }} width="50%">
									<i-label caption="Offer to Buy" font={{ size: '1.1rem' }} class="opacity-50" />
									<i-vstack gap={4} horizontalAlignment="start">
										<i-label caption={`${formatNumber(restrictedPrice)} ${this.secondTokenObject?.symbol || ''}`} font={{ size: 'clamp(1.3rem, 1.35rem + 0.9vw, 2.3rem)', name: 'Montserrat Bold' }} />
										<i-label caption={`~ ${formatNumber(usd)} USD`} font={{ size: 'clamp(0.6rem, 0.55rem + 0.4vw, 1rem)' }} lineHeight="22px" class="opacity-50" />
									</i-vstack>
								</i-vstack>
								<i-vstack margin={{ top: '0.5rem' }} gap="0.5rem" width="50%">
									<i-vstack gap={4}>
										<i-label caption="Offer Availability" font={{ size: '0.8rem' }} class="opacity-50" />
										<i-hstack gap={4} verticalAlignment="end">
											<i-label caption={`${formatNumber(availableAmount)} ${this.firstTokenObject?.symbol || ''}`} font={{ size: '0.8rem' }} />
										</i-hstack>
									</i-vstack>
									<i-vstack gap={4}>
										<i-label caption="Valid Period" font={{ size: '0.8rem' }} class="opacity-50" />
										{ hStackTimer }
										{ hStackEndTime }
									</i-vstack>
								</i-vstack>							
							</i-hstack>
							<i-vstack verticalAlignment="center">
								<i-hstack gap={10} verticalAlignment="center">
									<i-vstack gap={4} width="calc(50% - 20px)" height={85} verticalAlignment="center">
										<i-hstack gap={4} verticalAlignment="end">
											<i-label caption={`${this.firstTokenObject?.symbol || ''} to sell`} font={{ size: '12px' }} class="opacity-50" />
											<i-label
												caption={`Balance: ${formatNumber(this.getFirstTokenBalance())} ${firstSymbol}`}
												font={{ size: '12px' }}
												tooltip={{ content: `${formatNumber(this.getFirstTokenBalance())} ${firstSymbol}`, placement: 'top' }}
												class="opacity-50 text-overflow"
												maxWidth="calc(100% - 110px)"
												margin={{ left: 'auto' }}
											/>
											<i-button id="btnMax" caption="Max" enabled={!this.isSellDisabled && new BigNumber(this.getFirstAvailableBalance()).gt(0)} class="btn-os btn-max" width={26} font={{ size: '8px' }} onClick={this.setMaxBalance} />
										</i-hstack>
										<i-hstack id="firstInputBox" gap={8} width="100%" height={50} verticalAlignment="center" background={{ color: '#232B5A' }} border={{ radius: 16, width: 2, style: 'solid', color: 'transparent' }} padding={{ left: 6, right: 6 }}>
											<i-hstack gap={4} width={100} verticalAlignment="center">
												<i-image width={20} height={20} url={getTokenIcon(this.firstTokenObject?.address)} fallbackUrl={fallBackUrl} />
												<i-label caption={firstSymbol} font={{ size: '16px' }} />
											</i-hstack>
											<i-input
												id="firstInput"
												inputType="number"
												placeholder="0.0"
												class="input-amount"
												width="100%"
												height="100%"
												enabled={!this.isSellDisabled}
												onChanged={this.firstInputChange}
												onFocus={() => this.handleFocusInput(true, true)}
												onBlur={() => this.handleFocusInput(true, false)}
											/>
										</i-hstack>
									</i-vstack>
									<i-icon name="arrow-right" fill="#f15e61" width={20} height={20} margin={{ top: 23 }} />
									<i-vstack gap={4} width="calc(50% - 20px)" height={85} verticalAlignment="center">
										<i-label caption="You Receive" font={{ size: '12px' }} class="opacity-50" />
										<i-hstack id="secondInputBox" width="100%" height={50} position="relative" verticalAlignment="center" background={{ color: '#232B5A' }} border={{ radius: 16, width: 2, style: 'solid', color: 'transparent' }} padding={{ left: 6, right: 6 }}>
											<i-hstack gap={4} margin={{ right: 8 }} width={100} verticalAlignment="center">
												<i-image width={20} height={20} url={getTokenIcon(this.secondTokenObject?.address)} fallbackUrl={fallBackUrl} />
												<i-label caption={this.secondTokenObject?.symbol || ''} font={{ size: '16px' }} />
											</i-hstack>
											<i-input
												id="secondInput"
												inputType="number"
												placeholder="0.0"
												class="input-amount"
												width="100%"
												height="100%"
												enabled={!this.isSellDisabled}
												onChanged={this.secondInputChange}
												onFocus={() => this.handleFocusInput(false, true)}
												onBlur={() => this.handleFocusInput(false, false)}
											/>
										</i-hstack>
									</i-vstack>
								</i-hstack>
								<i-vstack 
									margin={{top: '0.5rem'}} 
									padding={{top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem'}}
									gap="0.5rem"
									background={{color: '#0c1234'}} 
									border={{radius: '0.75rem', width: '1px', style: 'solid', color: 'transparent'}}
								>
									<i-hstack gap={10} verticalAlignment="center" horizontalAlignment="space-between" >
										<i-label caption={orderSubTotalCaption} font={{size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', bold: true}}/>
										<i-label id="lbOrderSubTotal" caption={`0 ${this.firstTokenObject?.symbol || ''}`} font={{size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', bold: true}}/>
									</i-hstack>
									<i-hstack visible={isCommissionVisible} gap={10} verticalAlignment="center" horizontalAlignment="space-between" >
										<i-label caption="Commission Fee" font={{size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', bold: true}}/>
										<i-label id="lbCommissionFee" caption={`0 ${this.firstTokenObject?.symbol || ''}`} font={{size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', bold: true}}/>
									</i-hstack>	
									<i-hstack gap={10} verticalAlignment="center" horizontalAlignment="space-between" >
										<i-label caption="You will transfer" font={{size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', color: '#f15e61', bold: true}}/>
										<i-label id="lbOrderTotal" caption={`0 ${this.firstTokenObject?.symbol || ''}`} font={{size: 'clamp(0.7rem, 0.65rem + 0.4vw, 1.1rem)', color: '#f15e61', bold: true}}/>
									</i-hstack>
								</i-vstack>													
								<i-vstack margin={{ top: 15 }} verticalAlignment="center" horizontalAlignment="center">
									<i-button
										id="btnSell"
										caption="Sell Now"
										enabled={false}
										class="btn-os btn-sell"
										margin={{ bottom: 0 }}
										rightIcon={{ spin: true, visible: false, fill: '#fff' }}
										onClick={this.onSell}
									/>
								</i-vstack>
							</i-vstack>
						</i-vstack>
					</i-hstack>
				</i-panel>
			)
		} else {
			this.renderEmpty();
		}
	}

	async init() {
		this.isReadyCallbackQueued = true;
		super.init();
		// this.pnlConfig = new PanelConfig();
		// this.pnlConfig.visible = false;
		// this.pnlConfig.onConfigSave = (campaign: any) => this.onConfigSave(campaign);
		// this.pnlConfig.onReset = () => {
		// 	this.pnlConfig.visible = false;
		// 	this.otcQueueLayout.visible = true;
		// }
		// this.otcQueueComponent.appendChild(this.pnlConfig);

		this.otcQueueAlert = await Alert.create() as Alert;
		this.otcQueueComponent.appendChild(this.otcQueueAlert);
		this.otcQueueAlert.visible = false;
		this.showResultMessage(this.otcQueueAlert, 'warning', '');
		setTimeout(() => {
			this.otcQueueAlert.closeModal();
			this.otcQueueAlert.visible = true;
		}, 100)

		this.pnlConfig.onConfigSave = (campaign: any) => this.onConfigSave(campaign);
		this.pnlConfig.onReset = () => {
			this.pnlConfig.visible = false;
			this.otcQueueLayout.visible = true;
		}
		await this.initWalletData();
		this.data.pairAddress = this.getAttribute('pairAddress', true);
		this.data.direction = this.getAttribute('direction', true, true);
		this.data.offerIndex = this.getAttribute('offerIndex', true);
		this.data.commissionFee = this.getAttribute('commissionFee', true);
		this.data.commissionFeeTo = this.getAttribute('commissionFeeTo', true);
		this.data.title = this.getAttribute('title', true, '');
		this.data.description = this.getAttribute('description', true, '');
		this.data.logo = this.getAttribute('logo', true, '');
		this.data.chainId = this.getAttribute('chainId', true);
		// try {
		// 	let tokens
		// 	if (this.data.pairAddress.length >= 32)
		// 		tokens = await getTokens(this.data.pairAddress);
		// 	if (tokens.token0 && tokens.token1) {
		// 		await this.setData(this.data);
		// 	} else {
		// 		await this.renderEmpty();
		// 	}
		// } catch {
		// 	await this.renderEmpty();
		// }
		await this.setData(this.data);
		this.isReadyCallbackQueued = false;
    this.executeReadyCallback();
	}

	render() {
		return (
			<i-panel id="otcQueueComponent" class="pageblock-otc-queue" minHeight={200}>
				<i-panel id="otcQueueLayout" class="otc-queue-layout" width="100%" height={MAX_HEIGHT}>
					<i-vstack id="loadingElm" class="i-loading-overlay">
						<i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
							<i-icon
								class="i-loading-spinner_icon"
								image={{ url: Assets.fullPath('img/loading.svg'), width: 36, height: 36 }}
							/>
							<i-label
								caption="Loading..." font={{ color: '#FD4A4C', size: '1.5em' }}
								class="i-loading-spinner_text"
							/>
						</i-vstack>
					</i-vstack>
					<i-panel id="otcQueueElm" class="wrapper" />
				</i-panel>
				<otc-queue-config
					id="pnlConfig"
					visible={false}
				></otc-queue-config>
			</i-panel>
		)
	}
}
