/**
 *
 * ThreeRows
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { recipientListStyles, ThreeRowsStyle } from '../../styles';

function ThreeRows({ row1, row2, row3 }) {
  const classes = recipientListStyles();

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item className={clsx(classes.captionSpacing)}>
        <Typography variant="body1" className={classes.threeRowTitle}>
          {row1}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" className={classes.contentBody}>
          <ThreeRowsStyle>{row2}</ThreeRowsStyle>
        </Typography>
      </Grid>
      <Grid item className={classes.columnWidth}>
        <Typography variant="caption" className={classes.caption}>
          {row3}
        </Typography>
      </Grid>
    </Grid>
  );
}

ThreeRows.propTypes = {
  row1: PropTypes.string.isRequired,
  row2: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  row3: PropTypes.string.isRequired,
};

export default ThreeRows;
