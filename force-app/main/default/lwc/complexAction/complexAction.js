import { wire, LightningElement, api } from "lwc";
import { getObjectInfo } from "lightning/uiObjectInfoApi";

export default class KomaciAction extends LightningElement {
  @api recordId;
  @wire(getObjectInfo, { objectApiName: "Account" })
  objectInfo;

  get relationships() {
    //.slice(0, 1);
    return this.objectInfo.data.childRelationships;
  }
}