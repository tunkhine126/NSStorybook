import { gql } from 'apollo-boost';

export const GET_RECIEPIENT_DEFINITION = gql`
  query getRecipientDefinition($uuid: ID!) {
    recipientDefinition(uuid: $uuid) {
      uuid
      prefixInternalIds
      prefixSeparator
      customFields
    }
  }
`;

export const GET_RECIEPIENT_INTERNAL_ID = gql`
  query getInternalId($uuid: ID!) {
    recipient(uuid: $uuid) {
      internalId
      children {
        uuid
      }
    }
  }
`;

export const GET_RECIPIENTS = gql`
  query getRecipients(
    $resultsPerPage: Int
    $surveyUuids: [String!]
    $parentUuids: [String!]
    $skip: Int
    $sortColumn: RecipientSortBy
    $sortDirection: SortDirection
    $nameContains: String
    $internalIdContains: String
    $organizationUuid: String
    $recipientDefinitionUuid: String
    $lastSyncedAt: ISO8601DateTime
    $before: ISO8601DateTime
    $after: ISO8601DateTime
  ) {
    recipients(
      filter: {
        organizationUuid: $organizationUuid
        recipientDefinitionUuid: $recipientDefinitionUuid
        surveyUuids: $surveyUuids
        parentUuids: $parentUuids
        before: $before
        after: $after
        OR: [
          { nameContains: $nameContains }
          { internalIdContains: $internalIdContains }
        ]
      }
      first: $resultsPerPage
      skip: $skip
      sort: { sortColumn: $sortColumn, sortDirection: $sortDirection }
      lastSyncedAt: $lastSyncedAt
    ) {
      uuid
      internalId
      name
      submissionUuids
      updatedAt
      parent {
        name
        uuid
        recipientDefinitionUuid
      }
      children {
        uuid
      }
    }

    _recipientsMetaData {
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const GET_RECIPIENT = gql`
  query getRecipient($uuid: ID!) {
    recipient(uuid: $uuid) {
      name
      uuid
      recipientDefinitionUuid
      internalId
      base64Avatar
      progressPercentage
      customFields
      recipientDefinition {
        customFields
      }
      parent {
        name
        uuid
      }
      pipelineStep {
        name
        description
        color
      }
      recipientDefinition {
        children {
          uuid
        }
      }
      children {
        name
        uuid
        recipientDefinitionUuid
        base64Avatar
        customFields
        recipientDefinition {
          name
          customFields
        }
      }
    }
  }
`;
