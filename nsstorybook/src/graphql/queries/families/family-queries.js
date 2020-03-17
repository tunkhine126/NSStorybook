import { gql } from 'apollo-boost';

export const GET_FAMILIES = gql`
  query getFamilies(
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

export const GET_FAMILY_CHILD_RECIEPIENT_CACHE = gql`
  query getFamily($uuid: ID!) {
    recipient(uuid: $uuid) {
      children {
        customFields
      }
    }
  }
`;

export const GET_FAMILY_RECIEPIENT_CACHE = gql`
  query getFamily($uuid: ID!) {
    recipient(uuid: $uuid) {
      customFields
    }
  }
`;

export const GET_FAMILY_SURVEY_SUBMISSIONS = gql`
  query getFamilySurveySubmissions($recipientUuids: [String!]) {
    submissions(filter: { recipientUuids: $recipientUuids }) {
      status
      completedAt
      surveyor {
        firstName
        lastName
      }
      survey {
        name
        surveySections {
          body
          surveyQuestions {
            isRequired
            fieldType
            displayRuleCondition
            questionVersion {
              versionNumber
              question {
                name
              }
              optionValues
              questionContexts {
                optionLabels
                label
                contextPermalink
              }
            }
          }
        }
      }
      questionResponses {
        sourceValue
      }
    }
  }
`;
