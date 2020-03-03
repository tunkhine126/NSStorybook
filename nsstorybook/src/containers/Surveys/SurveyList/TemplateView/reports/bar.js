/**
 *
 * Bar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { singleChoiceBar } from './styles';
import messages from '../../../messages';

function Bar({ intl, answer, numberOfResponses, percentage }) {
  const singleChoice = singleChoiceBar(percentage === 0 ? 0.01 : percentage)();

  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      className={singleChoice.container}
    >
      <Grid item className={singleChoice.percentageContainer}>
        <Typography className={singleChoice.percentageText}>
          {percentage}%
        </Typography>
      </Grid>
      <Grid
        xs
        item
        container
        alignItems="center"
        direction="row"
        className={singleChoice.barContainer}
      >
        <div className={singleChoice.percentageBar} />

        <Grid
          container
          item
          justify="space-between"
          className={singleChoice.barTextContainer}
        >
          <Grid className={singleChoice.responseContainer}>
            <Typography className={singleChoice.responseText}>
              {answer}
            </Typography>
          </Grid>

          <Grid>
            <Typography className={singleChoice.numberOfResponses}>
              {numberOfResponses}{' '}
              {numberOfResponses === 1
                ? intl.formatMessage(messages.response)
                : intl.formatMessage(messages.responses)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

Bar.propTypes = {
  intl: intlShape.isRequired,
  numberOfResponses: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  answer: PropTypes.string,
};

const intlBar = injectIntl(Bar);

export default intlBar;
