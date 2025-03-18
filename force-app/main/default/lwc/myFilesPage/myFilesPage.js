// @ts-check

// @ts-ignore
import { LightningElement, api, track, wire } from 'lwc';
// @ts-ignore
import {
    createContentDocumentAndVersion,
    deleteRecord,
    createRecord,
    getFieldValue,
    getRecord,
} from 'lightning/uiRecordApi';
// @ts-ignore
import { getObjectInfos } from 'lightning/uiObjectInfoApi';
// @ts-ignore
import { gql, graphql, refreshGraphQL } from 'lightning/uiGraphQLApi';
// @ts-ignore
import userId from '@salesforce/user/Id';
// @ts-ignore
import IMAGE_URL_FIELD from '@salesforce/schema/ContentDocument.LatestPublishedVersion.VersionDataUrl';
// @ts-ignore
import CONTENT_DOCUMENT_LINK from '@salesforce/schema/ContentDocumentLink';
// @ts-ignore
import CONTENT_DOCUMENT from '@salesforce/schema/ContentDocument';
// @ts-ignore
import CONTENT_VERSION from '@salesforce/schema/ContentVersion';

export default class FileUploadPage extends LightningElement {
    // This allows the component to be placed on a record page, or other record
    // context, and receive the record's ID when it runs
    @api
    recordId;

    @track
    files = undefined;

    @track
    uploadingFile = false;

    @track
    deletingFile = false;

    @track
    titleValue = '';

    @track
    descriptionValue = '';

    @track
    useRenditions = false;

    //@track
    //recordId;

    @track
    errorMessage = '';

    filesForRecordQuery = gql`
        query filesForRecord($recordId: ID) {
            uiapi {
                query {
                    ContentDocumentLink(where: { LinkedEntityId: { eq: $recordId } }) {
                        edges {
                            node {
                                ContentDocument {
                                    Id
                                    Title {
                                        value
                                    }
                                    Description {
                                        value
                                    }
                                    FileType {
                                        value
                                    }
                                    FileExtension {
                                        value
                                    }
                                    ContentSize {
                                        value
                                    }
                                    LatestPublishedVersionId {
                                        value
                                    }
                                    LatestPublishedVersion {
                                        VersionDataUrl {
                                            value
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    @wire(getObjectInfos, {
        objectApiNames: [CONTENT_DOCUMENT_LINK, CONTENT_DOCUMENT, CONTENT_VERSION],
    })
    objectMetadata;

    @wire(graphql, {
        query: '$filesForRecordQuery',
        variables: '$graphqlVariables',
        operationName: 'filesForRecord',
    })
    fileForUserResponse;

    get graphqlVariables() {
        return {
            recordId: this.recordId,
        };
    }

    /*
    @wire(getRecord, {recordId: "069SB00000054FtYAI", fields: [IMAGE_URL_FIELD] })
    contentDocImage;

    get imageUrl() {
        return getFieldValue(this.contentDocImage.data, IMAGE_URL_FIELD);
    }

    get resizedImageUrl() {
        return getFieldValue(this.contentDocImage.data, IMAGE_URL_FIELD) + 
            '?thumb=THUMB240BY180';
    }
    */

    get isLoadingRecords() {
        return (
            this.fileForUserResponse?.data === undefined &&
            this.fileForUserResponse?.errors === undefined
        );
    }

    get currentFilesError() {
        const errors = this.fileForUserResponse?.errors;
        if (errors !== undefined && errors[0]) {
            return `${errors[0].body.message}`;
        }

        return undefined;
    }

    get imagePreviewClass() {
        if (this.useRenditions) {
            return 'tiny-thumbnails';
        }
        return '';
    }

    get hasContentDocumentLinks() {
        const edges = this.fileForUserResponse?.data?.uiapi.query.ContentDocumentLink.edges;
        return edges && edges.length > 0;
    }

    get selectedContentDocuments() {
        return this.fileForUserResponse?.data?.uiapi.query.ContentDocumentLink.edges;
    }

    get fileName() {
        /** @type {File} */
        const file = this.files && this.files[0];
        if (file) {
            return file.name;
        }

        return undefined;
    }

    handleInputChange(event) {
        this.files = event.detail.files;

        this.titleValue = this.fileName;
    }

    handleTitleInputChange(event) {
        this.titleValue = event.detail.value;
    }

    handleDescriptionInputChange(event) {
        this.descriptionValue = event.detail.value;
    }

    handleUseRenditionsToggleChange(event) {
        this.useRenditions = event.detail.isEnabled;
    }

    resetInputs() {
        this.files = [];
        this.titleValue = '';
        this.descriptionValue = '';
        this.errorMessage = '';
    }

    async handleUploadClick() {
        if (this.uploadingFile) {
            return;
        }

        const file = this.files && this.files[0];
        if (!file) {
            return;
        }

        try {
            this.uploadingFile = true;

            const contentDocumentAndVersion = await createContentDocumentAndVersion({
                title: this.titleValue,
                description: this.descriptionValue,
                fileData: file,
            });

            // Create a ContentDocumentLink (CDL) to associate the uploaded file
            // to the Files Related List of a record, like a Work Order.
            if (this.recordId) {
                const contentDocumentId = contentDocumentAndVersion.contentDocument.id;
                await this.createCdl(this.recordId, contentDocumentId);
            }

            // refresh the wire
            await refreshGraphQL(this.fileForUserResponse);
        } catch (error) {
            console.error(error);
            this.errorMessage = error;
        } finally {
            this.resetInputs();
            this.uploadingFile = false;
        }
    }

    async createCdl(recordId, contentDocumentId) {
        //debug("Creating a CDL...");

        await createRecord({
            apiName: 'ContentDocumentLink',
            fields: {
                LinkedEntityId: recordId,
                ContentDocumentId: contentDocumentId,
                ShareType: 'V',
            },
        })
            .then(() => {
                //debug("Successfully created a CDL!");
            })
            .catch((e) => {
                //log(`Failed to create a CDL: ${JSON.stringify(e)}`);
                throw e;
            });
    }

    async handleDeleteClick(event) {
        if (this.deletingFile) {
            return;
        }

        const recordId = event.target.value;

        try {
            this.deletingFile = true;

            await deleteRecord(recordId);

            // refresh the wire
            await refreshGraphQL(this.fileForUserResponse);
        } catch (error) {
            console.error(error);
        } finally {
            this.deletingFile = false;
        }
    }
}