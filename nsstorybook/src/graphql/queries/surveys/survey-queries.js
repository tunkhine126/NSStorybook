import { gql } from 'apollo-boost';

export const GET_SURVEYS = gql`
  query getSurveys(
    $resultsPerPage: Int
    $skip: Int
    $sortColumn: SurveySortBy
    $sortDirection: SortDirection
    $nameContains: String
    $contextUuids: [String!]
    $lastSyncedAt: ISO8601DateTime
    $organizationUuid: String
    $before: ISO8601DateTime
    $after: ISO8601DateTime
  ) {
    surveys(
      filter: {
        organizationUuid: $organizationUuid
        contextUuids: $contextUuids
        before: $before
        after: $after
        OR: [{ nameContains: $nameContains }]
      }
      first: $resultsPerPage
      skip: $skip
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

export const GET_SURVEY = gql`
  query getSurvey($uuid: ID!) {
    survey(uuid: $uuid) {
      name
      submissions {
        uuid
        completedAt
      }
      surveySections {
        body
        surveyQuestions {
          uuid
          isRequired
          fieldType
          displayRuleValue
          displayRuleCondition
          questionVersion {
            versionNumber
            question {
              name
              uuid
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
  }
`;

export const GET_SUBMISSIONS = gql`
  query getSubmissions(
    $resultsPerPage: Int
    $skip: Int
    $surveyUuids: [String!]
    $surveyorUuids: [String!]
    $recipientParentUuids: [String!]
    $sortColumn: SubmissionSortBy
    $sortDirection: SortDirection
    $organizationUuid: String
    $recipientNameContains: String
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
        surveyorUuids: $surveyorUuids
        recipientParentUuids: $recipientParentUuids
        OR: [{ recipientNameContains: $recipientNameContains }]
      }
      first: $resultsPerPage
      skip: $skip
      lastSyncedAt: $lastSyncedAt
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
        submissionUuids
        updatedAt
        parent {
          name
          uuid
          recipientDefinition {
            uuid
          }
        }
        children {
          uuid
        }
      }
    }

    _submissionsMetaData {
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const GET_QUESTION_RESPONSES = gql`
  query getQuestionResponses(
    $surveyUuids: [String!]
    $recipientParentUuids: [String!]
    $lastSyncedAt: ISO8601DateTime
    $before: ISO8601DateTime
    $after: ISO8601DateTime
  ) {
    questionResponses(
      filter: {
        surveyUuids: $surveyUuids
        recipientParentUuids: $recipientParentUuids
        before: $before
        after: $after
      }
      lastSyncedAt: $lastSyncedAt
    ) {
      imageUrl
      submissionCompletedAt
      recipientUuid
      base64Image
      position
      sourceValue
      questionUuid
      submissionUuid
    }
  }
`;
