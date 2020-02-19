/**
 *
 * NSMultiSelect
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import colors from 'global-styles';
import { useNSMultiSelectStyle, styles } from './styles';
import PillClose from '../Icons/pillClose';

function NSMultiSelect({
  values,
  items,
  label,
  update,
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

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 215,
      },
    },
  };

  const ComponentStyle = styled.div`
    .MuiInputLabel-outlined.MuiInputLabel-shrink {
      transform: translate(${translate}) scale(0.75);
      color: ${colors.STATE.active};
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

  let localValues = [];

  if (values.item) {
    localValues = !Array.isArray(values.item)
      ? values.item.split(' ')
      : values.item;
  } else {
    localValues = values;
  }

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
          multiple
          value={localValues}
          onChange={update}
          onBlur={onBlur}
          className={className}
          classes={selectOverride}
          displayEmpty={placeholderText}
          input={
            <OutlinedInput
              name={labelFormatted}
              id={`${labelFormatted}-selector`}
            />
          }
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map((v, idx) => (
                <Chip
                  key={idx}
                  id={`${v.toLowerCase()}-chip`}
                  label={
                    <span className={classes.chipLabelContainer}>
                      <span>{v}</span>
                    </span>
                  }
                  onDelete={() => {
                    update(selected.filter(item => item !== v));
                  }}
                  deleteIcon={<PillClose className={classes.chipClearBtn} />}
                  color="primary"
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          inputProps={{
            classes: useNSMultiSelectStyle(outterWidth, outerHeight, padding)(),
          }}
          MenuProps={MenuProps}
        >
          {items.map((item, idx) => (
            <MenuItem key={idx} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ComponentStyle>
  );
}

NSMultiSelect.propTypes = {
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  items: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  placeholderText: PropTypes.bool,
  disableLabel: PropTypes.bool,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  outterWidth: PropTypes.string,
  outerHeight: PropTypes.string,
  padding: PropTypes.string,
  translate: PropTypes.string,
  selectOverride: PropTypes.object,
};

export default NSMultiSelect;
