/**
 *
 * SurveyViewer
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl, intlShape } from 'react-intl';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

import SmallRightArrow from '../Icons copy/smallRightArrow';
import Section from '../SurveyViewer/section';
import moment from 'moment';
import {
  styles,
  ExpansionPanelDetailsStyle,
  ExpansionPanelStyle,
} from './styles';
import messages from './messages';

export function SurveyViewer({
  intl,
  name,
  completeDate = null,
  surveyor = null,
  sections,
  responses = [],
  context,
  version,
  initialExpand = false,
}) {
  const classes = styles();
  const [expanded, setExpanded] = useState(initialExpand);

  const renderSections = sections.map(({ body, surveyQuestions }, idx) => (
    <Section
      key={idx}
      name={body}
      questions={surveyQuestions}
      responses={responses}
      context={context}
      version={version}
    />
  ));

  return (
    <Grid item xs={8} md={11} lg={8} className={classes.accordion}>
      <ExpansionPanelStyle>
        <ExpansionPanel
          expanded={expanded}
          onChange={(event, open) => setExpanded(open)}
        >
          <ExpansionPanelSummary
            expandIcon={<SmallRightArrow />}
            aria-controls="survey"
            id="survey"
            className={clsx({
              [classes.bottomBorder]: expanded && version === 2,
            })}
          >
            <Grid item xs={version !== 2 ? 6 : 12}>
              <Typography
                gutterBottom
                className={clsx(classes.header, classes.bold)}
              >
                {version === 2 ? (
                  <span>
                    {name}
                    <span className={classes.headerQuestions}>
                      {sections[0].surveyQuestions.length}{' '}
                      {sections[0].surveyQuestions.length > 1
                        ? intl.formatMessage(messages.questions)
                        : intl.formatMessage(messages.question)}
                    </span>
                  </span>
                ) : (
                  <span>{name}</span>
                )}
              </Typography>
            </Grid>

            {version !== 2 && (
              <Grid
                container
                item
                justify="flex-end"
                alignItems="center"
                xs={6}
                md={11}
              >
                <Typography gutterBottom className={clsx(classes.completed)}>
                  {`${intl.formatMessage(messages.completed)} ${moment(
                    new Date(completeDate)
                  ).format('MMM DD, YYYY')} ${intl.formatMessage(
                    messages.bySurveyor
                  )}: `}
                  <Chip
                    component="span"
                    avatar={
                      <Avatar className={classes.avatar} component="span">
                        {surveyor.split('')[0]}
                      </Avatar>
                    }
                    label={surveyor}
                    className={classes.chip}
                  />
                </Typography>
              </Grid>
            )}
          </ExpansionPanelSummary>

          <ExpansionPanelDetailsStyle>
            <ExpansionPanelDetails>
              <Grid container>{renderSections}</Grid>
            </ExpansionPanelDetails>
          </ExpansionPanelDetailsStyle>
        </ExpansionPanel>
      </ExpansionPanelStyle>
    </Grid>
  );
}

SurveyViewer.propTypes = {
  intl: intlShape.isRequired,
  name: PropTypes.string.isRequired,
  sections: PropTypes.array.isRequired,
  context: PropTypes.string.isRequired,
  initialExpand: PropTypes.bool,
  version: PropTypes.oneOf([1, 2]),
  surveyor: PropTypes.string,
  responses: PropTypes.array,
  completeDate: PropTypes.string,
};

const IntlSurveyViewer = injectIntl(SurveyViewer);

export default IntlSurveyViewer;
