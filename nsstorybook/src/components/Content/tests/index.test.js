/**
 *
 * Tests for Content
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Content from '../Loadable';

const FakeComponent = () => <span>Test Component</span>;

describe('<Content />', () => {
  const screen = {
    header: {
      xs: 5,
    },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Content
        subHeader={<FakeComponent />}
        body={<FakeComponent />}
        containerClass="container"
        headerClass="header"
        screen={screen}
      />
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Content
        subHeader={<FakeComponent />}
        body={<FakeComponent />}
        containerClass="container"
        headerClass="header"
        screen={screen}
      />
    );
    expect(firstChild).toMatchSnapshot();
  });
});
