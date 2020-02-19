/**
 *
 * Tests for NSMenuItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import Add from '@material-ui/icons/Add';

import TestingComponent from 'components/shared/Testing';
import NSMenuItem from '../Loadable';

describe('<NSMenuItem />', () => {
  const text = 'Sample';
  const handleClick = () => {};

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSMenuItem icon={Add} text={text} handleItemClick={handleClick} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <NSMenuItem icon={Add} text={text} handleItemClick={handleClick} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
