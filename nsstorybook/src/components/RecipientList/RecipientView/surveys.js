/**
 *
 * Surveys
 *
 */

import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { injectIntl, intlShape } from 'react-intl';
import qs from 'query-string';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { GET_FAMILY_SURVEY_SUBMISSIONS } from 'graphql/queries/families/family-queries';
import { GET_USER } from 'graphql/queries/user-queries';
import { generalErrorHandler } from 'utils/error-handler';
import SurveyViewer from 'components/shared/SurveyViewer';
import Loading from 'components/shared/Loading';
import globalMessages from 'messages';

import { RecipientViewContext } from './context/index';
import { recipientListStyles } from '../styles';

function Surveys({ intl, location }) {
  const classes = recipientListStyles();

  const { date, name } = qs.parse(location.search);
  const { rest, match } = useContext(RecipientViewContext);
  const {
    params: { id },
  } = match;

  const { loading: loadingUser, error: userError, data: userData } = useQuery(
    GET_USER,
    {
      fetchPolicy: 'network-only',
    }
  );

  const { loading, error, data: familySurveySubmissions } = useQuery(
    GET_FAMILY_SURVEY_SUBMISSIONS,
    {
      variables: {
        recipientUuids: [id],
      },
    }
  );

  if (error || userError) {
    return generalErrorHandler(error || userError, {
      ...rest,
    });
  }

  if (loading || loadingUser)
    return (
      <div style={{ height: '50vh' }}>
        <Loading />
      </div>
    );

  const surveys = familySurveySubmissions.submissions.map(
    ({ survey, completedAt, surveyor, questionResponses }, idx) => (
      <SurveyViewer
        key={idx}
        initialExpand={name === survey.name && date === completedAt}
        name={survey.name}
        completeDate={completedAt}
        surveyor={`${surveyor.firstName} ${surveyor.lastName}`}
        sections={survey.surveySections}
        responses={questionResponses}
        context={userData.viewer.defaultContextPermalink}
      />
    )
  );

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      className={classes.container}
    >
      {surveys}
      {surveys.length === 0 && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.notFoundContainer}
        >
          <Typography className={classes.body} variant="body1">
            {intl.formatMessage(globalMessages.noSurveys)}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

Surveys.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
};

const IntlSurveys = injectIntl(Surveys);

export default IntlSurveys;
