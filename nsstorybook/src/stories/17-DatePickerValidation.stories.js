import React from 'react'
import DatePickerValidation from '../components/DatePickerValidation/index'
import { required } from '../utils/validations';

export default {
  title: 'Date Picker Validation',
  component: DatePickerValidation
}

export function DatePicker() {

  return (
    <div>
      <h3>Date Picker Validation</h3>
        <DatePickerValidation 
          field="test-date-picker"
          type="text"
          label="Date Picker"
          customFormat="MM-dd-yyyy"
          variant="inline"
          inputVariant="filled"
          margin="normal"
          onChange={() => {}}
          validate={required}
          disableToolbar
          disableFuture
          autoOk
          validateOnChange
          validateOnBlur
        />
    </div>
  )
}