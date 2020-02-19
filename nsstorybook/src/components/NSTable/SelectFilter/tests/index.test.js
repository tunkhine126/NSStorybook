/**
 *
 * Tests for SelectFilter
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import SelectFilter from '../index';
import { NSFiltersProviderTest } from '../../tests/index.test';

describe('<SelectFilter />', () => {
  const label = 'TestFilter';

  const data = {
    loading: false,
    list: [],
    chips: [],
    clear: () => {},
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <SelectFilter label={label} id="Test-Filter" noData data={data} />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <SelectFilter label={label} id="Test-Filter" noData data={data} />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
