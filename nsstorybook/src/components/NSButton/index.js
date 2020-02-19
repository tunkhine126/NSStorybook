/**
 *
 * NSButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

import { NSButtonStyles, btnLinkStyles } from './styles';

function NSButton({
  children,
  componentClasses,
  version,
  textBtn,
  deleteLink,
  ...rest
}) {
  const classes = NSButtonStyles();
  const danger = version === 3 ? classes.negative : classes.primary;
  const type = version === 2 ? classes.secondary : danger;

  return (
    <Button
      className={clsx(classes.btn, type, componentClasses)}
      classes={textBtn ? btnLinkStyles(deleteLink)() : null}
      {...rest}
    >
      {children}
    </Button>
  );
}

NSButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  componentClasses: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  version: PropTypes.number,
  textBtn: PropTypes.bool,
  deleteLink: PropTypes.bool,
};
export default NSButton;