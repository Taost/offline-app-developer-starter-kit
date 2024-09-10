import { LightningElement, api, wire } from "lwc";
import { gql, graphql } from "lightning/uiGraphQLApi";

export default class FileUploadPage extends LightningElement {
  @api
  recordId;

  get filesForRecordQuery() {
    return !this.recordId
      ? undefined
      : gql`
          query filesForRecord($recordId: ID) {
            uiapi {
              query {
                ContentDocumentLink(
                  where: { LinkedEntityId: { eq: $recordId } }
                ) {
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
  }

  // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-wire-adapter-of-resource-cannot-be-primed
  @wire(graphql, {
    query: "$filesForRecordQuery",
    variables: "$graphqlVariables",
    operationName: "filesForRecord",
  })
  filesForRecordResponse;

  get graphqlVariables() {
    return {
      recordId: this.recordId,
    };
  }

  get selectedContentDocuments() {
    return this.filesForRecordResponse?.data?.uiapi.query.ContentDocumentLink
      .edges;
  }
}
