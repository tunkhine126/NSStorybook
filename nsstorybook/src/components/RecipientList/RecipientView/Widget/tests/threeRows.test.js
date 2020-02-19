/**
 *
 * Tests for ThreeRows
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import ThreeRows from '../threeRows';

describe('<ThreeRows />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <ThreeRows row1="FirstName" row2="Middle" row3="LastName" />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <ThreeRows row1="FirstName" row2="Middle" row3="LastName" />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
