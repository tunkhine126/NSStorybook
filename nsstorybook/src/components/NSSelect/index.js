/**
 *
 * NSSelect
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import colors from 'global-styles';
import { styles, useNSSelectStyle } from './styles';

function NSSelect({
  values,
  items,
  label,
  update,
  code = 'value',
  value = 'value',
  infoKey,
  width,
  maxWidth = '400px',
  outterWidth,
  outerHeight,
  padding,
  disableLabel,
  selectOverride,
  placeholderText,
  required = false,
  translate = '14px, 10px',
  className,
  onBlur = () => {},
}) {
  const classes = styles(width, maxWidth)();
  const labelFormatted = label.replace(/ /g, '-').toLowerCase();

  const menuItems = items.map(item => {
    if (item[infoKey]) {
      return (
        <MenuItem key={item[code]} value={item[code]}>
          {item[value]}
          <strong className={classes.infoKey}>({item[infoKey]})</strong>
        </MenuItem>
      );
    }
    return (
      <MenuItem key={item[code]} value={item[code]}>
        {item[value]}
      </MenuItem>
    );
  });

  const ComponentStyle = styled.div`
    .MuiInputLabel-outlined.MuiInputLabel-shrink {
      transform: translate(${translate}) scale(0.75);
    }
    .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.STATE.active};
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.INTERFACE.ui4};
    }
    .MuiSvgIcon-root {
      color: ${colors.TEXT.light};
    }
    .MuiInputLabel-outlined {
      color: ${colors.TEXT.light};
      width: 77%;
    }
    .MuiOutlinedInput-root {
      padding: 1px;
    }
    .MuiInputLabel-outlined {
      ${disableLabel ? 'display: none;' : ''}
    }
  `;

  return (
    <ComponentStyle>
      <FormControl
        variant="outlined"
        className={classes.size}
        required={required}
      >
        {!placeholderText && (
          <InputLabel htmlFor={`${labelFormatted}-selector`}>
            {label}
          </InputLabel>
        )}
        <Select
          value={values.item || values}
          onChange={update}
          onBlur={onBlur}
          classes={selectOverride}
          className={className}
          displayEmpty={placeholderText}
          inputProps={{
            classes: useNSSelectStyle(outterWidth, outerHeight, padding)(),
          }}
          input={
            <OutlinedInput
              name={labelFormatted}
              id={`${labelFormatted}-selector`}
            />
          }
        >
          {placeholderText && <MenuItem value="">{label}</MenuItem>}
          {menuItems}
        </Select>
      </FormControl>
    </ComponentStyle>
  );
}

NSSelect.propTypes = {
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  items: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  code: PropTypes.string,
  value: PropTypes.string,
  placeholderText: PropTypes.bool,
  disableLabel: PropTypes.bool,
  infoKey: PropTypes.string,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  outterWidth: PropTypes.string,
  outerHeight: PropTypes.string,
  padding: PropTypes.string,
  translate: PropTypes.string,
  selectOverride: PropTypes.object,
};

export default NSSelect;
