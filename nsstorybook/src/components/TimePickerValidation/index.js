/**
 *
 * TimePickerValidation
 *
 */

import React from 'react';
import { asField } from 'informed';
import clsx from 'clsx';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { inputStyles, DatePickerStyle } from 'global-styles';

export const TimePickerValidation = asField(
  ({ fieldApi, fieldState, ...props }) => {
    const classes = inputStyles(fieldState.error)();
    const { value } = fieldState;
    const { setValue, setError, setTouched, reset } = fieldApi;
    const { onChange, customClass, onBlur, ...rest } = props;
    const timePickerClasses = DatePickerStyle(fieldState.error)();

    return (
      <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            {...rest}
            mask="__:__ _M"
            value={value || null}
            classes={timePickerClasses}
            className={clsx(customClass, 'validation-input', {
              [classes.inputError]: fieldState.error,
            })}
            onChange={date => {
              if (moment(new Date(date)).isValid() || !date) {
                reset();

                if (date === null) {
                  setValue(null);
                } else {
                  setValue(moment(new Date(date)).toLocaleString());
                }

                if (onChange) {
                  onChange(moment(new Date(date)).toLocaleString());
                }
              } else {
                setError('Invalid Time');
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

export default TimePickerValidation;
