/**
 *
 * Reports
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

// Queries
import { GET_RECIPIENT_TREE } from 'graphql/queries/organization-queries';
import { GET_QUESTION_RESPONSES } from 'graphql/queries/surveys/survey-queries';

// Components
import { makeSelectOrg } from 'containers/App/selectors';
import Loading from 'components/shared/Loading';
import { generalErrorHandler } from 'utils/error-handler';
import Wrapper from 'components/shared/NSFilters';
import messages from '../../../messages';
import Card from './card';
import { columns } from '../helper';
import { styles } from '../styles';

function Reports({
  intl,
  localOrg,
  surveyUuid,
  surveySections,
  userContext,
  totalPossibleResponses,
  primaryRecipientIdPath,
  surveyName,
  ...rest
}) {
  const classes = styles();
  const userOrg = localOrg.uuid;
  const defaultState = { query: null, chips: [] };
  const [communities, setCommunities] = useState(defaultState);
  const [, setSelected] = useState([]);
  const [dateRange, setDateRange] = useState({ before: null, after: null });
  const [lastUpdate, setLastUpdate] = useState(defaultState);
  const customDate = lastUpdate.query === 'custom';

  const dateRangeFormat = `After ${moment(dateRange.after).format(
    'MMM DD, YYYY'
  )} - Before ${moment(dateRange.before).format('MMM DD, YYYY')}`;

  const {
    loading: recipientTreeLoading,
    error: recipientTreeError,
    data: recipientTreeData,
  } = useQuery(GET_RECIPIENT_TREE, {
    variables: {
      uuid: userOrg,
    },
    skip: false,
  });

  const {
    loading: questionRespLoading,
    error: questionRespError,
    data: q,
  } = useQuery(GET_QUESTION_RESPONSES, {
    variables: {
      surveyUuids: surveyUuid,
      recipientParentUuids: communities.query,
      lastSyncedAt: customDate ? null : lastUpdate.query,
      before: dateRange.before,
      after: dateRange.after,
    },
  });

  if (recipientTreeError || questionRespError) {
    return generalErrorHandler(recipientTreeError || questionRespError, {
      ...rest,
    });
  }

  const questions = surveySections
    .map(({ surveyQuestions }) =>
      surveyQuestions.map(
        ({
          fieldType,
          questionVersion: {
            optionValues,
            versionNumber,
            question: { name, uuid },
            questionContexts,
          },
        }) => {
          const contextExist = questionContexts.find(
            ({ contextPermalink }) => contextPermalink === userContext
          );
          let contextToUse = contextExist;
          if (!contextExist) {
            contextToUse = { ...questionContexts[0] };
          }

          return {
            id: uuid,
            type: fieldType,
            version: versionNumber,
            name,
            responses: [],
            options: optionValues,
            optionLabels: contextToUse.optionLabels,
            label: contextToUse.label,
          };
        }
      )
    )
    .flat();

  if (!questionRespLoading) {
    q.questionResponses.forEach(
      ({
        questionUuid,
        sourceValue,
        position,
        imageUrl,
        base64Image,
        recipientUuid,
        submissionCompletedAt,
      }) => {
        questions.forEach(question => {
          if (
            question.id === questionUuid &&
            (sourceValue || imageUrl || base64Image)
          ) {
            question.responses = [
              ...question.responses,
              {
                sourceValue,
                position,
                imageUrl,
                base64Image,
                recipientUuid,
                submissionCompletedAt,
              },
            ];
          }
        });
      }
    );
  }

  const filterCategories = columns(
    [
      intl.formatMessage(messages.communities),
      intl.formatMessage(messages.allTime),
    ],
    [
      intl.formatMessage(messages.dateRange),
      intl.formatMessage(messages.dataFrom),
    ],
    {
      communitiesData: {
        loading: recipientTreeLoading,
        list:
          (recipientTreeData.organization &&
            recipientTreeData.organization.nestedRecipientTree) ||
          [],
        chips: communities.chips,
        clear: () => setCommunities(defaultState),
      },
      allTime: {
        chips: dateRange.before ? [dateRangeFormat] : lastUpdate.chips,
        clear: () => {
          setLastUpdate(defaultState);
          setDateRange({ before: null, after: null });
        },
      },
    }
  );

  let cardCounter = 0;

  const cards = questions.map(
    ({ type, responses, name, version, options, optionLabels, label }) => {
      cardCounter += 1;
      return (
        <Card
          key={cardCounter}
          primaryRecipientIdPath={primaryRecipientIdPath}
          surveyName={surveyName}
          name={name}
          type={type}
          version={version}
          responses={responses}
          options={options}
          optionLabels={optionLabels}
          question={label}
          questionNumber={cardCounter}
          totalPossibleResponses={totalPossibleResponses}
        />
      );
    }
  );

  return (
    <>
      <Wrapper
        filterCategories={filterCategories}
        dateRangeProps={{ dateRange, setDateRange }}
        lastUpdateProps={{ lastUpdate, setLastUpdate }}
        setSelected={setSelected}
        messages={messages}
        filterQueryTriggers={{
          communities: setCommunities,
        }}
      />
      <Divider className={classes.divider} />

      <Grid container justify={questionRespLoading ? 'center' : 'flex-start'}>
        {questionRespLoading ? (
          <Grid item>
            <Loading />
          </Grid>
        ) : (
          <Grid item xs={9} md={12} lg={9} xl={9}>
            {cards}
          </Grid>
        )}
      </Grid>
    </>
  );
}

Reports.propTypes = {
  intl: intlShape.isRequired,
  localOrg: PropTypes.object.isRequired,
  surveyUuid: PropTypes.string.isRequired,
  surveySections: PropTypes.array.isRequired,
  userContext: PropTypes.string.isRequired,
  totalPossibleResponses: PropTypes.number.isRequired,
  surveyName: PropTypes.string.isRequired,
  primaryRecipientIdPath: PropTypes.string.isRequired,
};

const intlRecipientView = injectIntl(Reports);

const mapStateToProps = createStructuredSelector({
  localOrg: makeSelectOrg(),
});

export default connect(mapStateToProps)(intlRecipientView);
