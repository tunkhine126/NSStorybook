/**
 *
 * Tests for AccountSettings
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';

import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import AccountSettings from '../Loadable';

describe('<AccountSettings />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <AccountSettings />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <AccountSettings />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
