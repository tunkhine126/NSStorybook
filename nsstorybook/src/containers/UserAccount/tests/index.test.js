/**
 *
 * Tests for UserAccount
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import TestingComponent from 'components/shared/Testing';

import UserAccount from '../Loadable';

describe('<UserAccount />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <TestingComponent>
        <UserAccount dispatch={dispatch} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const dispatch = jest.fn();
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <UserAccount dispatch={dispatch} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
