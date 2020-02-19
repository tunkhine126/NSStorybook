/**
 *
 * Tests for Filter Context
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import TestingComponent from 'components/shared/Testing';
import { NSFiltersProvider } from '../filters';
import {
  columns,
  dateRangeProps,
  lastUpdateProps,
  handleSelected,
} from '../../tests/index.test';

describe('<NSFiltersProvider />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFiltersProvider
          filterCategories={columns}
          dateRangeProps={dateRangeProps}
          lastUpdateProps={lastUpdateProps}
          handleSelected={handleSelected}
        >
          <div>Filter Test</div>
        </NSFiltersProvider>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <NSFiltersProvider
          filterCategories={columns}
          dateRangeProps={dateRangeProps}
          lastUpdateProps={lastUpdateProps}
          handleSelected={handleSelected}
        >
          <div>Filter Test</div>
        </NSFiltersProvider>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
