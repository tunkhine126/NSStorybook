/**
 *
 * InputValidation
 *
 */

import React from 'react';
import clsx from 'clsx';
import { asField } from 'informed';
import NSInput from 'components/shared/NSInput';
import { inputStyles } from 'global-styles';
import { styles } from './styles';

const InputValidation = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const {
    onChange,
    onBlur,
    field,
    customClass,
    maxWidth = '400px',
    ...rest
  } = props;
  const classes = styles(maxWidth)();
  const globalClasses = inputStyles(fieldState.error)();

  // These two props are not native and are not needed
  delete rest.forwardedRef;
  delete rest.debug;

  return (
    <>
      <NSInput
        {...rest}
        value={!value && value !== 0 ? '' : value}
        id={field}
        name={field}
        margin="normal"
        variant="filled"
        className={clsx(classes.input, globalClasses.root, customClass)}
        onChange={e => {
          setValue(e.target.value);
          if (onChange) {
            onChange(e.target.value, field, fieldApi);
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
        <small className={globalClasses.error}>{fieldState.error}</small>
      ) : null}
    </>
  );
});

export default InputValidation;
