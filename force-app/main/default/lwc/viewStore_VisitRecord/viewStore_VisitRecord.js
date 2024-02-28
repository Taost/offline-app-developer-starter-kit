import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Store_Visit__c.Name";
import START_DATE_TIME__C_FIELD from "@salesforce/schema/Store_Visit__c.Start_Date_Time__c";
import END_DATE_TIME__C_FIELD from "@salesforce/schema/Store_Visit__c.End_Date_Time__c";
import STORE_DISPLAY_NAME__C_FIELD from "@salesforce/schema/Store_Visit__c.Store_Display_Name__c";
import VISIT_STATUS__C_FIELD from "@salesforce/schema/Store_Visit__c.Visit_Status__c";

export default class ViewStore_Visit__cRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get fields() {
    return [NAME_FIELD, START_DATE_TIME__C_FIELD, END_DATE_TIME__C_FIELD, STORE_DISPLAY_NAME__C_FIELD, VISIT_STATUS__C_FIELD];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get name() {
    return this.record?.data?.fields?.Name?.value ?? "";
  }
}