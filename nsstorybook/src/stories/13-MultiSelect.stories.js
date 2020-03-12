import React from 'react';
import { action } from '@storybook/addon-actions';
import MultiSelectValidation from '../components/MultiSelectValidation/index'
import { required } from '../utils/validations';

export default {
  title: 'Multi Select Validation',
  component: MultiSelectValidation
}

export function MultiSelect() {

  const values = { item: ['red'] };
  const items = [{ value: 'Home' }, { value: 'Donation' }, { value: 'Family' }];

  return (
    <div>
      <h3>Multi Select Example</h3>
      <MultiSelectValidation 
        field="test-validation"
        type="select"
        label="Example Selector"
        values={values}
        items={items}
        onChange={action('Selected')}
        initialValue={[]}
        padding="25px 18px 10px 13px"
        validate={required}
        validateOnChange
        validateOnBlur
      />
    </div>
  )
}