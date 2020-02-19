/**
 *
 * Notification
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';

import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { makeStyles } from '@material-ui/core/styles';

const notificationStyles = makeStyles(() => ({
  margin: {
    marginRight: '10px',
  },
}));

function Notification({
  status,
  message,
  classes,
  messageHandler,
  duration,
  position,
  type,
}) {
  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  const Icon = variantIcon[type];
  const notifyClass = notificationStyles();

  if (!type) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: position.vertical,
        horizontal: position.horizontal,
      }}
      open={status}
      autoHideDuration={duration}
      onClose={messageHandler}
    >
      <SnackbarContent
        className={clsx(classes[type])}
        aria-describedby={`${type}-snackbar`}
        open={false}
        message={
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            id={`${type}-snackbar`}
            className={classes.message}
          >
            <Icon
              className={clsx(
                classes.icon,
                classes.iconVariant,
                notifyClass.margin
              )}
            />
            {message}
          </Grid>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={messageHandler}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

Notification.propTypes = {
  status: PropTypes.bool.isRequired,
  message: PropTypes.any,
  classes: PropTypes.object.isRequired,
  messageHandler: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  position: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
};

export default Notification;
