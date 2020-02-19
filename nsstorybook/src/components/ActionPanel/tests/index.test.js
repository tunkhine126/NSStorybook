/**
 *
 * Tests for ActionPanel
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import TestingComponent from 'components/shared/Testing';
import ActionPanel from '../Loadable';
import { loadingAction } from '../index';

describe('<ActionPanel />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <ActionPanel
          action="save"
          type="submit"
          formId="test"
          resetForm={() => {}}
          loading
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should Execute loadingAction() without errors', () => {
    const spy = jest.spyOn(global.console, 'error');

    const setmessageState = () => {};
    const setloadingState = () => {};

    const timeOut = loadingAction(setmessageState, setloadingState);
    clearTimeout(timeOut);

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <ActionPanel
          action="save"
          type="submit"
          formId="test"
          resetForm={() => {}}
        />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
