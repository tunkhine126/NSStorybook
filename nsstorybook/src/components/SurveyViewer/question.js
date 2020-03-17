/**
 *
 * Question
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl, intlShape } from 'react-intl';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import globalMessages from '../../messages';
import { styles } from './styles';
import messages from './messages';

export function Question({
  intl,
  responses,
  question,
  context,
  number,
  lastQuestion,
  rules,
  version,
}) {
  const classes = styles();
  const { questionVersion, fieldType, isRequired } = question;
  const {
    versionNumber,
    question: { name },
    questionContexts,
    optionValues,
  } = questionVersion;

  const questionLabel =
    questionContexts.find(q => q.contextPermalink === context) ||
    questionContexts[0];

  const response = responses[number - 1] && responses[number - 1].sourceValue;

  const getField = () => {
    switch (fieldType) {
      case 'short_text':
        return 'short text';
      case 'paragraph_text':
        return 'paragraph text';
      case 'number':
        return 'number';
      case 'date':
        return 'date';
      case 'time':
        return 'time';
      case 'single_select':
        return 'single choice';
      case 'multi_select':
        return 'Multiple Choice';
      case 'likert':
        return 'Likert';
      case 'photo':
        return 'photo';
      case 'audio':
        return 'Audio';
      case 'video':
        return 'Video';
      case 'coordinates':
        return 'Coordinates';
      default:
        return null;
    }
  };

  const field = getField();
  const validResponse =
    optionValues &&
    optionValues.filter(o => response && response.split(',').includes(o))
      .length === 1;
  const notMultiOrSingle =
    fieldType !== 'multi_select' && fieldType !== 'single_select';
  const multiOrSingle =
    fieldType === 'multi_select' || fieldType === 'single_select';
  const multiOrSingleNoResponse =
    multiOrSingle && ((response && !validResponse) || !response);

  const responseMsg = (
    <li className="standard">
      {version !== 2 && notMultiOrSingle && (
        <span
          className={clsx({
            selected: response,
          })}
        >
          {response || intl.formatMessage(messages.noResponse)}
        </span>
      )}
      {version !== 2 && multiOrSingleNoResponse && (
        <span>{intl.formatMessage(messages.noResponse)}</span>
      )}
    </li>
  );

  return (
    <Grid item container direction="row" className={classes.questionSection}>
      <Grid item className={classes.questionCount}>
        {number}
      </Grid>
      <Grid container item xs={11} direction="column">
        <Grid item>
          <Typography className={clsx(classes.questionName, classes.text)}>
            {name}
            {isRequired && <span className={classes.requiredQuestion}> *</span>}
          </Typography>
          <Typography
            className={clsx(classes.caption, classes.text, classes.uppercase)}
          >
            {intl.formatMessage(globalMessages.version)} {versionNumber}
            <span> - {field} </span>
            {intl.formatMessage(messages.field)}
          </Typography>
        </Grid>

        <Grid item className={classes.questionContainer}>
          {rules && rules.condition && rules.value && (
            <Typography className={classes.condition}>
              {`${intl.formatMessage(
                messages.conditionalDisplay
              )} "${name.toUpperCase()}" ${rules.condition} "${rules.value}" `}
            </Typography>
          )}

          <Typography className={classes.questionText}>
            {questionLabel.label}
          </Typography>
        </Grid>

        <Grid item>
          <ul
            className={clsx(classes.questionChoices, 'question-choices', {
              standard: notMultiOrSingle || multiOrSingleNoResponse,
            })}
          >
            {multiOrSingle &&
              ((response && validResponse) || version === 2) &&
              optionValues.map((item, idx) => {
                let selected = false;

                if (response && response.split(',').includes(item)) {
                  selected = true;
                }

                return (
                  <li
                    key={idx}
                    className={clsx({
                      selected,
                    })}
                  >
                    <span>
                      {questionLabel.optionLabels &&
                        questionLabel.optionLabels[item]}
                    </span>
                  </li>
                );
              })}
            {responseMsg}
          </ul>
        </Grid>
      </Grid>
      {!lastQuestion && (
        <div className={classes.dividerContainer}>
          <Divider className={classes.questionDivider} />
        </div>
      )}
    </Grid>
  );
}

Question.propTypes = {
  intl: intlShape.isRequired,
  responses: PropTypes.array.isRequired,
  question: PropTypes.object.isRequired,
  context: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  lastQuestion: PropTypes.bool.isRequired,
  rules: PropTypes.shape({
    value: PropTypes.string,
    condition: PropTypes.string,
  }),
  version: PropTypes.oneOf([1, 2]),
};

const IntlQuestion = injectIntl(Question);

export default IntlQuestion;
