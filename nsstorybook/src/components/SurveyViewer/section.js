/**
 *
 * Section
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl, intlShape } from 'react-intl';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import messages from './messages';
import { styles } from './styles';
import Question from './question';

export function Section({
  intl,
  name,
  questions,
  responses,
  context,
  version,
}) {
  const classes = styles();

  const renderQuestions = questions.map((q, idx) => (
    <Question
      key={idx}
      responses={responses}
      version={version}
      question={q}
      context={context}
      number={idx + 1}
      lastQuestion={!questions[idx + 1]}
      rules={{ value: q.displayRuleValue, condition: q.displayRuleCondition }}
    />
  ));

  return (
    <Grid container justify="flex-start" alignItems="center">
      {version !== 2 && (
        <Grid
          container
          item
          alignItems="center"
          direction="row"
          className={classes.sectionHeaderBg}
        >
          <Typography
            className={clsx(
              classes.sectionHeader,
              classes.text,
              classes.uppercase
            )}
          >
            {name}
          </Typography>
          <Typography className={clsx(classes.caption, classes.text)}>
            {`${questions.length} ${
              questions.length > 1
                ? intl.formatMessage(messages.questions)
                : intl.formatMessage(messages.question)
            }`}
          </Typography>
        </Grid>
      )}

      {renderQuestions}
    </Grid>
  );
}

Section.propTypes = {
  intl: intlShape.isRequired,
  name: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  responses: PropTypes.array.isRequired,
  context: PropTypes.string.isRequired,
  version: PropTypes.oneOf([1, 2]),
};

const IntlSection = injectIntl(Section);

export default IntlSection;
