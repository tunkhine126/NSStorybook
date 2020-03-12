/**
 *
 * Card
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Components
import { DATA_TYPES } from '../../../../../utils/globalConstants';
import globalMessages from 'messages';
import messages from '../../../messages';
import { styles } from './styles';
import Select from './select';
import Number from './number';
import CoordinateMap from './map';
import TextScrollList from './textScrollList';
import PhotoScrollList from './photoScrollList';

function Card({
  intl,
  options,
  optionLabels,
  questionNumber,
  responses,
  version,
  question,
  name,
  type,
  surveyName,
  primaryRecipientIdPath,
  totalPossibleResponses,
}) {
  const classes = styles();
  let graph;

  const props = { responses, surveyName, primaryRecipientIdPath };

  switch (type) {
    case DATA_TYPES.singleSelect:
      graph = (
        <Select
          options={options}
          optionLabels={optionLabels}
          responses={responses}
        />
      );
      break;
    case DATA_TYPES.multiSelect:
      graph = (
        <Select
          options={options}
          optionLabels={optionLabels}
          responses={responses}
        />
      );
      break;
    case DATA_TYPES.number:
      graph = <Number responses={responses} />;
      break;
    case DATA_TYPES.coordinates:
      graph = <CoordinateMap {...props} />;
      break;
    case DATA_TYPES.photo:
      graph = <PhotoScrollList {...props} />;
      break;
    default:
      graph = <TextScrollList {...props} />;
  }

  return (
    <Paper className={classes.root}>
      <Grid container direction="column">
        <Grid item container direction="row">
          <Grid item className={classes.questionNumber}>
            {questionNumber}
          </Grid>
          <Grid item container direction="column" xs>
            <Grid item>
              <Typography variant="h6" className={classes.questionTitle}>
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.version}>
                {`${intl.formatMessage(
                  globalMessages.version
                )} ${version} - ${type.replace('_', ' ')}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.question}>{question}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        {graph}
        <Typography variant="body1" className={classes.questionsAnswered}>
          {`${responses.length} ${intl.formatMessage(
            messages.outOf
          )} ${totalPossibleResponses} ${intl.formatMessage(
            messages.answeredQuestion
          )}`}
        </Typography>
      </Grid>
    </Paper>
  );
}

Card.propTypes = {
  intl: intlShape.isRequired,
  name: PropTypes.string.isRequired,
  surveyName: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    DATA_TYPES.shortText,
    DATA_TYPES.paragraphText,
    DATA_TYPES.number,
    DATA_TYPES.date,
    DATA_TYPES.time,
    DATA_TYPES.singleSelect,
    DATA_TYPES.multiSelect,
    DATA_TYPES.likert,
    DATA_TYPES.photo,
    DATA_TYPES.audio,
    DATA_TYPES.video,
    DATA_TYPES.coordinates,
  ]).isRequired,
  question: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  totalPossibleResponses: PropTypes.number.isRequired,
  responses: PropTypes.array.isRequired,
  primaryRecipientIdPath: PropTypes.string.isRequired,
  options: PropTypes.array,
  optionLabels: PropTypes.object,
};

const intlCard = injectIntl(Card);

export default intlCard;
