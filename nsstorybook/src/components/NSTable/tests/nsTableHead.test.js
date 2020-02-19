/**
 *
 * Tests for NSTableHead
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import Table from '@material-ui/core/Table';
import NSTableHead from '../nsTableHead';
import { columns, data, defaultSortColumn, mapColumnIds } from './index.test';

describe('<NSTableHead />', () => {
  const density = '72px';
  const order = 'desc';
  const orderBy = defaultSortColumn;
  const showCheckboxes = false;
  const showTableSettings = false;
  const arialLabels = null;
  const totalPossibleItems = 15;
  const toolbarActions = [
    {
      title: 'Create',
      handleClick: () => {},
    },
    {
      title: 'Export',
      handleClick: () => {},
    },
  ];

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Table>
          <NSTableHead
            mapColumnIds={mapColumnIds}
            data={data}
            columns={columns}
            totalResults={data.length}
            loading={false}
            numSelected={0}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={() => {}}
            onRequestSort={() => {}}
            arialLabels={arialLabels}
            toolbarActions={toolbarActions}
            showCheckboxes={showCheckboxes}
            showTableSettings={showTableSettings}
            allSelectedPages={[]}
            dataInView={[]}
            currentPage={0}
            columnChange={() => {}}
            densityChange={() => {}}
            density={density}
            rowChange={() => {}}
            handleReorder={() => {}}
            totalPossibleItems={totalPossibleItems}
          />
        </Table>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Table>
          <NSTableHead
            mapColumnIds={mapColumnIds}
            data={data}
            columns={columns}
            totalResults={data.length}
            loading={false}
            numSelected={0}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={() => {}}
            onRequestSort={() => {}}
            arialLabels={arialLabels}
            toolbarActions={toolbarActions}
            showCheckboxes={showCheckboxes}
            showTableSettings={showTableSettings}
            allSelectedPages={[]}
            dataInView={[]}
            currentPage={0}
            columnChange={() => {}}
            densityChange={() => {}}
            density={density}
            rowChange={() => {}}
            handleReorder={() => {}}
            totalPossibleItems={totalPossibleItems}
          />
        </Table>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
