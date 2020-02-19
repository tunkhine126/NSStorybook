/**
 *
 * Tests for HeaderButton
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import HeaderButton from '../index';

describe('<HeaderButton />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <HeaderButton version={1}>Sample</HeaderButton>
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Load Version 2, Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <HeaderButton version={2}>Sample</HeaderButton>
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Load Version 3, Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <HeaderButton version={3}>Sample</HeaderButton>
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Load Version 4, Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <HeaderButton version={4}>Sample</HeaderButton>
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Load invalid version, Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MemoryRouter>
        <HeaderButton version={10}>Sample</HeaderButton>
      </MemoryRouter>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <MemoryRouter>
        <HeaderButton version={1}>Sample</HeaderButton>
      </MemoryRouter>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
