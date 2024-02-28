import { api, LightningElement, wire } from 'lwc';
import komaciApexMethod from '@salesforce/apex/LWCApex.komaciApexMethod';
import relatedContacts from '@salesforce/apex/LWCApex.relatedContacts';

export default class ChildRelationshipField extends LightningElement {
    @api item;
    @api recordId;
    @wire(komaciApexMethod, {
        recordId: '$item',
    })
    itemObject;

    @wire(relatedContacts, {
        recordId: '$recordId',
    })
    apexResult;
}