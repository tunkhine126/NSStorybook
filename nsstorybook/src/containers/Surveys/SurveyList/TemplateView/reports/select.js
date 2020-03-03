/**
 *
 * Select
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { styles } from './styles';
import Bar from './bar';

function Select({ options, responses, optionLabels }) {
  const classes = styles();

  return (
    <Grid className={classes.chartContainer}>
      {options.map((o, idx) => {
        let totalResponses = 0;

        responses.forEach(({ sourceValue }) => {
          if (sourceValue.split(',').includes(o)) {
            totalResponses += 1;
          }
        });

        let percentage = (100 / responses.length) * totalResponses;

        percentage = percentage > 0 ? Number(percentage.toFixed(2)) : 0;

        return (
          <Bar
            key={idx}
            answer={optionLabels[o]}
            numberOfResponses={totalResponses}
            percentage={percentage}
          />
        );
      })}
    </Grid>
  );
}

Select.propTypes = {
  responses: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  optionLabels: PropTypes.object.isRequired,
};

export default Select;
