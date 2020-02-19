/**
 *
 * TwoColumns
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { recipientListStyles } from '../../styles';

function TwoColumns({ col1, col2 }) {
  const classes = recipientListStyles();

  return (
    <Grid container className={classes.twoColumns}>
      <Grid item xs={6} className={classes.colContainer}>
        {col1}
      </Grid>
      <Grid item xs={6} className={classes.colContainer}>
        {col2}
      </Grid>
    </Grid>
  );
}

TwoColumns.propTypes = {
  col1: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  col2: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default TwoColumns;
