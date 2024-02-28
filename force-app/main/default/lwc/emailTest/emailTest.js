import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class EmailTest extends NavigationMixin(LightningElement) {
    handleClick() {
        var pageRef = {
            type: "standard__quickAction",
            attributes: {
                apiName: "Global.SendEmail"
            },
            state: {
                recordId: '00QSB000002uSzyMAL',
                defaultFieldValues:
                encodeDefaultFieldValues({
                    HtmlBody : "Pre-populated text for the email body.", 
                    Subject : "Pre-populated Subject of the Email"
                })
            }
        };

        this[NavigationMixin.Navigate](pageRef);
    }
}