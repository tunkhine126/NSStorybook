/**
 *
 * Tests for NSTable
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import TestingComponent from 'components/shared/Testing';
import NSTable from '../index';

import { NSFiltersProvider } from '../context/filters';

const defaultState = { query: null, chips: [] };

export const defaultSortColumn = 'date';

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

export const rowsPerPageProps = {
  rowsPerPage: 15,
  setRowsPerPage: () => {},
};

export const orderByProps = {
  orderBy: 'updated_at',
  setOrderBy: () => {},
};

export const orderProps = {
  order: 'desc',
  setOrder: () => {},
};

export const pageProps = {
  currentPage: 1,
  setCurrentPage: () => {},
};

export const tableSearchProps = {
  tableSearch: '',
  setTableSearch: () => {},
};

export const filteredResults = 0;

export const totalPages = 0;

export const totalResults = 100;

export const mapColumnIds = {
  lastUpdate: 'updated_at',
  id: 'internal_id',
  recipientName: 'name',
};

export const loading = false;

export const allRecordsUuid = [];

export const filterTitles = {
  completedSurveys: 'Completed Surveys',
  parentRecipients: 'Community',
  lastUpdate: 'Last Update',
};

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

export const formattedColumns = [
  {
    direction: 'column',
    justify: 'flex-start',
    alignItems: 'flex-start',
    columnId: 'recipientName',
    loadingRows: [{}, {}],
    content(row) {
      return <Grid item>{row.recipientName}</Grid>;
    },
  },
  {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-start',
    columnId: 'id',
    loadingRows: [({}, {})],
    content(row) {
      return <Grid item>{row.id}</Grid>;
    },
  },
  {
    direction: 'row',
    justify: 'center',
    alignItems: 'flex-start',
    columnId: 'completedSurveys',
    loadingRows: [({}, {})],
    content(row) {
      return <Grid item>{row.completedSurveys}</Grid>;
    },
  },
  {
    direction: 'row',
    justify: 'center',
    alignItems: 'flex-start',
    columnId: 'childRecipients',
    loadingRows: [({}, {})],
    content(row) {
      return <Grid item>{row.childRecipients}</Grid>;
    },
  },
  {
    direction: 'row',
    justify: 'center',
    alignItems: 'flex-start',
    columnId: 'lastUpdate',
    loadingRows: [({}, {})],
    content(row) {
      return <Grid item>{row.lastUpdate}</Grid>;
    },
  },
];

export const data = [
  {
    recipientPath: '/recipients/family-list/family/:id',
    parentRecipients: 'Nuevo Cascatlan',
    uuid: 'b3ed06c0-8711-11e9-930f-679cdd5f45dd',
    recipientName: 'Rodriguez',
    id: 'SV-NUEVO_CASCATLAN-SV-NUEVO_CASCATLAN_23158',
    completedSurveys: 1,
    childRecipients: 3,
    lastUpdate: '2019-10-03T14:44:04Z',
  },
  {
    recipientPath: '/recipients/family-list/family/:id',
    parentRecipients: 'Mexico',
    uuid: '342f3r2-4322-ww34-fwgh4-cefwef2343',
    recipientName: 'Kalumbo',
    id: 'SV-MEXICO_CASCATLAN_23158',
    completedSurveys: 10,
    childRecipients: 8,
    lastUpdate: '2018-04-03T19:44:04Z',
  },
];

export const horizActions = [];

export const NSFiltersProviderTest = ({ children }) => (
  <NSFiltersProvider
    filterCategories={columns}
    dateRangeProps={dateRangeProps}
    lastUpdateProps={lastUpdateProps}
    handleSelected={handleSelected}
  >
    {children}
  </NSFiltersProvider>
);

export const NSFiltersProviderTestCalendar = ({ children }) => (
  <NSFiltersProvider
    filterCategories={columns}
    dateRangeProps={dateRangeProps}
    lastUpdateProps={lastUpdatePropsCalendar}
    handleSelected={handleSelected}
  >
    {children}
  </NSFiltersProvider>
);

NSFiltersProviderTest.propTypes = {
  children: PropTypes.any,
};

NSFiltersProviderTestCalendar.propTypes = {
  children: PropTypes.any,
};

describe('<NSTable />', () => {
  const name = 'sampleTable';
  const selected = ['3432-3124-412'];

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <NSTable
            name={name}
            horizActions={horizActions}
            filterTitles={filterTitles}
            formattedColumns={formattedColumns}
            defaultSortColumn={defaultSortColumn}
            data={data}
            columns={columns}
            setData={() => {}}
            selected={selected}
            setSelected={() => {}}
            rowsPerPageProps={rowsPerPageProps}
            orderByProps={orderByProps}
            orderProps={orderProps}
            pageProps={pageProps}
            tableSearchProps={tableSearchProps}
            dateRangeProps={dateRangeProps}
            lastUpdateProps={lastUpdateProps}
            filteredResults={filteredResults}
            totalResults={totalResults}
            totalPages={totalPages}
            mapColumnIds={mapColumnIds}
            loading={loading}
            filiteredRecordsUuid={allRecordsUuid}
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
          <NSTable
            name={name}
            horizActions={horizActions}
            filterTitles={filterTitles}
            formattedColumns={formattedColumns}
            defaultSortColumn={defaultSortColumn}
            data={data}
            columns={columns}
            setData={() => {}}
            selected={selected}
            setSelected={() => {}}
            rowsPerPageProps={rowsPerPageProps}
            orderByProps={orderByProps}
            orderProps={orderProps}
            pageProps={pageProps}
            tableSearchProps={tableSearchProps}
            dateRangeProps={dateRangeProps}
            lastUpdateProps={lastUpdateProps}
            filteredResults={filteredResults}
            totalResults={totalResults}
            totalPages={totalPages}
            mapColumnIds={mapColumnIds}
            loading={loading}
            filiteredRecordsUuid={allRecordsUuid}
          />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
