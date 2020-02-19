/**
 *
 * Tests for ListItemLink
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, browserHistory } from 'react-router-dom';
import { render } from '@testing-library/react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import configureStore from 'configureStore';

// Routes
import { ROUTES } from 'utils/globalConstants';
import { DEFAULT_LOCALE } from 'i18n';

// import 'jest-dom/extend-expect'; // add some helpful assertions

import ListItemLink from '../index';

const style = {
  listItem: {
    '&:hover': {
      backgroundColor: 'rgba(66,66,66 ,1)',
    },
  },
};

const Composer = ({ classes }) => (
  <ListItemLink to={ROUTES.dashboard.path} icon={<></>} classes={classes} />
);

const ComposerOpen = ({ classes }) => (
  <ListItemLink
    to={ROUTES.dashboard.path}
    icon={<></>}
    classes={classes}
    open
  />
);

const ListItemLinkComposition = withStyles(style)(Composer);
const ListItemLinkOpen = withStyles(style)(ComposerOpen);

Composer.propTypes = {
  classes: PropTypes.object.isRequired,
};
ComposerOpen.propTypes = {
  classes: PropTypes.object.isRequired,
};

describe('<ListItemLink />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <MemoryRouter>
            <ListItemLinkComposition />
          </MemoryRouter>
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
          <MemoryRouter>
            <ListItemLinkOpen />
          </MemoryRouter>
        </IntlProvider>
      </Provider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
