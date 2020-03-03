/**
 *
 * Tests for NewPassword
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form } from 'informed';

import TestingComponent from 'components/shared/Testing';
import NewPassword from '../newPassword';

Enzyme.configure({ adapter: new Adapter() });

describe('<NewPassword />', () => {
  it('Simulate Password change', () => {
    const spy = jest.spyOn(global.console, 'error');

    const newValue = 'test';
    const wrapper = mount(
      <TestingComponent>
        <Form id="test-form">
          <NewPassword />
        </Form>
      </TestingComponent>
    );
    const password = wrapper.find('input').first();
    const passwordConfirm = wrapper.find('input').at(1);

    password.simulate('change', { target: { value: newValue } });
    password.simulate('change', { target: { value: 'Testing12345' } });
    passwordConfirm.simulate('change', { target: { value: 'Testing12345' } });

    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NewPassword />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <NewPassword />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
