/**
 *
 * Tests for InputValidation
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { required } from 'utils/validations';
import InputValidation from '../index';

describe('<InputValidation />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <InputValidation
        field="test1"
        type="text"
        initialValue="test"
        onChange={() => {}}
        onBlur={() => {}}
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
      <InputValidation
        field="test2"
        type="text"
        initialValue="test"
        onChange={() => {}}
        onBlur={() => {}}
        validate={required}
        validateOnChange
        validateOnBlur
      />
    );
    expect(firstChild).toMatchSnapshot();
  });
});
