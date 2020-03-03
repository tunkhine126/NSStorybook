/**
 *
 * Tests for ConfirmChanges
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import TestingComponent from 'components/shared/Testing';
import ConfirmChanges from '../confirmChanges';

describe('<ConfirmChanges />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <ConfirmChanges />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <ConfirmChanges />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
