import { Container, customElements, ControlElement, Module, Input, application, Control, Upload, Checkbox, Image, HStack, Label } from '@ijstech/components';
import { Wallet } from '@ijstech/eth-wallet';
import { EventId, isValidNumber } from '../global/index';
import { getTokens } from '../otc-queue-utils/index';
import { getTokenIcon, IOTCQueueConfig, tokenSymbol } from '../store/index';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			['campaign-config']: ControlElement;
		}
	}
};

@customElements('campaign-config')
export class CampaignConfig extends Module {
	private inputName: Input;
	private inputDesc: Input;
	private uploadLogo: Upload;
	private inputPairAddress: Input;
	private inputOfferIndex: Input;
	private ckbDirection: Checkbox;
	private wrapperTokens: HStack;
	private imgFirstToken: Image;
	private imgSecondToken: Image;
	private lbFirstToken: Label;
	private lbSecondToken: Label;
	private inputCommissionFee: Input;

	private pairAddress: string = '';
	private logoUrl: string = '';
	private firstToken: string = '';
	private secondToken: string = '';
	private _isNew: boolean;
	private _data?: IOTCQueueConfig;
	private isInitialized = false;
	setLoading: any;

	constructor(parent?: Container, options?: any) {
		super(parent, options);
	}

	set isNew(value: boolean) {
		this._isNew = value;
		this.setupInput();
	}

	get isNew() {
		return this._isNew;
	}

	set data(value: IOTCQueueConfig | undefined) {
		this._data = value;
		this.setupData();
	}

	get data() {
		return this._data;
	}

	private setupInput = () => {

	}

	private setupData = async () => {
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
	}

	private getTokens = async () => {
		const pairAddress = this.inputPairAddress.value;
		this.pairAddress = pairAddress;
		if (pairAddress && pairAddress.length >= 32) {
			const tokens = await getTokens(pairAddress);
			this.firstToken = tokens.token0;
			this.secondToken = tokens.token1;
			this.updateTokens(pairAddress);
		} else {
			this.wrapperTokens.visible = false;
			this.emitInput();
		}
	}

	private updateTokens = (pairAddress?: string) => {
		this.emitInput();
		if (pairAddress && pairAddress !== this.pairAddress) return;
		if (!this.firstToken || !this.secondToken) {
			this.wrapperTokens.visible = false;
			return;
		}
		this.wrapperTokens.visible = true;
		if (this.ckbDirection.checked) {
			this.imgFirstToken.url = getTokenIcon(this.firstToken);
			this.imgSecondToken.url = getTokenIcon(this.secondToken);
			this.lbFirstToken.caption = tokenSymbol(this.firstToken);
			this.lbSecondToken.caption = tokenSymbol(this.secondToken);
		} else {
			this.imgFirstToken.url = getTokenIcon(this.secondToken);
			this.imgSecondToken.url = getTokenIcon(this.firstToken);
			this.lbFirstToken.caption = tokenSymbol(this.secondToken);
			this.lbSecondToken.caption = tokenSymbol(this.firstToken);
		}
	}

	private emitInput = () => {
		application.EventBus.dispatch(EventId.EmitInput);
	}

	private onInputPair = async () => {
		await this.getTokens();
	}

	private onInputIndex = () => {
		let value = this.inputOfferIndex.value;
		value = value.replace(/[^0-9]+/g, "");
		this.inputOfferIndex.value = value;
		this.emitInput();
	}

	private onInputText = () => {
		this.emitInput();
	}

