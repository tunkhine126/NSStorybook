/**
 *
 * InlineToaster
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import clsx from 'clsx';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import globalMessage from 'messages';
import TextLink from '../TextLink';
import { InlineToasterWrapper, inlineToasterStyle } from './styles';

function InlineToaster({
  intl,
  className,
  message,
  handleUndo,
  variant,
  timer = 4500,
  clearToaster,
  showUndo = false,
  ...other
}) {
  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  const classes = inlineToasterStyle();
  const Icon = variantIcon[variant];
  const [show, setShow] = useState(true);
  const toasterDefault = state => ({ ...state, show: false });

  const timeout = setTimeout(() => {
    setShow(false);
    clearToaster(toasterDefault);
  }, timer);

  useEffect(() => () => {
    // Prevents memory leak
    setShow(false);
    clearTimeout(timeout);
    clearToaster(toasterDefault);
  });

  return show ? (
    <InlineToasterWrapper
      className="inline-toaster"
      onMouseEnter={() => {
        clearTimeout(timeout);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setShow(false);
          clearToaster(toasterDefault);
        }, timer);
      }}
    >
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="toaster"
        message={
          <span id="toaster" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={
          showUndo && (
            <TextLink
              content={intl.formatMessage(globalMessage.undo)}
              onClick={handleUndo}
              className={classes.undoBtn}
            />
          )
        }
        {...other}
      />
    </InlineToasterWrapper>
  ) : null;
}

InlineToaster.propTypes = {
  intl: intlShape.isRequired,
  clearToaster: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  className: PropTypes.string,
  message: PropTypes.string,
  handleUndo: PropTypes.func,
  timer: PropTypes.number,
  showUndo: PropTypes.bool,
};

const intlInlineToaster = injectIntl(InlineToaster);

export default intlInlineToaster;
