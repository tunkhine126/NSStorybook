/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import isoLangs from 'assets/isoLangs.json';
import SurveyViewer from 'components/shared/SurveyViewer';
import NSButton from 'components/shared/NSButton';
import moment from 'moment';
import globalMessages from 'messages';
import messages from '../../messages';
import { overviewStyles } from './styles';

function Overview({ intl, data, submissionData, userContext, ...rest }) {
  const classes = overviewStyles();

  const sections = data.map(({ body }, idx) => (
    <SurveyViewer
      key={idx}
      version={2}
      name={body}
      sections={data.filter((_, i) => i === idx)}
      context={userContext}
    />
  ));

  const questionCount = data.reduce(
    (pv, cv) => pv + cv.surveyQuestions.length,
    0
  );

  const langCode = data
    .map(section =>
      section.surveyQuestions.map(({ questionVersion: { questionContexts } }) =>
        questionContexts.map(({ contextPermalink: cp }) => cp)
      )
    )
    .flat(2)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map(lang => lang.split('_')[1]);

  const languages = langCode
    .map(l => isoLangs.find(({ code }) => code === l).name)
    .join(', ');

  const submissions = submissionData.sort(
    (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
  );

  const lastSubmitted =
    submissions.length > 0 && submissions[submissions.length - 1].completedAt;

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={8} md={11} lg={8}>
          <Paper className={classes.table}>
            <Table aria-label="survey overview table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {intl.formatMessage(messages.questionsCount)}
                  </TableCell>
                  <TableCell>
                    {intl.formatMessage(globalMessages.languages)}
                  </TableCell>
                  <TableCell>
                    {intl.formatMessage(globalMessages.submissions)}
                  </TableCell>
                  <TableCell>
                    {intl.formatMessage(messages.lastSubmission)}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {questionCount}
                  </TableCell>
                  <TableCell>{languages}</TableCell>
                  <TableCell>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item>{submissions.length}</Grid>
                      <Grid item>
                        <NSButton textBtn componentClasses={classes.viewBtn}>
                          View
                        </NSButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        {lastSubmitted
                          ? moment(lastSubmitted).format('MMM DD')
                          : 'N/A'}
                      </Grid>
                      {lastSubmitted && (
                        <Grid item className={classes.timeLaps}>
                          {moment(lastSubmitted)
                            .startOf('hour')
                            .fromNow()}
                        </Grid>
                      )}
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      {sections}
    </>
  );
}

Overview.propTypes = {
  intl: intlShape.isRequired,
  data: PropTypes.array.isRequired,
  submissionData: PropTypes.array.isRequired,
  userContext: PropTypes.string.isRequired,
};

const intlOverview = injectIntl(Overview);

export default intlOverview;
