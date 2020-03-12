import React from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom'
import InputValidation from '../components/InputValidation'
import { required } from '../utils/validations';
import Search from '@material-ui/icons/Search';
import Lock from '@material-ui/icons/Lock';

export default {
  title: 'Input validation',
  component: InputValidation
}

export function InputValidationContainer(){

  return(
    <BrowserRouter>
      <h3>Input field requiring validation</h3>
        <p>
          <InputValidation 
            field="name"
            type="text"
            initialValue="Disabled form field"
            variant="filled"
            onChange={action("Text changes")}
            onBlur={() => {}}
            position="end"
            icon={Lock}
            validateOnChange
            validateOnBlur
            disabled
          />
        </p>
        <p>
          <InputValidation
            field="name"
            type="search"
            placeholder="Type something here"
            onChange={action("Text changes")}
            onBlur={() => {}}
            variant="filled"
            position="end"
            icon={Search}
            validate={required}
            validateOnChange
            validateOnBlur
            />
        </p>
        <p>
          <InputValidation
            field="currentPassword"
            type="password"
            validate={required}
            placeholder="A multi-line input field"
            multiline
            rows="3"
            validateOnChange
            validateOnBlur
            notify={['passwordConfirmation']}
            />
        </p>
    </BrowserRouter>
  )
}