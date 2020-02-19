/**
 *
 * Tests for NSFilters
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import NSFilters from '../nsFilters';
import {
  columns,
  tableSearchProps,
  NSFiltersProviderTest,
  filterTitles,
} from './index.test';

describe('<NSFilters />', () => {
  const defaultFilters = columns
    .filter(filter => filter.defaultFilter)
    .map(filter => filter.id);
  defaultFilters.unshift('');

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <NSFilters
            filterTitles={filterTitles}
            filterCategories={defaultFilters}
            tableSearchProps={tableSearchProps}
            handleSelected={() => {}}
            handlePageChange={() => {}}
          />
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
          <NSFilters
            filterTitles={filterTitles}
            filterCategories={defaultFilters}
            tableSearchProps={tableSearchProps}
            handleSelected={() => {}}
            handlePageChange={() => {}}
          />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
