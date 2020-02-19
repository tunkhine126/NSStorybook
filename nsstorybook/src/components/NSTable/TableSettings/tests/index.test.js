/**
 *
 * Tests for TableSettings
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import TableSettings from '../index';
import { columns } from '../../tests/index.test';

describe('<TableSettings />', () => {
  const density = '72px';

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <TableSettings
          columns={columns}
          density={density}
          columnChange={() => {}}
          densityChange={() => {}}
          rowChange={() => {}}
          handleReorder={() => {}}
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
        <TableSettings
          columns={columns}
          density={density}
          columnChange={() => {}}
          densityChange={() => {}}
          rowChange={() => {}}
          handleReorder={() => {}}
        />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
