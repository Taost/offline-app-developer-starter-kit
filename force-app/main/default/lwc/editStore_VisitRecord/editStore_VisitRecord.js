import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import NAME_FIELD from "@salesforce/schema/Store_Visit__c.Name";
import START_DATE_TIME__C_FIELD from "@salesforce/schema/Store_Visit__c.Start_Date_Time__c";
import END_DATE_TIME__C_FIELD from "@salesforce/schema/Store_Visit__c.End_Date_Time__c";
import STORE_DISPLAY_NAME__C_FIELD from "@salesforce/schema/Store_Visit__c.Store_Display_Name__c";
import VISIT_STATUS__C_FIELD from "@salesforce/schema/Store_Visit__c.Visit_Status__c";

export default class EditStore_Visit__cRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  nameField = NAME_FIELD;
  start_Date_Time__cField = START_DATE_TIME__C_FIELD;
  end_Date_Time__cField = END_DATE_TIME__C_FIELD;
  store_Display_Name__cField = STORE_DISPLAY_NAME__C_FIELD;
  visit_Status__cField = VISIT_STATUS__C_FIELD;

  @wire(getRecord, { recordId: "$recordId", fields: [NAME_FIELD] })
  record;

  get name() {
    return this.record &&
      this.record.data &&
      this.record.data.fields &&
      this.record.data.fields.Name
      ? this.record.data.fields.Name.value
      : "";
  }

  onSuccess(event) {
    console.log("Updated Store_Visit__c", event.detail);
    // Dismiss modal on success
    this.dismiss(event);
  }

  dismiss(event) {
    console.log("Dismissing modal", event.detail);
    // TODO: Can we use window.history.back() here?
    // eslint-disable-next-line no-restricted-globals
    history.back();
  }
}