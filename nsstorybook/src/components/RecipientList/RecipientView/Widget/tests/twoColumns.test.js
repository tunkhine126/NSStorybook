/**
 *
 * Tests for TwoColumns
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import TwoColumns from '../twoColumns';

describe('<TwoColumns />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <TwoColumns col1={<p>Test</p>} col2={<p>Test2</p>} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <TwoColumns col1={<p>Test</p>} col2={<p>Test2</p>} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
