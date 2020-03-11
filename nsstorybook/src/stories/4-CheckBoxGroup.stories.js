import React from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';
import CustomCheckBox from '../components/Icons/customCheckbox';
import CheckboxChecked from '../components/Icons/checkboxChecked';
import IntermediateCheckbox from '../components/Icons/intermediateCheckbox'

export default {
  title: 'Checkbox Icons',
  component: Checkbox,
};

export function CheckBoxContainer(){

  return (
    <BrowserRouter>
      <h4>Standard</h4>
        <Checkbox onClick={action("I've been checked")} />
      <h4>Disabled</h4>
        &nbsp; <CustomCheckBox />
      <h4>Intermediate</h4>
        &nbsp; <IntermediateCheckbox />
      <h4>Checked</h4>   
        &nbsp; <CheckboxChecked /> 
    </BrowserRouter>
  );
}
