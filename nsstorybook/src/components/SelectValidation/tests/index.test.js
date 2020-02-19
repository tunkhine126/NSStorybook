/**
 *
 * Tests for SelectValidation
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import { required } from 'utils/validations';
import SelectValidation from '../index';

const values = { item: 'No' };
const items = [{ value: 'Yes' }, { value: 'No' }];

describe('<SelectValidation />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <SelectValidation
        field="test-validation"
        type="select"
        label="Test Selector"
        values={values}
        items={items}
        onChange={() => {}}
        initialValue="No"
        padding="25px 18px 10px 13px"
        validate={required}
        validateOnChange
        validateOnBlur
      />
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <SelectValidation
        field="test-validation"
        type="select"
        label="Test Selector"
        values={values}
        items={items}
        onChange={() => {}}
        initialValue="No"
        padding="25px 18px 10px 13px"
        validate={required}
        validateOnChange
        validateOnBlur
      />
    );
    expect(firstChild).toMatchSnapshot();
  });
});
