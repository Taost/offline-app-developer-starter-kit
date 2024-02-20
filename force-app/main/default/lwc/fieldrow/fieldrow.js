import { LightningElement, api, track } from 'lwc';

export default class FieldRow extends LightningElement {
    @api
    label;

    @api
    value;

    @api
    originalvalue;

    @api
    editable = false;

    @track
    isEditing = false;

    @track
    editText;

    handleEditTextChange = (e) => {
        this.editText = e.target.value;
    };
    handleEditClick = () => {
        this.editText = this.value;
        this.isEditing = true;
    };
    handleSaveClick = () => {
        if (this.editText !== this.value) {
            const detail = {
                detail: {
                    text: this.editText,
                },
            };
            this.dispatchEvent(new CustomEvent('valuechanged', detail));
        }
        this.isEditing = false;
    };

    get showOriginal() {
        return this.originalvalue !== undefined;
    }

    get canEdit() {
        return this.editable && !this.isEditing;
    }
}