/**
 *
 * Tests for FieldsProvider
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { FieldsProvider } from '../fields';

describe('<FieldsProvider />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <FieldsProvider>
          <div>Test Field</div>
        </FieldsProvider>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <FieldsProvider>
          <div>Test Field</div>
        </FieldsProvider>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
