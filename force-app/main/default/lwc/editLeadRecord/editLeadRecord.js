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

export default class EditLeadRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  nameField = NAME_FIELD;
  companyField = COMPANY_FIELD;
  titleField = TITLE_FIELD;
  statusField = STATUS_FIELD;
  phoneField = PHONE_FIELD;
  emailField = EMAIL_FIELD;
  ratingField = RATING_FIELD;
  addressField = ADDRESS_FIELD;
  websiteField = WEBSITE_FIELD;
  numberOfEmployeesField = NUMBEROFEMPLOYEES_FIELD;
  annualRevenueField = ANNUALREVENUE_FIELD;
  leadSourceField = LEADSOURCE_FIELD;
  industryField = INDUSTRY_FIELD;
  descriptionField = DESCRIPTION_FIELD;

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
    console.log("Updated Lead", event.detail);
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