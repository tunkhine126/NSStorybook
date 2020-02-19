/**
 *
 * DatePickerValidation
 *
 */

import React from 'react';
import { asField } from 'informed';
import moment from 'moment';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { inputStyles, DatePickerStyle } from 'global-styles';

export const DatePickerValidation = asField(
  ({ fieldApi, fieldState, ...props }) => {
    const classes = inputStyles(fieldState.error)();
    const { value } = fieldState;
    const { setValue, setError, setTouched, reset } = fieldApi;
    const { onChange, customFormat, customClass, onBlur, ...rest } = props;
    const datePickerClasses = DatePickerStyle(fieldState.error)();

    return (
      <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            {...rest}
            value={value ? moment(value) : null}
            format={customFormat}
            classes={datePickerClasses}
            className={clsx(customClass, 'validation-input', {
              [classes.inputError]: fieldState.error,
            })}
            onError={message => {
              if (message) {
                reset();
                setError(message);
              }
            }}
            onChange={date => {
              if (moment(date).isValid() || !date) {
                if (date === null) {
                  setValue(null);
                } else {
                  setValue(moment(date).format('YYYY-MM-DD'));
                }

                if (onChange) {
                  onChange(date);
                }
              } else {
                setError('Invalid Date');
              }
            }}
            onBlur={date => {
              setTouched(true);
              if (onBlur) {
                onBlur(date);
              }
            }}
          />
        </MuiPickersUtilsProvider>

        {fieldState.error ? (
          <small className={classes.error}>{fieldState.error}</small>
        ) : null}
      </>
    );
  }
);

export default DatePickerValidation;
