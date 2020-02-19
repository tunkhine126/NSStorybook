/**
 *
 * Content
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export function Content({
  subHeader,
  body,
  headerClass,
  containerClass,
  screen,
}) {
  const headerScreen = (screen && screen.header.xs) || 3;
  const bodyScreen = (screen && screen.header.xs) || 9;

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={containerClass}
      >
        <Grid item xs={headerScreen}>
          <Typography variant="body1" className={headerClass} gutterBottom>
            {subHeader}
          </Typography>
        </Grid>
        <Grid item xs={bodyScreen}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            {body}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

Content.propTypes = {
  subHeader: PropTypes.any,
  body: PropTypes.any,
  containerClass: PropTypes.string.isRequired,
  headerClass: PropTypes.string.isRequired,
  screen: PropTypes.object,
};

export default Content;
