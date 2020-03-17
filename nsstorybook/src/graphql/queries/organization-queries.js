import { gql } from 'apollo-boost';

export const GET_USER_ORGANIZATIONS = gql`
  query {
    organizations {
      name
      uuid
      primaryRecipientDefinitionUuid
    }
  }
`;

export const GET_RECIPIENT_TREE = gql`
  query getRecipientTree($uuid: ID!) {
    organization(uuid: $uuid) {
      nestedRecipientTree
    }
  }
`;
