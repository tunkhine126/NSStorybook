/**
 *
 * Tests for Wrapper
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';

// import 'jest-dom/extend-expect'; // add some helpful assertions
import { NSFiltersProvider } from '../context/filters';

import Wrapper from '../index';
const defaultState = { query: null, chips: [] };

export const columns = [
  {
    id: 'recipientName',
    defaultWidth: '380px',
    label: 'Family',
    align: 'left',
    type: 'single',
    columnData: null,
    noData: false,
    disablePadding: true,
    show: true,
    sortable: true,
    defaultFilter: false,
    filter: false,
    custom: false,
  },
  {
    id: 'id',
    defaultWidth: '450px',
    label: 'Family ID',
    align: 'left',
    type: 'single',
    columnData: null,
    noData: false,
    disablePadding: false,
    show: true,
    sortable: true,
    filter: false,
    defaultFilter: false,
    custom: false,
  },
  {
    id: 'completedSurveys',
    defaultWidth: '123px',
    type: 'multi',
    label: 'Completed Surveys',
    filterWidth: 170,
    align: 'center',
    columnData: null,
    disablePadding: true,
    noData: false,
    show: true,
    sortable: false,
    filter: true,
    defaultFilter: true,
    custom: false,
  },
  {
    id: 'childRecipients',
    defaultWidth: '100px',
    type: 'multi',
    label: 'Family Members',
    align: 'center',
    columnData: null,
    noData: false,
    disablePadding: true,
    show: true,
    sortable: false,
    filter: false,
    defaultFilter: false,
    custom: false,
  },
  {
    id: 'parentRecipients',
    type: 'levels',
    label: 'Community',
    filterWidth: 150,
    align: 'center',
    noData: false,
    columnData: null,
    disablePadding: true,
    sortable: false,
    show: true,
    filter: true,
    noColumn: true,
    defaultFilter: true,
    custom: false,
  },
  {
    id: 'lastUpdate',
    defaultWidth: '180px',
    type: 'date',
    label: 'Last Update',
    filterWidth: 150,
    align: 'center',
    columnData: null,
    noData: true,
    disablePadding: true,
    show: true,
    sortable: true,
    filter: true,
    defaultFilter: true,
    custom: false,
  },
];

export const handleSelected = () => {};

export const dateRangeProps = {
  dateRange: { before: null, after: null },
  setDateRange: () => {},
};

export const lastUpdateProps = {
  lastUpdate: defaultState,
  setLastUpdate: () => {},
};

export const lastUpdatePropsCalendar = {
  lastUpdate: {
    query: 'custom',
    chips: [],
  },
  setLastUpdate: () => {},
};

const commonProps = {
  filterCategories: columns,
  dateRangeProps,
  lastUpdateProps: lastUpdatePropsCalendar,
};

const wrapperProps = {
  filterQueryTriggers: {
    completedSurveys: () => {},
    lastUpdate: () => {},
  },
  setSelected: () => {},
  messages: defineMessages({
    completedSurveys: {
      id: `app.test.completedSurveys`,
      defaultMessage: 'Completed Surveys',
    },
    lastUpdate: {
      id: `app.test.lastUpdate`,
      defaultMessage: 'Last Update',
    },
    parentRecipients: {
      id: `app.test.parentRecipients`,
      defaultMessage: 'Community',
    },
  }),
};

export const NSFiltersProviderTest = ({ children }) => (
  <NSFiltersProvider handleSelected={handleSelected} {...commonProps}>
    {children}
  </NSFiltersProvider>
);

export const NSFiltersProviderTestCalendar = ({ children }) => (
  <NSFiltersProvider handleSelected={handleSelected} {...commonProps}>
    {children}
  </NSFiltersProvider>
);

NSFiltersProviderTest.propTypes = {
  children: PropTypes.any,
};

NSFiltersProviderTestCalendar.propTypes = {
  children: PropTypes.any,
};

describe('<Wrapper />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <Wrapper {...commonProps} {...wrapperProps} />
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
          <Wrapper {...commonProps} {...wrapperProps} />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
