import { gql } from 'apollo-boost';

export const GET_USER = gql`
  query {
    viewer {
      firstName
      lastName
      email
      language
      defaultContextPermalink
    }
  }
`;
