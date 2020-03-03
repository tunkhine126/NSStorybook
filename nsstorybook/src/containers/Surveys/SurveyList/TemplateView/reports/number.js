/**
 *
 * Numbers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Typography from '@material-ui/core/Typography';

// Components
import { styles } from './styles';
import messages from '../../../messages';

function Numbers({ intl, responses }) {
  const classes = styles();

  function medianCalc(arr) {
    const L = arr.length;
    const halfL = L / 2;
    if (L % 2 === 1) return quickSelect(arr, halfL);
    return 0.5 * (quickSelect(arr, halfL - 1) + quickSelect(arr, halfL));
  }

  function quickSelect(arr, k) {
    if (arr.length === 1) return arr[0];

    const pivot = arr[0];
    const lows = arr.filter(e => e < pivot);
    const highs = arr.filter(e => e > pivot);
    const pivots = arr.filter(e => e === pivot);

    if (k < lows.length) return quickSelect(lows, k);
    if (k < lows.length + pivots.length) return pivot;

    return quickSelect(highs, k - lows.length - pivots.length);
  }

  let extractedNumbers = responses.map(({ sourceValue }) =>
    parseInt(sourceValue)
  );

  extractedNumbers = extractedNumbers.includes(NaN) ? [] : extractedNumbers;

  const total = responses.reduce(
    (acc, cv) => acc + parseInt(cv.sourceValue),
    0
  );

  let average = 'N/A';
  let median = 'N/A';
  let minimum = 'N/A';
  let maximum = 'N/A';

  if (extractedNumbers.length > 0) {
    average = Math.round(total / responses.length);
    median = Math.round(medianCalc(extractedNumbers.sort((a, b) => a - b)));
    minimum = Math.min(...extractedNumbers);
    maximum = Math.max(...extractedNumbers);
  }

  return (
    <>
      {[
        { mode: intl.formatMessage(messages.average), value: average },
        { mode: intl.formatMessage(messages.median), value: median },
        { mode: intl.formatMessage(messages.minimum), value: minimum },
        { mode: intl.formatMessage(messages.maximum), value: maximum },
      ].map(({ mode, value }, idx) => (
        <Typography key={idx} className={classes.numberType}>
          {mode}: <span className={classes.numberValue}>{value}</span>
        </Typography>
      ))}
    </>
  );
}

Numbers.propTypes = {
  intl: intlShape.isRequired,
  responses: PropTypes.array.isRequired,
};

const intlNumbers = injectIntl(Numbers);

export default intlNumbers;
