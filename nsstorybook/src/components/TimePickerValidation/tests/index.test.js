/**
 *
 * Tests for TimePickerValidation
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { required } from 'utils/validations';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form } from 'informed';

import TimePickerValidation from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('<TimePickerValidation />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TimePickerValidation
        field="test-time-picker"
        label="Test Date Picker"
        initialValue="05:05 PM"
        placeholder="08:00 AM"
        inputVariant="filled"
        margin="normal"
        onChange={() => {}}
        fullWidth
        clearable
        validate={required}
        validateOnChange
        validateOnBlur
      />
    );
    expect(spy).not.toHaveBeenCalled();
  });
  it('Should to render required', () => {
    const spy = jest.spyOn(global.console, 'error');
    const wrapper = mount(
      <Form
        id="test-form"
        getApi={formApi => {
          formApi.validate();
        }}
      >
        <TimePickerValidation
          field="time-picker"
          label="Test Date Picker"
          placeholder="08:00 AM"
          inputVariant="filled"
          margin="normal"
          onChange={() => {}}
          fullWidth
          clearable
          validate={required}
          validateOnChange
          validateOnBlur
        />
      </Form>
    );

    wrapper
      .find('input')
      .first()
      .simulate('change', {
        target: {
          value: '4',
        },
      });

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TimePickerValidation
        field="test-time-picker"
        label="Test Date Picker"
        initialValue="05:05 PM"
        placeholder="08:00 AM"
        inputVariant="filled"
        margin="normal"
        onChange={() => {}}
        fullWidth
        clearable
      />
    );
    expect(firstChild).toMatchSnapshot();
  });
});
