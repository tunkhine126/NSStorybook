/**
 *
 * Tests for FieldHistory
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import FieldHistory from '../fieldHistory';

describe('<FieldHistory />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <FieldHistory date="10/12/2018" value="James" user="Jake" />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <FieldHistory date="10/12/2018" value="James" user="Jake" />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
