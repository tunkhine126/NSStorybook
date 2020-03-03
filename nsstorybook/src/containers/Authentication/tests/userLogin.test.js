/**
 *
 * Tests for Authentication
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { ApolloProvider } from 'react-apollo';

import client from 'utils/apollo-client';

import { DEFAULT_LOCALE } from 'i18n';
import configureStore from 'configureStore';
import UserLogin from '../userLogin';

const style = makeStyles(theme => ({
  form: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '40px',
      marginRight: '40px',
    },
  },
}));

const history = {
  location: { pathname: '/dashboard' },
};

const Composer = ({ classes }) => (
  <UserLogin
    classes={classes}
    history={history}
    signInUser={() => {}}
    setmessageState={() => ({
      message: 'Logged Out',
      open: true,
      type: 'success',
    })}
  />
);

const UserLoginComposition = withStyles(style)(Composer);

Composer.propTypes = {
  classes: PropTypes.object.isRequired,
};

describe('<UserLogin />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ApolloProvider client={client}>
            <UserLoginComposition />
          </ApolloProvider>
        </IntlProvider>
      </Provider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ApolloProvider client={client}>
            <UserLoginComposition />
          </ApolloProvider>
        </IntlProvider>
      </Provider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
