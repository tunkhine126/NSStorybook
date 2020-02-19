/**
 *
 * Tests for MultiSelectValidation
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { required } from 'utils/validations';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MultiSelectValidation from '../index';

Enzyme.configure({ adapter: new Adapter() });

const values = { item: ['red'] };
const items = [{ value: 'blue' }, { value: 'red' }, { value: 'green' }];

describe('<MultiSelectValidation />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <MultiSelectValidation
        field="test-validation"
        type="select"
        label="Test Selector"
        values={values}
        items={items}
        onChange={() => {}}
        initialValue={['blue']}
        padding="25px 18px 10px 13px"
        validate={required}
        validateOnChange
        validateOnBlur
      />
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should remove the first option via the pill', () => {
    const spy = jest.spyOn(global.console, 'error');

    const wrapper = mount(
      <MultiSelectValidation
        field="test-validation"
        type="select"
        label="message"
        values={values}
        items={items}
        onChange={() => {}}
        initialValue={['red']}
        padding="25px 18px 10px 13px"
        validate={required}
        validateOnChange
        validateOnBlur
      />
    );

    const select = wrapper.find('#red-chip').first();
    select.simulate('click');

    const redPillCloseBtn = wrapper.find('#red-chip svg').first();

    redPillCloseBtn.simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <MultiSelectValidation
        field="test-validation"
        type="select"
        label="Test Selector"
        values={values}
        items={items}
        onChange={() => {}}
        initialValue={['blue']}
        padding="25px 18px 10px 13px"
        validate={required}
        validateOnChange
        validateOnBlur
      />
    );
    expect(firstChild).toMatchSnapshot();
  });
});
