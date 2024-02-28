import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import CASENUMBER_FIELD from "@salesforce/schema/Case.CaseNumber";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import ORIGIN_FIELD from "@salesforce/schema/Case.Origin";
import PRIORITY_FIELD from "@salesforce/schema/Case.Priority";
import TYPE_FIELD from "@salesforce/schema/Case.Type";
import REASON_FIELD from "@salesforce/schema/Case.Reason";
import SUBJECT_FIELD from "@salesforce/schema/Case.Subject";
import DESCRIPTION_FIELD from "@salesforce/schema/Case.Description";
import COMMENTS_FIELD from "@salesforce/schema/Case.Comments";

export default class EditCaseRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  statusField = STATUS_FIELD;
  originField = ORIGIN_FIELD;
  priorityField = PRIORITY_FIELD;
  typeField = TYPE_FIELD;
  reasonField = REASON_FIELD;
  subjectField = SUBJECT_FIELD;
  descriptionField = DESCRIPTION_FIELD;
  commentsField = COMMENTS_FIELD;

  @wire(getRecord, { recordId: "$recordId", fields: [CASENUMBER_FIELD] })
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
    console.log("Updated Case", event.detail);
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