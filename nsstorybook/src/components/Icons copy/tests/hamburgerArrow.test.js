/**
 *
 * Tests for HamburgerArrow
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import HamburgerArrow from '../hamburgerArrow';

describe('<HamburgerArrow />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <HamburgerArrow sideNavOpen classes={{ openMenu: 'test' }} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <HamburgerArrow sideNavOpen={false} classes={{ openMenu: 'test' }} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
