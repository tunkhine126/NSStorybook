/**
 *
 * Tests for Select
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import Select from '../select';

describe('<Select />', () => {
  const props = {
    responses: [
      { sourceValue: 'Test1, Test2, Test3' },
      { sourceValue: 'Test3' },
      { sourceValue: 'Test1' },
      { sourceValue: 'Test2' },
    ],
    options: ['Test1', 'Test2', 'Test3'],
    optionLabels: {
      Test1: 'Test Options 1',
      Test2: 'Test Options 2',
      Test3: 'Test Options 3',
    },
  };

  const propsVersion2 = {
    responses: [{ sourceValue: 'Test4' }, { sourceValue: 'Test5' }],
    options: ['Test1', 'Test2', 'Test3'],
    optionLabels: {
      Test1: 'Test Options 1',
      Test2: 'Test Options 2',
      Test3: 'Test Options 3',
    },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Select {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Select {...propsVersion2} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
