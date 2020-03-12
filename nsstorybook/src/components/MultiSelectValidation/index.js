/**
 *
 * MultiSelectValidation
 *
 */

import React from 'react';
import { asField } from 'informed';
import clsx from 'clsx';

import { inputStyles, SelectStyle } from '../../global-styles';
import NSMultiSelect from '../NSMultiSelect/index';

export const MultiSelectValidation = asField(
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
        <NSMultiSelect
          {...rest}
          className={clsx(customClass, globalClasses.root)}
          values={!value && value !== 0 ? { item: [] } : value}
          update={e => {
            if (e.target) {
              setValue(e.target.value);
              if (onChange) {
                onChange(e.target.value);
              }
            } else {
              setValue(e);
              if (onChange) {
                onChange(e);
              }
            }
          }}
          onBlur={e => {
            setTouched(true);
            if (onBlur) {
              onBlur(e);
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

export default MultiSelectValidation;
