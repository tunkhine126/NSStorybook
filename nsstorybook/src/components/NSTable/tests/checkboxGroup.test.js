/**
 *
 * Tests for ColumnGroup
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import CheckBoxGroup from '../checkboxGroup';

describe('<ColumnGroup />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <CheckBoxGroup
          label="test"
          show
          id="2"
          checboxChange={() => {}}
          shouldDisable={{ disable: false, id: null }}
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
        <CheckBoxGroup
          label="test2"
          show
          id="3"
          checboxChange={() => {}}
          shouldDisable={{ disable: false, id: null }}
        />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
