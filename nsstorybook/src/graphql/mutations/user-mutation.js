import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`
  mutation signInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
      viewer {
        uuid
        firstName
        lastName
        language
        email
        organizationUuids
        defaultContext {
          uuid
          name
          permalink
        }
        language
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstName: String
    $lastName: String
    $defaultContextPermalink: String
    $language: String
  ) {
    updateProfile(
      firstName: $firstName
      lastName: $lastName
      defaultContextPermalink: $defaultContextPermalink
      language: $language
    ) {
      viewer {
        firstName
        lastName
        language
        defaultContext {
          permalink
        }
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $password: String!
    $passwordConfirmation: String!
    $currentPassword: String!
  ) {
    updatePassword(
      password: $password
      passwordConfirmation: $passwordConfirmation
      currentPassword: $currentPassword
    ) {
      viewer {
        firstName
        lastName
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    initiateForgotPassword(email: $email) {
      status
    }
  }
`;
