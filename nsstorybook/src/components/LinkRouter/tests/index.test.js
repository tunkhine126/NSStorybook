/**
 *
 * Tests for LinkRouter
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { ROUTES } from 'utils/globalConstants';

import LinkRouter from '../index';

describe('<LinkRouter />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <LinkRouter color="inherit" to={ROUTES.dashboard.path}>
          Dashboard
        </LinkRouter>
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <MemoryRouter>
        <LinkRouter color="inherit" to={ROUTES.dashboard.path}>
          Dashboard
        </LinkRouter>
      </MemoryRouter>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
