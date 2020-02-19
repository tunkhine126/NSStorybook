/**
 *
 * LinkRouter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter, browserHistory } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { IntlProvider } from 'react-intl';
import configureStore from 'configureStore';
import { DEFAULT_LOCALE } from 'i18n';
import client from 'utils/apollo-client';

function TestingComponent(props) {
  const store = configureStore({}, browserHistory);

  return (
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <ApolloProvider client={client}>{props.children}</ApolloProvider>
        </MemoryRouter>
      </IntlProvider>
    </Provider>
  );
}

TestingComponent.propTypes = {
  children: PropTypes.any.isRequired,
};

export default TestingComponent;
