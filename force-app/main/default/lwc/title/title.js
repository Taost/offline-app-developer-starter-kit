import { LightningElement, api } from 'lwc';

export default class Title extends LightningElement {
    @api icon = '';
    @api size = 'medium';

    get headingClass() {
        return `slds-text-heading_${this.size ? this.size : 'medium'}`;
    }

    get iconClass() {
        return `slds-m-right_${this.size ? this.size : 'medium'}`;
    }
}