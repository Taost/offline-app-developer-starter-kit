import { LightningElement, api } from "lwc";
import CONTACT_NAME_FIELD from "@salesforce/schema/Contact.Name";
import CONTACT_TITLE_FIELD from "@salesforce/schema/Contact.Title";
import CONTACT_PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import CONTACT_EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import CONTACT_MOBILE_FIELD from "@salesforce/schema/Contact.MobilePhone";
import CONTACT_OWNER_FIELD from "@salesforce/schema/Contact.OwnerId";

export default class CreateContactRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  nameField = CONTACT_NAME_FIELD;
  titleField = CONTACT_TITLE_FIELD;
  phoneField = CONTACT_PHONE_FIELD;
  emailField = CONTACT_EMAIL_FIELD;
  mobileField = CONTACT_MOBILE_FIELD;
  ownerField = CONTACT_OWNER_FIELD;

  name = "";
  title = "";
  account = "";
  phone = "";
  email = "";
  mobile = "";

  onSuccess(event) {
    console.log("Created a contact", event.detail);
    // Dismiss modal on success
    this.dismiss(event);
  }

  onError(event) {
    console.error("Failed to create contact", event);
  }

  dismiss(event) {
    console.log("Dismissing modal", event.detail);
    // TODO: Can we use window.history.back() here?
    // eslint-disable-next-line no-restricted-globals
    history.back();
  }
}
