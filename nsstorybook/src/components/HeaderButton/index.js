/**
 *
 * HeaderButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import SolidDownArrow from '../Icons/solidDownArrow';
import { headerButtonStyles, SelectBtnStyle } from './styles';

function HeaderButton({
  version,
  children,
  bgColor,
  padding,
  menu,
  click,
  ...rest
}) {
  const classes = headerButtonStyles(bgColor, padding)();
  let element;

  switch (version) {
    case 1:
      element = (
        <Button
          variant="contained"
          size="medium"
          className={clsx(classes.btn)}
          {...rest}
        >
          {children}
        </Button>
      );
      break;
    case 2:
      element = (
        <Button className={clsx(classes.moreBtn)} {...rest}>
          {children}
        </Button>
      );
      break;
    case 3:
      element = (
        <SelectBtnStyle>
          <Input
            {...rest}
            disableUnderline
            className={clsx(classes.customInput, 'header-button')}
          />
        </SelectBtnStyle>
      );
      break;
    case 4:
      element = (
        <>
          <Button
            variant="contained"
            className={clsx(classes.btn, classes.dropDown)}
            aria-controls="saved-views"
            aria-haspopup="true"
            onClick={click}
          >
            {children}
            <SolidDownArrow className={classes.downArrow} />
          </Button>
          {menu}
        </>
      );
      break;
    default:
      element = null;
  }

  return element;
}

HeaderButton.propTypes = {
  version: PropTypes.number.isRequired,
  click: PropTypes.func,
  menu: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  bgColor: PropTypes.string,
  padding: PropTypes.string,
};
export default HeaderButton;
