/**
 *
 * NSFields
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePickerValidation from 'components/shared/DatePickerValidation';
import TimePickerValidation from 'components/shared/TimePickerValidation';
import SelectValidation from 'components/shared/SelectValidation';
import MultiSelectValidation from 'components/shared/MultiSelectValidation';
import InputValidation from 'components/shared/InputValidation';
import Photo from './photo';

import { SelectWrapper } from './styles';

function NSFields({
  field,
  fieldType,
  label,
  initialValue,
  showPrefix = false,
  icon,
  position,
  values = {},
  options = [],
  onchange = () => {},
  ...rest
}) {
  let preFixAttr = {};

  if (showPrefix) {
    preFixAttr = {
      position,
      icon,
    };
  }

  switch (fieldType) {
    case 'short_text':
      return (
        <InputValidation
          field={field}
          label={label}
          initialValue={initialValue}
          type="text"
          maxWidth="none"
          {...preFixAttr}
          {...rest}
        />
      );
    case 'paragraph_text':
      return (
        <InputValidation
          field={field}
          label={label}
          initialValue={initialValue}
          multiline
          type="text"
          maxWidth="none"
          rows="3"
          {...rest}
        />
      );
    case 'number':
      return (
        <InputValidation
          field={field}
          label={label}
          initialValue={initialValue}
          {...preFixAttr}
          type="number"
          maxWidth="none"
          {...rest}
        />
      );
    case 'date':
      return (
        <DatePickerValidation
          field={field}
          label={label}
          initialValue={initialValue}
          fullWidth
          clearable
          disableFuture
          customFormat="MM-dd-yyyy"
          placeholder={`${moment().format('MM-DD-YYYY')}`}
          variant="dialog"
          inputVariant="filled"
          margin="normal"
          {...rest}
        />
      );
    case 'time':
      return (
        <TimePickerValidation
          field={field}
          label={label}
          initialValue={initialValue}
          fullWidth
          clearable
          placeholder="08:00 AM"
          inputVariant="filled"
          margin="normal"
          {...rest}
        />
      );
    case 'single_select':
      return (
        <SelectWrapper>
          <SelectValidation
            field={field}
            label={label}
            initialValue={initialValue}
            values={values}
            items={options}
            onChange={onchange}
            type="select"
            maxWidth="none"
            padding="25px 18px 10px 13px"
            {...rest}
          />
        </SelectWrapper>
      );
    case 'multi_select':
      return (
        <SelectWrapper>
          <MultiSelectValidation
            field={field}
            label={label}
            initialValue={initialValue}
            values={values}
            onChange={onchange}
            items={options}
            type="select"
            maxWidth="none"
            padding="25px 18px 10px 13px"
            {...rest}
          />
        </SelectWrapper>
      );
    case 'likert':
      return (
        <SelectWrapper>
          <SelectValidation
            field={field}
            label={label}
            initialValue={initialValue}
            values={values}
            items={options}
            onChange={onchange}
            type="select"
            maxWidth="none"
            padding="25px 18px 10px 13px"
            {...rest}
          />
        </SelectWrapper>
      );
    case 'photo':
      return (
        <Photo
          field={field}
          initialValue={initialValue}
          label={label}
          {...rest}
        />
      );
    case 'audio':
      return 'audio';
    case 'video':
      return 'video';
    case 'coordinates':
      return (
        <InputValidation
          field={field}
          label={label}
          initialValue={initialValue}
          maxWidth="none"
          type="text"
          {...rest}
        />
      );
    default:
      return null;
  }
}

NSFields.propTypes = {
  field: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  position: PropTypes.string,
  showPrefix: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  values: PropTypes.object,
  options: PropTypes.array,
  onchange: PropTypes.func,
};

export default NSFields;
