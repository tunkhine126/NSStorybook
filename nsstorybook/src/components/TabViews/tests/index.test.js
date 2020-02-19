/**
 *
 * Tests for TabViews
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import TestingComponent from 'components/shared/Testing';

import TabViews from '../index';

describe('<TabViews />', () => {
  const props = {
    currentTabValue: 0,
    tabChange: () => {},
    data: {},
    tabValues: [],
    indexChange: () => {},
    tabViews: [<>Test Tab</>],
  };

  it('Expect no errors rending TabViews', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <TabViews {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <TabViews {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
