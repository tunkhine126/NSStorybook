import React from 'react'
import NSMultiSelect from '../components/NSMultiSelect/index'
import { action } from '@storybook/addon-actions';
import { required } from '../utils/validations';

export default {
  title: 'New Story Multi-Select',
  component: NSMultiSelect
}

export function NSMultiSelectContainer({
  label
}) {

const colors = ['red', 'green', 'blue'];
const items = [{ value: 'Yellow' }, { value: 'Orange' }, { value: 'Purple' }];

  return (
    <div>
      <h3>New Story Multi-Select</h3>
        <NSMultiSelect         
          values={{ item: [] }}
          items={colors}
          update={() => {}}
          label="message"/>
    </div>
  )
}