/**
 *
 * Tests for Widget
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import Widget from '../widget';

describe('<Widget />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Widget
          header="Test Header"
          body={<div>Test Content</div>}
          message="addRecipientChild"
          btnHandler={() => {}}
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
        <Widget
          header="Test Header"
          body={<div>Test Content</div>}
          message="addRecipientChild"
          btnHandler={() => {}}
        />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
