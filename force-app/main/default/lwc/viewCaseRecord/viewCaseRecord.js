import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import CASENUMBER_FIELD from "@salesforce/schema/Case.CaseNumber";
import CONTACTPHONE_FIELD from "@salesforce/schema/Case.ContactPhone";
import CONTACTEMAIL_FIELD from "@salesforce/schema/Case.ContactEmail";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import ORIGIN_FIELD from "@salesforce/schema/Case.Origin";
import PRIORITY_FIELD from "@salesforce/schema/Case.Priority";
import TYPE_FIELD from "@salesforce/schema/Case.Type";
import REASON_FIELD from "@salesforce/schema/Case.Reason";
import SUBJECT_FIELD from "@salesforce/schema/Case.Subject";
import DESCRIPTION_FIELD from "@salesforce/schema/Case.Description";
import COMMENTS_FIELD from "@salesforce/schema/Case.Comments";
import CREATEDDATE_FIELD from "@salesforce/schema/Case.CreatedDate";
import SUPPLIEDEMAIL_FIELD from "@salesforce/schema/Case.SuppliedEmail";
import SUPPLIEDNAME_FIELD from "@salesforce/schema/Case.SuppliedName";
import CLOSEDDATE_FIELD from "@salesforce/schema/Case.ClosedDate";
import SUPPLIEDCOMPANY_FIELD from "@salesforce/schema/Case.SuppliedCompany";
import SUPPLIEDPHONE_FIELD from "@salesforce/schema/Case.SuppliedPhone";

export default class ViewCaseRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get fields() {
    return [CASENUMBER_FIELD, CONTACTPHONE_FIELD, CONTACTEMAIL_FIELD, STATUS_FIELD, ORIGIN_FIELD, PRIORITY_FIELD, TYPE_FIELD, REASON_FIELD, SUBJECT_FIELD, DESCRIPTION_FIELD, COMMENTS_FIELD, CREATEDDATE_FIELD, SUPPLIEDEMAIL_FIELD, SUPPLIEDNAME_FIELD, CLOSEDDATE_FIELD, SUPPLIEDCOMPANY_FIELD, SUPPLIEDPHONE_FIELD];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get name() {
    return this.record?.data?.fields?.Name?.value ?? "";
  }
}