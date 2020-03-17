import React from 'react';
import TimePickerValidation from '../components/TimePickerValidation/index'


export default {
  title: 'Time Picker Validation',
  component: TimePickerValidation
}

export function TimePickerValidationContainer() {

  return (
    <div>
      <h3>Time Picker</h3>
      <TimePickerValidation />
    </div>
  )
}