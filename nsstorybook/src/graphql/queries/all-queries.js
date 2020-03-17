import { gql } from 'apollo-boost';

export const GET_ALL_FAMILIES = gql`
  query getAllFamilies(
    $sortColumn: RecipientSortBy
    $sortDirection: SortDirection
    $organizationUuid: String
    $recipientDefinitionUuid: String
  ) {
    recipients(
      filter: {
        recipientDefinitionUuid: $recipientDefinitionUuid
        organizationUuid: $organizationUuid
      }
      sort: { sortColumn: $sortColumn, sortDirection: $sortDirection }
    ) {
      uuid
      internalId
      name
      submissionUuids
      updatedAt
      parent {
        name
        uuid
      }
      children {
        uuid
      }
    }
  }
`;

export const GET_ALL_RECIPIENTS = gql`
  query getAllRecipients(
    $sortColumn: RecipientSortBy
    $sortDirection: SortDirection
    $organizationUuid: String
    $recipientDefinitionUuid: String
  ) {
    recipients(
      filter: {
        recipientDefinitionUuid: $recipientDefinitionUuid
        organizationUuid: $organizationUuid
      }
      sort: { sortColumn: $sortColumn, sortDirection: $sortDirection }
    ) {
      uuid
      internalId
      name
      submissionUuids
      updatedAt
      parent {
        name
        uuid
      }
      children {
        uuid
      }
    }
  }
`;

export const GET_ALL_SUBMISSIONS = gql`
  query getAllSubmissions(
    $sortColumn: SubmissionSortBy
    $sortDirection: SortDirection
    $organizationUuid: String
  ) {
    submissions(
      filter: { organizationUuid: $organizationUuid }
      sort: { sortColumn: $sortColumn, sortDirection: $sortDirection }
    ) {
      uuid
      surveyUuid
      status
      completedAt
      surveyor {
        firstName
        lastName
      }
      survey {
        name
      }
      recipient {
        name
        uuid
        internalId
        name
        submissionUuids
        updatedAt
        parent {
          name
          uuid
        }
        children {
          uuid
        }
      }
    }
  }
`;

export const GET_ALL_FILTERED_FAMILIES = gql`
  query getAllFamilies(
    $surveyUuids: [String!]
    $parentUuids: [String!]
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
        recipientDefinitionUuid: $recipientDefinitionUuid
        organizationUuid: $organizationUuid
        surveyUuids: $surveyUuids
        parentUuids: $parentUuids
        before: $before
        after: $after
        OR: [
          { nameContains: $nameContains }
          { internalIdContains: $internalIdContains }
        ]
      }
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
      }
      children {
        uuid
      }
    }
  }
`;

export const GET_ALL_FILTERED_RECIPIENTS = gql`
  query getAllFilteredRecipients(
    $surveyUuids: [String!]
    $parentUuids: [String!]
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
        recipientDefinitionUuid: $recipientDefinitionUuid
        organizationUuid: $organizationUuid
        surveyUuids: $surveyUuids
        parentUuids: $parentUuids
        before: $before
        after: $after
        OR: [
          { nameContains: $nameContains }
          { internalIdContains: $internalIdContains }
        ]
      }
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
      }
      children {
        uuid
      }
    }
  }
`;

export const GET_ALL_FILTERED_SURVEYS = gql`
  query getSurveys(
    $sortColumn: SurveySortBy
    $sortDirection: SortDirection
    $nameContains: String
    $contextUuids: [String!]
    $lastSyncedAt: ISO8601DateTime
    $organizationUuid: String
  ) {
    surveys(
      filter: {
        organizationUuid: $organizationUuid
        contextUuids: $contextUuids
        OR: [{ nameContains: $nameContains }]
      }
      sort: { sortColumn: $sortColumn, sortDirection: $sortDirection }
      lastSyncedAt: $lastSyncedAt
    ) {
      uuid
      name
      availableContexts {
        name
        uuid
        permalink
      }
      surveySections {
        surveyQuestionUuids
      }
      completedSubmissionUuids
      lastCompletedSubmission {
        uuid
        completedAt
      }
      changedAt
    }

    _surveysMetaData {
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const GET_ALL_FILTERED_SUBMISSIONS = gql`
  query getAllFilteredSubmissions(
    $sortColumn: SubmissionSortBy
    $sortDirection: SortDirection
    $organizationUuid: String
    $surveyUuids: [String!]
    $recipientParentUuids: [String!]
    $recipientNameContains: String
    $recipientInternalIdContains: String
    $lastSyncedAt: ISO8601DateTime
    $before: ISO8601DateTime
    $after: ISO8601DateTime
  ) {
    submissions(
      filter: {
        organizationUuid: $organizationUuid
        completedAtAfter: $after
        completedAtBefore: $before
        surveyUuids: $surveyUuids
        recipientParentUuids: $recipientParentUuids
        OR: [
          { recipientNameContains: $recipientNameContains }
          { recipientInternalIdContains: $recipientInternalIdContains }
        ]
      }
      lastSyncedAt: $lastSyncedAt
      sort: { sortColumn: $sortColumn, sortDirection: $sortDirection }
    ) {
      uuid
      status
      completedAt
      surveyor {
        firstName
        lastName
      }
      survey {
        name
      }
      recipient {
        name
        uuid
        internalId
        name
        submissionUuids
        updatedAt
        parent {
          name
          uuid
        }
        children {
          uuid
        }
      }
    }
  }
`;

export const GET_ALL_SURVEYORS = gql`
  query getAllSurveyors($organizationUuid: String) {
    users(
      filter: { organizationUuid: $organizationUuid, withSubmissions: true }
    ) {
      uuid
      firstName
      lastName
    }
  }
`;

export const GET_ALL_SURVEYS = gql`
  query getAllSurveys($organizationUuid: String) {
    surveys(filter: { organizationUuid: $organizationUuid }) {
      uuid
      name
      submissionUuids
      availableContexts {
        name
        uuid
        permalink
      }
      surveySections {
        surveyQuestionUuids
      }
      completedSubmissionUuids
      lastCompletedSubmission {
        uuid
        completedAt
      }
      changedAt
    }
  }
`;

export const GET_ALL_CONTEXTS = gql`
  query {
    contexts {
      uuid
      name
      permalink
      language
    }
  }
`;

export const GET_ALL_RECIPIENT_DEFINITIONS = gql`
  query getAllRecipientDefinitions($organizationUuid: String) {
    recipientDefinitions(filter: { organizationUuid: $organizationUuid }) {
      name
      uuid
      primary
      hierarchyId
      parentUuid
      routes
      table
      nestedRecipientTree
    }
  }
`;
