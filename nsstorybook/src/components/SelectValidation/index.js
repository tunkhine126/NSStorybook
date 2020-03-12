/**
 *
 * SelectValidation
 *
 */

import React from 'react';
import { asField } from 'informed';
import clsx from 'clsx';

import { inputStyles, SelectStyle } from '../../global-styles';
import NSSelect from '../NSSelect/index';

export const SelectValidation = asField(
  ({ fieldApi, fieldState, ...props }) => {
    const classes = inputStyles(fieldState.error)();
    const globalClasses = SelectStyle(fieldState.error)();
    const { value } = fieldState;
    const { setValue, setTouched } = fieldApi;
    const { onChange, customClass, onBlur, ...rest } = props;
    // These two props are not native and are not needed
    delete rest.forwardedRef;
    delete rest.debug;

    return (
      <>
        <NSSelect
          {...rest}
          className={clsx(customClass, globalClasses.root)}
          values={!value && value !== 0 ? '' : value}
          update={e => {
            setValue(e.target.value);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          onBlur={e => {
            setTouched(true);
            if (onBlur) {
              onBlur(e.target.value);
            }
          }}
        />

        {fieldState.error ? (
          <small className={classes.error}>{fieldState.error}</small>
        ) : null}
      </>
    );
  }
);

export default SelectValidation;
