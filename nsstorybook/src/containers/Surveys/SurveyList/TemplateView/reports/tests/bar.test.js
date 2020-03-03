/**
 *
 * Tests for Bar
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import Bar from '../bar';

describe('<Bar />', () => {
  const props = {
    answer: 'Test',
    numberOfResponses: 25,
    percentage: 30,
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Bar {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Bar {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
