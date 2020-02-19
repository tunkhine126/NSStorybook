/**
 *
 * Tests for Header
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import TestingComponent from 'components/shared/Testing';

import Header from '../header';

describe('<Header />', () => {
  const props = {
    value: 0,
    tabValues: [],
    data: {},
    tabChange: () => {},
  };

  it('Expect no errors rending Header', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Header {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Header {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
