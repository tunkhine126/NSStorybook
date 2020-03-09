/**
 *
 * Alert
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../global-styles';

const styles = makeStyles(() => ({
  root: { borderRadius: 0, boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)' },
  filledInfo: {
    backgroundColor: colors.STATE.active,
  },
}));

const styleClasses = makeStyles(() => ({
  collapse: {
    position: 'absolute',
    width: '100%',
  },
}));

function Alert({ onClick, ...rest }) {
  const [open, setOpen] = useState(false);
  const classes = styleClasses();

  useEffect(() => {
    // Prevents Memory Leak on unmount
    const timeout = setTimeout(() => {
      setOpen(true);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Collapse in={open} className={classes.collapse}>
      <MuiAlert
        classes={styles()}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            style={{ borderRight: 'none' }}
            onClick={() => {
              if (onClick) {
                onClick();
              }
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        elevation={6}
        variant="filled"
        {...rest}
      />
    </Collapse>
  );
}

Alert.propTypes = {
  onClick: PropTypes.func,
};

export default Alert;
