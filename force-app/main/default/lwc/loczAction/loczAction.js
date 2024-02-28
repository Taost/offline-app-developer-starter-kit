import { api, wire, LightningElement } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import relatedContacts from '@salesforce/apex/LWCApex.relatedContacts';
import locale from '@salesforce/i18n/locale';
import currency from '@salesforce/i18n/currency';
import language from '@salesforce/i18n/lang';
import direction from '@salesforce/i18n/dir';
import timezone from '@salesforce/i18n/timeZone';


export default class LoczAction extends LightningElement {
    @api recordId;
    @api objectApiName;

    loc = locale;
    curr = currency;
    lang = language;
    dir = direction;
    timezn = timezone;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [
            'Account.Id',
            'Account.Name',
            'Account.CreatedById',
            'Account.LastModifiedDate',
            'Account.OwnerId',
            'Account.ParentId',
            'Account.AnnualRevenue',
            'Account.Description',
        ],
    })
    record;

    @wire(getRecord, {
        recordId: '$record.data.fields.OwnerId.value',
        fields: ['User.Name'],
    })
    ownerRecord;
}