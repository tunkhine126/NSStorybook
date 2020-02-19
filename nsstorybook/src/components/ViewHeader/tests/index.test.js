/**
 *
 * Tests for ViewHeader
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import ViewHeader from '../index';

describe('<ViewHeader />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<ViewHeader component="Test" body={<div>New Component</div>} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<ViewHeader component="Test" body={<div>New Component</div>} />);
    expect(firstChild).toMatchSnapshot();
  });
});
