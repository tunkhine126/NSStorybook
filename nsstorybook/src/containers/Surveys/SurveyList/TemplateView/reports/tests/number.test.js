/**
 *
 * Tests for Number
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import Number from '../number';

describe('<Number />', () => {
  const props = {
    responses: [
      { sourceValue: 3 },
      { sourceValue: 5 },
      { sourceValue: 1 },
      { sourceValue: 9 },
    ],
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Number {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Number {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
