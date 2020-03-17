import { gql } from 'apollo-boost';

export const UPDATE_RECIPIENT = gql`
  mutation updateRecipient($uuid: String!, $customFields: RawJson) {
    updateRecipient(uuid: $uuid, customFields: $customFields) {
      recipient {
        customFields
        parent {
          children {
            customFields
          }
        }
      }
      errors
    }
  }
`;

export const CREATE_RECIPIENT = gql`
  mutation createRecipient(
    $name: String!
    $recipientDefinitionUuid: String!
    $parentUuid: String
    $description: String
    $base64Avatar: String
    $internalId: String
    $customFields: RawJson
  ) {
    createRecipient(
      name: $name
      recipientDefinitionUuid: $recipientDefinitionUuid
      parentUuid: $parentUuid
      description: $description
      base64Avatar: $base64Avatar
      internalId: $internalId
      customFields: $customFields
    ) {
      recipient {
        uuid
        customFields
      }
      errors
    }
  }
`;
