/**
 *
 * Tests for AddFilters
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import AddFilters from '../addFilters';
import { columns } from './index.test';

describe('<AddFilters />', () => {
  const defaultFilters = columns
    .filter(filter => filter.defaultFilter)
    .map(filter => filter.id);
  defaultFilters.unshift('');

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <AddFilters
          filterCategories={columns}
          filters={defaultFilters}
          handlechange={() => {}}
          handleReset={() => {}}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <AddFilters
          filterCategories={columns}
          filters={defaultFilters}
          handlechange={() => {}}
          handleReset={() => {}}
        />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
