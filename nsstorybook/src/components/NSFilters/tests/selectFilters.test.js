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

import SelectFilters from '../selectFilters';
import { NSFiltersProviderTest } from './index.test';

describe('<SelectFilters />', () => {
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
          <SelectFilters label={label} id="Test-Filter" noData data={data} />
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
          <SelectFilters label={label} id="Test-Filter" noData data={data} />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
