/**
 *
 * Tests for Authentication
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { ApolloProvider } from 'react-apollo';

import client from 'utils/apollo-client';

import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from 'configureStore';
import { Authentication } from '../index';

describe('<Authentication />', () => {
  let store;
  const history = {
    location: {
      pathname: '/dashboard',
    },
  };

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ApolloProvider client={client}>
            <Authentication dispatch={dispatch} history={history} />
          </ApolloProvider>
        </IntlProvider>
      </Provider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const dispatch = jest.fn();
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ApolloProvider client={client}>
            <Authentication dispatch={dispatch} history={history} />
          </ApolloProvider>
        </IntlProvider>
      </Provider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
