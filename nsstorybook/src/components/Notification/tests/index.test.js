/**
 *
 * Tests for Notification
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { withStyles } from '@material-ui/core/styles';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Notification from '../index';

const style = {
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: '2px',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
};

const state = {
  open: false,
  message: 'Successful log out',
  type: 'error',
};

const Composer = ({ classes }) => (
  <Notification
    status={state.open}
    message={state.message}
    classes={classes}
    messageHandler={() => {}}
    duration={10000}
    position={{ vertical: 'top', horizontal: 'center' }}
    type={state.type}
  />
);

const NotificationComposition = withStyles(style)(Composer);

Composer.propTypes = {
  classes: PropTypes.object.isRequired,
};

describe('<Notification />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<NotificationComposition />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<NotificationComposition />);
    expect(firstChild).toMatchSnapshot();
  });
});
