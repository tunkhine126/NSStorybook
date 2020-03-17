import React from 'react';
import SelectValidation from '../components/SelectValidation/index'
import { required } from '../utils/validations';

export default {
  title: 'Select Validation',
  component: SelectValidation
}

export function SelectValidationContainer() {

const values = { item: 'No' };
const items = [{ value: 'Yes' }, { value: 'No' }];

  return (
    <div>
      <h3>Example Select Validation</h3>
      <SelectValidation 
        field="test-validation"
        type="select"
        label="Example Selector"
        values={values}
        items={items}
        onChange={() => {}}
        initialValue="No"
        padding="25px 18px 10px 13px"
        validate={required}
        validateOnChange
        validateOnBlur
      />
    </div>
  )
}