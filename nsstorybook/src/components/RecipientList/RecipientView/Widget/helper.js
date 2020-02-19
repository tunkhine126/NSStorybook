/* eslint-disable no-restricted-syntax */
/* eslint-disable react/display-name */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import InputValidation from 'components/shared/InputValidation';
import DatePickerValidation from 'components/shared/DatePickerValidation';
import TimePickerValidation from 'components/shared/TimePickerValidation';
import SelectValidation from 'components/shared/SelectValidation';
import MultiSelectValidation from 'components/shared/MultiSelectValidation';
import Photo from './fieldTypes/photo';

import { SelectWrapper } from '../../styles';
import { FieldsProvider } from '../context/fields';
import SwitchMode from './switchMode';

export const ftSwitch = (
  field,
  { customFields, uuid },
  key,
  rData,
  handleOptionChange,
  handleDateTimeChange,
  updateRecipient
) => {
  let optionValues = [];
  let optionIntialValue = {};
  let optionIsNull = false;
  const enLabel = field.contexts.us_en.label;

  if (field.option_values) {
    optionValues = field.option_values.map(i => ({ value: i }));

    if (!rData.currentValue[field.name].item) {
      optionIsNull = true;
    }

    optionIntialValue = !optionIsNull
      ? rData.currentValue[field.name].item
      : optionValues[0].value;
  }

  const Field = ({
    classes,
    label,
    name,
    content,
    element,
    fieldType,
    type,
  }) => (
    <FieldsProvider type={type}>
      <SwitchMode
        classes={classes}
        rData={rData}
        field={field}
        uuid={uuid}
        fieldType={fieldType}
        handleDateTimeChange={handleDateTimeChange}
        handleOptionChange={handleOptionChange}
        updateRecipient={updateRecipient}
        label={label}
        currentField={name}
        content={content}
        element={element}
      />
    </FieldsProvider>
  );

  Field.propTypes = {
    classes: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    element: PropTypes.any.isRequired,
    content: PropTypes.any,
    fieldType: PropTypes.string,
    type: PropTypes.string,
  };

  switch (field.field_type) {
    case 'short_text':
      return (
        <Field
          key={key}
          classes="field-container"
          label={enLabel}
          name={field.name}
          content={customFields[field.name]}
          element={
            <InputValidation
              maxWidth="none"
              field={field.name}
              type="text"
              initialValue={customFields[field.name]}
              label={enLabel}
            />
          }
        />
      );
    case 'paragraph_text':
      return (
        <Field
          key={key}
          classes="paragraph-text field-container"
          label={enLabel}
          name={field.name}
          content={customFields[field.name]}
          element={
            <InputValidation
              field={field.name}
              maxWidth="none"
              type="text"
              multiline
              rows="3"
              initialValue={customFields[field.name]}
              label={enLabel}
            />
          }
        />
      );
    case 'number':
      return (
        <Field
          key={key}
          classes="field-container"
          label={enLabel}
          name={field.name}
          content={
            customFields[field.name] ? customFields[field.name].toString() : ''
          }
          element={
            <InputValidation
              type="number"
              maxWidth="none"
              field={field.name}
              initialValue={
                customFields[field.name]
                  ? customFields[field.name].toString()
                  : ''
              }
              label={enLabel}
            />
          }
        />
      );
    case 'date':
      return (
        <Field
          key={key}
          classes="field-container"
          label={enLabel}
          name={field.name}
          content={rData.dates[field.name]}
          element={
            <DatePickerValidation
              field={field.name}
              label={enLabel}
              initialValue={rData.dates[field.name]}
              customFormat="MM-dd-yyyy"
              placeholder={`${moment().format('MM-DD-YYYY')}`}
              variant="dialog"
              inputVariant="filled"
              margin="normal"
              fullWidth
              clearable
              disableFuture
            />
          }
        />
      );
    case 'time':
      return (
        <Field
          key={key}
          classes="field-container"
          label={enLabel}
          name={field.name}
          content={
            rData.times[field.name]
              ? moment(new Date(rData.times[field.name])).format('hh:mm a')
              : null
          }
          fieldType="time"
          element={
            <TimePickerValidation
              field={field.name}
              label={enLabel}
              initialValue={rData.times[field.name]}
              placeholder="08:00 AM"
              inputVariant="filled"
              margin="normal"
              fullWidth
              clearable
            />
          }
        />
      );
    case 'single_select':
      return (
        <Field
          key={key}
          classes="field-container"
          label={enLabel}
          name={field.name}
          content={customFields[field.name]}
          element={(localChildData, localOptionChange) => (
            <SelectWrapper>
              <SelectValidation
                field={field.name}
                type="select"
                maxWidth="none"
                label={enLabel}
                values={
                  !optionIsNull
                    ? localChildData.currentValue[field.name]
                    : optionIntialValue
                }
                initialValue={optionIntialValue}
                items={optionValues}
                onChange={v => localOptionChange(v, field.name)}
                padding="25px 18px 10px 13px"
              />
            </SelectWrapper>
          )}
        />
      );
    case 'multi_select':
      return (
        <Field
          key={key}
          classes="field-container"
          label={enLabel}
          name={field.name}
          content={
            Array.isArray(customFields[field.name])
              ? customFields[field.name].join(', ')
              : customFields[field.name]
          }
          element={(localChildData, localOptionChange) => (
            <SelectWrapper>
              <MultiSelectValidation
                field={field.name}
                type="select"
                maxWidth="none"
                label={enLabel}
                values={
                  !optionIsNull
                    ? localChildData.currentValue[field.name]
                    : optionIntialValue
                }
                initialValue={optionIntialValue}
                onChange={v => localOptionChange(v, field.name)}
                items={optionValues}
                padding="25px 18px 10px 13px"
              />
            </SelectWrapper>
          )}
        />
      );
    case 'likert':
      return (
        <Field
          key={key}
          classes="field-container"
          label={enLabel}
          name={field.name}
          content={customFields[field.name]}
          element={(localChildData, localOptionChange) => (
            <SelectWrapper>
              <SelectValidation
                field={field.name}
                type="select"
                maxWidth="none"
                label={enLabel}
                values={
                  !optionIsNull
                    ? localChildData.currentValue[field.name]
                    : optionIntialValue
                }
                initialValue={optionIntialValue}
                items={optionValues}
                onChange={v => localOptionChange(v, field.name)}
                padding="25px 18px 10px 13px"
              />
            </SelectWrapper>
          )}
        />
      );
    case 'photo':
      return (
        <Field
          type="photo"
          key={key}
          classes="field-container"
          label={enLabel}
          name={field.name}
          content={
            <Photo
              field={field}
              label={enLabel}
              values={customFields}
              recipientData={rData}
            />
          }
          element={
            <Photo
              className="photo-edit-mode"
              rData={rData}
              editMode
              field={field}
              label={enLabel}
              values={customFields}
              recipientData={rData}
            />
          }
        />
      );
    case 'audio':
      return 'audio';
    case 'video':
      return 'video';
    case 'coordinates':
      return (
        <Field
          key={key}
          classes="field-container"
          label={enLabel}
          name={field.name}
          content={customFields[field.name]}
          element={
            <InputValidation
              maxWidth="none"
              field={field.name}
              type="text"
              initialValue={customFields[field.name]}
              label={enLabel}
            />
          }
        />
      );
    default:
      return null;
  }
};
