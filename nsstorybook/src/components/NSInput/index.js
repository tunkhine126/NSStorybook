/**
 *
 * NSInput
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { useNSInput, ComponentStyle } from './styles';

function NSInput({ icon: Icon, position, ...rest }) {
  const classes = useNSInput();
  let textField;

  if (Icon) {
    textField = (
      <TextField
        InputProps={{
          classes,
          disableUnderline: true,
          [`${position}Adornment`]: (
            <InputAdornment position={position}>
              <Icon />
            </InputAdornment>
          ),
        }}
        {...rest}
      />
    );
  } else {
    textField = (
      <TextField
        InputProps={{
          classes,
          disableUnderline: true,
        }}
        {...rest}
      />
    );
  }
  return <ComponentStyle>{textField}</ComponentStyle>;
}

NSInput.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object,
  ]),
  position: PropTypes.oneOf(['start', 'end']),
};

export default NSInput;
