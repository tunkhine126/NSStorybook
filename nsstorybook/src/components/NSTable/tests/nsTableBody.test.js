/**
 *
 * Tests for NSTableBody
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import Table from '@material-ui/core/Table';
import NSTableBody from '../nsTableBody';
import { columns, data, formattedColumns, horizActions } from './index.test';

describe('<NSTableBody />', () => {
  const defaultFilters = columns
    .filter(filter => filter.defaultFilter)
    .map(filter => filter.id);
  defaultFilters.unshift('');

  const density = '72px';
  const showCheckboxes = false;
  const showTableSettings = false;

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Table>
          <NSTableBody
            loading={false}
            isSelected={() => false}
            handleClick={() => {}}
            data={data}
            density={density}
            showCheckboxes={showCheckboxes}
            showTableSettings={showTableSettings}
            horizActions={horizActions}
            columns={columns}
            formattedColumns={formattedColumns}
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
          <NSTableBody
            loading={false}
            isSelected={() => false}
            handleClick={() => {}}
            data={data}
            density={density}
            showCheckboxes={showCheckboxes}
            showTableSettings={showTableSettings}
            horizActions={horizActions}
            columns={columns}
            formattedColumns={formattedColumns}
          />
        </Table>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
