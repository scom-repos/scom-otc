import { Module, customModule, Container, VStack } from '@ijstech/components';
import ScomOTC from '@scom/scom-otc'
@customModule
export default class Module1 extends Module {
    private otcEl: ScomOTC;
    private mainStack: VStack;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
        this.otcEl = await ScomOTC.create({
            "title": "Decentralized OTC Offer ",
            "description": "Limited Time No-Slippage smart-contract based OTC offer",
            "logo": "ipfs://bafkreid4rgdbomv7lbboqo7kvmyruwulotrvqslej4jbwmd2ruzkmn4xte",
            "pairAddress": "0x648Dc2c179734737Ea420b0ba367C3a28ec5D648",
            "offerIndex": 2,
            "direction": true,
            "commissionFee": "",
            "commissionFeeTo": "",
            chainId: 97
        });
        this.otcEl.id = "otc2"
        this.mainStack.appendChild(this.otcEl);
    }

    render() {
        return <i-panel>
            <i-hstack id="mainStack" margin={{top: '1rem', left: '1rem'}} gap="2rem">
                <i-scom-otc
                    id="otc1"
                    title='OTC test'
                    logo="ipfs://bafkreid4rgdbomv7lbboqo7kvmyruwulotrvqslej4jbwmd2ruzkmn4xte"
                    pairAddress="0x648Dc2c179734737Ea420b0ba367C3a28ec5D648"
                    offerIndex={2}
                    commissionFee=""
                    commissionFeeTo=""
                    direction={true}
                ></i-scom-otc>
            </i-hstack>
        </i-panel>
    }
}