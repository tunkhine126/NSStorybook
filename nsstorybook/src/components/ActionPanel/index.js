/**
 *
 * ActionPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import appMessages from 'messages';
import { actionPanelStyles } from './styles';

export function ActionPanel({
  action,
  formId,
  type,
  resetForm,
  disabled,
  loading,
}) {
  const classes = actionPanelStyles();

  return (
    <>
      <Grid item xs={3} xl={2}>
        <div className={clsx(classes.panel)}>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.confirmBtn}
              form={formId}
              type={type}
              disabled={disabled}
            >
              {loading ? (
                <CircularProgress
                  className={classes.progress}
                  color="primary"
                />
              ) : (
                <FormattedMessage {...appMessages[action]} />
              )}
            </Button>
            <Button className={classes.cancelBtn} onClick={resetForm}>
              <FormattedMessage {...appMessages.cancel} />
            </Button>
          </Grid>
        </div>
      </Grid>
    </>
  );
}

export const loadingAction = (message, loading) => {
  const timeOut = setTimeout(() => {
    message(state => ({
      ...state,
      open: false,
      message: '',
    }));
  }, 3000);
  loading(false);
  return timeOut;
};

ActionPanel.propTypes = {
  action: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
  resetForm: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ActionPanel;