	private onBeforeUpload(target: Upload, file: File): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isLt2M) {
				reject('File size can not exceed 2MB!')
			}
			resolve(isLt2M)
		})
	}

	private async onChangeFile(source: Control, files: File[]) {
		if (!files.length) return;
		const data: any = await this.uploadLogo.toBase64(files[0]);
		this.logoUrl = data || '';
	}

	private onRemove(source: Control, file: File) {
		this.logoUrl = '';
	}

	checkValidation = () => {
		return !!this.inputName.value && this.inputPairAddress.value &&
			this.firstToken && this.secondToken && isValidNumber(this.inputOfferIndex.value);
	}

	getData = () => {
		const campaign: IOTCQueueConfig = {
			chainId: Wallet.getClientInstance().chainId,
			title: this.inputName.value,
			description: this.inputDesc.value,
			logo: this.logoUrl || undefined,
			pairAddress: this.inputPairAddress.value,
			offerIndex: this.inputOfferIndex.value,
			direction: this.ckbDirection.checked,
			commissionFee: this.inputCommissionFee.value,
			commissionFeeTo: ''
		}
		return campaign;
	}

	async init() {
		super.init();
		this.setupInput();
		this.isInitialized = true;
		await this.setupData();
	}

	render() {
		return (
			<i-panel class="custom-scroll">
				<i-vstack gap={10} verticalAlignment="center" class="main-content">
					<i-hstack gap={10} verticalAlignment="center" horizontalAlignment="space-between">
						<i-hstack gap={4} verticalAlignment="center">
							<i-label class="lb-title" caption="Title" />
							<i-label caption="*" font={{ color: '#F15E61', size: '16px' }} />
						</i-hstack>
						<i-input id="inputName" class="input-text w-input" onChanged={this.onInputText} />
					</i-hstack>
					<i-hstack gap={10} verticalAlignment="center" horizontalAlignment="space-between">
						<i-label class="lb-title" caption="Description" />
						<i-input id="inputDesc" class="input-area w-input" inputType="textarea" rows={3} onChanged={this.onInputText} />
					</i-hstack>
					<i-hstack gap={10} verticalAlignment="center" horizontalAlignment="space-between">
						<i-label class="lb-title" caption="Logo" />
						<i-vstack gap={4} verticalAlignment="center" class="w-input" position="relative">
							<i-upload
								id="uploadLogo"
								class="input-text w-input cs-upload"
								accept="image/*"
								onUploading={this.onBeforeUpload.bind(this)}
								onChanged={this.onChangeFile.bind(this)}
								onRemoved={this.onRemove.bind(this)}
							/>
						</i-vstack>
					</i-hstack>
					<i-hstack gap={10} verticalAlignment="center" horizontalAlignment="space-between">
						<i-hstack gap={4} verticalAlignment="center">
							<i-label class="lb-title" caption="Pair Address" />
							<i-label caption="*" font={{ color: '#F15E61', size: '16px' }} />
						</i-hstack>
						<i-input id="inputPairAddress" class="input-text w-input" onChanged={this.onInputPair} />
					</i-hstack>
					<i-hstack gap={10} class="row-mobile" margin={{ top: 5, bottom: 5 }} verticalAlignment="center" horizontalAlignment="space-between">
						<i-label class="lb-title" caption="Direction" />
						<i-hstack gap={20} verticalAlignment="center" horizontalAlignment="start" class="w-input">
							<i-checkbox
								id="ckbDirection"
								height="auto"
								checked={true}
								onChanged={() => this.updateTokens()}
							/>
							<i-hstack id="wrapperTokens" visible={false} gap={8} verticalAlignment="center">
								<i-image id="imgFirstToken" width={24} height={24} />
								<i-label id="lbFirstToken" />
								<i-icon name="minus" fill="#fff" width={12} height={12} />
								<i-image id="imgSecondToken" width={24} height={24} />
								<i-label id="lbSecondToken" />
							</i-hstack>
						</i-hstack>
					</i-hstack>
					<i-hstack gap={10} verticalAlignment="center" horizontalAlignment="space-between">
						<i-hstack gap={4} verticalAlignment="center">
							<i-label class="lb-title" caption="Offer Index" />
							<i-label caption="*" font={{ color: '#F15E61', size: '16px' }} />
						</i-hstack>
						<i-input id="inputOfferIndex" class="input-text w-input" onChanged={this.onInputIndex} />
					</i-hstack>
					<i-hstack gap={10} verticalAlignment="center" horizontalAlignment="space-between">
						<i-hstack gap={4} verticalAlignment="center">
							<i-label class="lb-title" caption="Commission Fee" />
							<i-label caption="*" font={{ color: '#F15E61', size: '16px' }} />
						</i-hstack>
						<i-input id="inputCommissionFee" class="input-text w-input" onChanged={this.onInputText} />
					</i-hstack>
				</i-vstack>
			</i-panel>
		)
	}
}
