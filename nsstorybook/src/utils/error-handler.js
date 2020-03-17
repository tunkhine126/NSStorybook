/* eslint-disable no-unused-vars */
import React from 'react';
import NotFound from 'components/NotFound';

// Handle Custom network errors
export const networkErrors = ({
  graphQLErrors,
  networkError,
  operation,
  response,
}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => ({
      type: 'GraphQL error',
      message,
      locations,
      path,
    }));
  }

  if (networkError) {
    // console.log(`[Network error]: ${networkError}`);
  }
};

// Handles All UI Network Errors
export const generalErrorHandler = (error, { ...rest }) => {
  // Handle Unauthorized
  if (error.message.includes('Unauthorized')) {
    return <NotFound unAuthorized {...rest} />;
  }
  // Handle Failed Queries
  return <NotFound failedQuery {...rest} message={error.message} />;
};
