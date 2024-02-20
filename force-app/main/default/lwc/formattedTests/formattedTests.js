import { LightningElement } from 'lwc';
import locale from '@salesforce/i18n/locale';

export default class Formatted extends LightningElement {
    stringVal = '2022-01-02T14:15:00-05:00';
    dateVal = new Date(this.stringVal);
    timestampVal = this.dateVal.getTime();
    hour12 = true;
    loc = locale;
}