/**
 *
 * FieldHistory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import globalMessages from 'messages';
import { FieldHistoryStyle } from '../../styles';

function FieldHistory({ intl, date, value, user, currentVersion, lastItem }) {
  const classes = FieldHistoryStyle();

  return (
    <>
      <Grid
        item
        container
        className={classes.container}
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        {currentVersion && (
          <Typography variant="body1" className={classes.currentVersion}>
            {intl.formatMessage(globalMessages.currentVersion)}
          </Typography>
        )}

        <Typography variant="body1" className={classes.user}>
          {date} – {user}
        </Typography>
        <Typography variant="body1" className={classes.content}>
          {value}
        </Typography>
      </Grid>

      {!lastItem && (
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.lastItem}
        >
          <Divider light className={classes.divider} />
        </Grid>
      )}
    </>
  );
}

FieldHistory.propTypes = {
  intl: intlShape.isRequired,
  date: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  currentVersion: PropTypes.bool,
  lastItem: PropTypes.bool,
};

const intlFieldHistory = injectIntl(FieldHistory);

export default intlFieldHistory;
