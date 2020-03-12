/**
 *
 * Loading
 *
 */

import React from 'react';
import Lottie from 'react-lottie';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import revealLogo from '../../assets/reveal_logo.json';

const styles = makeStyles(() => ({
  container: {
    height: '100%',
  },
}));

function Loading() {
  const classes = styles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs className={classes.position}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: revealLogo,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={50}
          width={50}
        />
      </Grid>
    </Grid>
  );
}

export default Loading;