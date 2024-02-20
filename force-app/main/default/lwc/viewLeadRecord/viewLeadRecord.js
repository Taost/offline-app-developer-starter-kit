import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Lead.Name";
import COMPANY_FIELD from "@salesforce/schema/Lead.Company";
import TITLE_FIELD from "@salesforce/schema/Lead.Title";
import STATUS_FIELD from "@salesforce/schema/Lead.Status";
import PHONE_FIELD from "@salesforce/schema/Lead.Phone";
import EMAIL_FIELD from "@salesforce/schema/Lead.Email";
import RATING_FIELD from "@salesforce/schema/Lead.Rating";
import ADDRESS_FIELD from "@salesforce/schema/Lead.Address";
import WEBSITE_FIELD from "@salesforce/schema/Lead.Website";
import NUMBEROFEMPLOYEES_FIELD from "@salesforce/schema/Lead.NumberOfEmployees";
import ANNUALREVENUE_FIELD from "@salesforce/schema/Lead.AnnualRevenue";
import LEADSOURCE_FIELD from "@salesforce/schema/Lead.LeadSource";
import INDUSTRY_FIELD from "@salesforce/schema/Lead.Industry";
import DESCRIPTION_FIELD from "@salesforce/schema/Lead.Description";

export default class ViewLeadRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get fields() {
    return [NAME_FIELD, COMPANY_FIELD, TITLE_FIELD, STATUS_FIELD, PHONE_FIELD, EMAIL_FIELD, RATING_FIELD, ADDRESS_FIELD, WEBSITE_FIELD, NUMBEROFEMPLOYEES_FIELD, ANNUALREVENUE_FIELD, LEADSOURCE_FIELD, INDUSTRY_FIELD, DESCRIPTION_FIELD];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get name() {
    return this.record?.data?.fields?.Name?.value ?? "";
  }
}