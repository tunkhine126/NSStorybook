/**
 *
 * Tests for Alert
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Alert from '../index';

describe('<Alert />', () => {
  const props = {
    severity: 'info',
    color: 'info',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Alert {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Alert {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
});
