/**
 *
 * Tests for CoreSettings
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import CoreSettings from '../coreSettings';
import { columns } from '../../tests/index.test';

describe('<CoreSettings />', () => {
  const addingFieldProps = {
    addingField: false,
    setAddingField: () => {},
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <CoreSettings
          rowChange={() => {}}
          columnChange={() => {}}
          handleReorderMode={() => {}}
          densityChange={() => {}}
          columns={columns}
          addingFieldProps={addingFieldProps}
          density="72px"
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
        <CoreSettings
          rowChange={() => {}}
          columnChange={() => {}}
          handleReorderMode={() => {}}
          densityChange={() => {}}
          columns={columns}
          addingFieldProps={addingFieldProps}
          density="72px"
        />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
