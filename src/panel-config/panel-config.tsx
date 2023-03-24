import { Button, Container, HStack, Panel, customElements, ControlElement, Module, IEventBus, application, Label, VStack } from '@ijstech/components';
import { downloadJsonFile, EventId } from '../global/index';
import { getChainId, getNetworkInfo, IOTCQueueConfig, isWalletConnected } from '../store/index';
import { CampaignConfig } from './campaign';
import './panel-config.css';
import Assets from '../assets';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['otc-queue-config']: ControlElement;
    }
  }
};

@customElements('otc-queue-config')
export class PanelConfig extends Module {
  private networkElm: HStack;
  private lbNetworkName: Label;
  private otcCampaignElm: HStack;
  private pnlInfoElm: Panel;
  private btnSave: Button;
  private btnExport: Button;
  private $eventBus: IEventBus;
  private campaignConfig: CampaignConfig;
  private loadingElm: VStack;
  isInited: boolean = false;
  onConfigSave: any;
  onReset: any;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.$eventBus = application.EventBus;
    this.registerEvent();
  }

  private registerEvent = () => {
    this.$eventBus.register(this, EventId.EmitInput, this.updateButton);
    this.$eventBus.register(this, EventId.IsWalletConnected, this.renderUI);
    this.$eventBus.register(this, EventId.IsWalletDisconnected, this.renderUI);
    this.$eventBus.register(this, EventId.chainChanged, this.onChangeChanged);
  }

  private renderUI = async () => {
    if (!this.isInited) await this.ready();
    const isConnected = isWalletConnected();
    this.networkElm.visible = !isConnected;
    this.otcCampaignElm.visible = isConnected;
    this.updateNetworkName(getChainId());
  }

  private onChangeChanged = async () => {
    if (!this.isInited) await this.ready();
    const chainId = getChainId();
    this.updateNetworkName(chainId);
    this.updateButton();
  }

  showInputCampaign = async (isNew: boolean, campaign?: IOTCQueueConfig) => {
    this.pnlInfoElm.clearInnerHTML();
    await this.onAddCampaign(campaign);
  }

  private onAddCampaign = async (campaign?: any) => {
    this.campaignConfig = new CampaignConfig();
    await this.campaignConfig.ready();
    this.campaignConfig.setLoading = (status: boolean) => { this.loadingElm.visible = status };
    this.campaignConfig.data = campaign;
    this.pnlInfoElm.clearInnerHTML();
    this.pnlInfoElm.appendChild(this.campaignConfig);
  }

  onBack = () => {
    this.pnlInfoElm.clearInnerHTML();
    if (this.onReset) this.onReset();
  }

  private async updateNetworkName(chainId: number) {
    const network = getNetworkInfo(chainId);
    await this.lbNetworkName.ready();
    this.lbNetworkName.caption = network ? network.name : 'Unknown Network';
  }

  private updateButton() {
    const valid = !!this.checkValidation();
    this.btnSave.enabled = valid;
    this.btnExport.enabled = valid;
  }

  private checkValidation = () => {
    if (this.campaignConfig) {
      return this.campaignConfig.checkValidation();
    }
    return false;
  }

  private getCampaignData = () => {
    return this.campaignConfig.getData();
  }

  private onSave = () => {
    const campaign = this.getCampaignData();
    this.onConfigSave(campaign);
  }

  private onDownload = () => {
    if (this.checkValidation()) {
      const campaign = this.getCampaignData();
      downloadJsonFile('otc-queue.json', campaign);
    }
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
    this.isInited = true;
  }

  render() {
    return (
      <i-panel class="panel-config custom-scroll">
        <i-panel id="configCampaigElm" margin={{ left: 'auto', right: 'auto' }} width="100%" maxWidth={800}>
          <i-hstack gap={4} width="fit-content" margin={{ top: 5, bottom: 15, left: 'auto' }} verticalAlignment="center" class="cursor-pointer" onClick={this.onBack}>
            <i-icon name="arrow-left" fill='#FFFFFF' width={20} height={20} />
            <i-label caption="Back" font={{ size: '20px', bold: true, color: '#FFFFFF' }} />
          </i-hstack>
          <i-hstack id="networkElm" width="100%" height={150} verticalAlignment="center" horizontalAlignment="center">
            <i-label caption="Please connect with your network!" font={{ color: '#FFFFFF' }} />
          </i-hstack>
          <i-panel visible={false} id="otcCampaignElm" width="100%">
            <i-hstack width="100%" margin={{ bottom: 10 }} verticalAlignment="center" horizontalAlignment="center">
              <i-label id="lbNetworkName" font={{ color: '#F15E61', size: '20px', bold: true }} />
            </i-hstack>
            <i-vstack gap={10} verticalAlignment="center" class="main-content" position="relative">
              <i-vstack id="loadingElm" visible={false} class="i-loading-overlay">
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
              <i-panel id="pnlInfoElm" />
              <i-hstack gap={10} margin={{ top: 20 }} verticalAlignment="center" horizontalAlignment="center" wrap="wrap">
                <i-button
                  id="btnSave"
                  caption="Save"
                  enabled={false}
                  width={200}
                  maxWidth="100%"
                  class="btn-os"
                  onClick={this.onSave}
                />
                <i-button
                  id="btnExport"
                  caption="Export JSON"
                  enabled={false}
                  width={200}
                  maxWidth="100%"
                  class="btn-os"
                  onClick={() => this.onDownload()}
                />
              </i-hstack>
            </i-vstack>
          </i-panel>
        </i-panel>
        <otc-queue-alert id="otcQueueAlert"></otc-queue-alert>
      </i-panel>
    )
  }
}
