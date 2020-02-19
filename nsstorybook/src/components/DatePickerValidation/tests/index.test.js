/**
 *
 * Tests for DatePickerValidation
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { required } from 'utils/validations';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TestingComponent from 'components/shared/Testing';
import DatePickerValidation from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('<DatePickerValidation />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <DatePickerValidation
        field="test-date-picker"
        type="text"
        label="Test Date Picker"
        customFormat="MM-dd-yyyy"
        variant="inline"
        inputVariant="filled"
        margin="normal"
        onChange={() => {}}
        validate={required}
        fullWidth
        disableToolbar
        disableFuture
        autoOk
        validateOnChange
        validateOnBlur
      />
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should change the date', () => {
    const spy = jest.spyOn(global.console, 'error');

    const wrapper = mount(
      <DatePickerValidation
        field="test-date-picker"
        type="text"
        label="Test Date Picker"
        customFormat="MM-dd-yyyy"
        variant="inline"
        inputVariant="filled"
        margin="normal"
        onChange={() => {}}
        initialValue="2019-11-01"
        validate={required}
        fullWidth
        disableToolbar
        disableFuture
        autoOk
        validateOnChange
        validateOnBlur
      />
    );

    const datePicker = wrapper.find('input[value="11-01-2019"]').first();

    datePicker.simulate('change', {
      target: {
        value: 'Tue Oct 08 2019 00:00:00 GMT-0400 (Eastern Daylight Time)',
      },
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should change the date to null', () => {
    const spy = jest.spyOn(global.console, 'error');

    const wrapper = mount(
      <TestingComponent>
        <DatePickerValidation
          field="test-date-picker2"
          type="text"
          label="Test Date Picker2"
          customFormat="MM-dd-yyyy"
          variant="inline"
          inputVariant="filled"
          margin="normal"
          onChange={() => {}}
          initialValue="2019-11-02"
          validate={required}
          fullWidth
          disableToolbar
          disableFuture
          autoOk
          validateOnChange
          validateOnBlur
        />
      </TestingComponent>
    );

    const datePicker2 = wrapper.find('input[value="11-02-2019"]').first();

    datePicker2.simulate('change', {
      target: {
        value: '',
      },
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should change the date to an invalid date', () => {
    const spy = jest.spyOn(global.console, 'error');

    const wrapper = mount(
      <TestingComponent>
        <DatePickerValidation
          field="test-date-picker3"
          type="text"
          label="Test Date Picker3"
          customFormat="MM-dd-yyyy"
          variant="inline"
          inputVariant="filled"
          margin="normal"
          onChange={() => {}}
          initialValue="2019-11-03"
          validate={required}
          fullWidth
          disableToolbar
          disableFuture
          autoOk
          validateOnChange
          validateOnBlur
        />
      </TestingComponent>
    );

    const datePicker3 = wrapper.find('input[value="11-03-2019"]').first();

    datePicker3.simulate('change', {
      target: {
        value: '10',
      },
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <DatePickerValidation
        field="test-date-picker"
        type="text"
        label="Test Date Picker"
        customFormat="MM-dd-yyyy"
        variant="inline"
        inputVariant="filled"
        margin="normal"
        onChange={() => {}}
        initialValue="2019-11-01"
        validate={required}
        fullWidth
        disableToolbar
        disableFuture
        autoOk
        validateOnChange
        validateOnBlur
      />
    );
    expect(firstChild).toMatchSnapshot();
  });
});
