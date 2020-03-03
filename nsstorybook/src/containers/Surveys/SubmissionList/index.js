/* eslint-disable react/prop-types */
/**
 *
 * SubmissionList
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import { ExportToCsv } from 'export-to-csv';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { GET_SUBMISSIONS } from 'graphql/queries/surveys/survey-queries';
import {
  GET_ALL_SUBMISSIONS,
  GET_ALL_FILTERED_SUBMISSIONS,
  GET_ALL_SURVEYS,
  GET_ALL_SURVEYORS,
} from 'graphql/queries/all-queries';
import { GET_RECIPIENT_TREE } from 'graphql/queries/organization-queries';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import NSTable from 'components/shared/NSTable';
import { makeSelectOrg } from 'containers/App/selectors';
import ViewHeader from 'components/shared/ViewHeader';
import tableMessages from 'components/shared/NSTable/messages';

import { generalErrorHandler } from 'utils/error-handler';
import globalMessages from 'messages';
import surveyMessages from '../messages';
import { formatData, formattedColumns as importedFC, columns } from './helper';
import { SubmissionListStyle, submissionListStyles } from './styles';

function SubmissionList({
  intl,
  localOrg,
  name,
  surveyId,
  primaryRecipientDetails,
  ...rest
}) {
  const defaultState = { query: null, chips: [] };
  const classes = submissionListStyles();
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [orderBy, setOrderBy] = useState('completed_at');
  const [order, setOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredResults, setFilteredResults] = useState(0);
  const [tableSearch, setTableSearch] = useState('');
  const [lastUpdate, setLastUpdate] = useState(defaultState);
  const [dateRange, setDateRange] = useState({ before: null, after: null });
  const [surveys, setSurveyData] = useState({
    query: [surveyId],
    chips: [name],
  });
  const [surveyorsData, setSurveyorsData] = useState(defaultState);
  const [communities, setCommunities] = useState(defaultState);
  const customDate = lastUpdate.query === 'custom';
  const userOrg = localOrg.uuid;

  const { loading, error, data: submissionData } = useQuery(GET_SUBMISSIONS, {
    variables: {
      resultsPerPage: rowsPerPage,
      surveyUuids: surveys.query,
      surveyorUuids: surveyorsData.query,
      recipientNameContains: tableSearch,
      recipientInternalIdContains: tableSearch,
      recipientParentUuids: communities.query,
      skip: currentPage > 1 ? rowsPerPage * (currentPage - 1) : 0,
      lastSyncedAt: customDate ? null : lastUpdate.query,
      sortColumn: orderBy,
      sortDirection: order,
      organizationUuid: userOrg,
      before: dateRange.before,
      after: dateRange.after,
    },
    skip: customDate && dateRange.before === null && dateRange.after === null,
    fetchPolicy: 'network-only',
  });

  const {
    loading: allDataLoading,
    error: allDataError,
    data: allData,
  } = useQuery(GET_ALL_SUBMISSIONS, {
    variables: {
      sortColumn: orderBy,
      sortDirection: order,
      organizationUuid: userOrg,
    },
  });

  const {
    loading: allFilteredDataLoading,
    error: allFilteredDataError,
    data: allFilteredData,
  } = useQuery(GET_ALL_FILTERED_SUBMISSIONS, {
    variables: {
      sortColumn: 'updated_at',
      recipientParentUuids: communities.query,
      sortDirection: order,
      surveyUuids: surveys.query,
      surveyorUuids: surveyorsData.query,
      recipientNameContains: tableSearch,
      recipientInternalIdContains: tableSearch,
      lastSyncedAt: customDate ? null : lastUpdate.query,
      organizationUuid: userOrg,
      before: dateRange.before,
      after: dateRange.after,
    },
    fetchPolicy: 'network-only',
  });

  const {
    loading: allSurveysLoading,
    error: allSurveysError,
    data: allSurveys,
  } = useQuery(GET_ALL_SURVEYS, {
    variables: { organizationUuid: userOrg },
    skip: false,
  });

  const {
    loading: allSurveyorsLoading,
    error: allSurveyorsError,
    data: allSurveyors,
  } = useQuery(GET_ALL_SURVEYORS, {
    variables: { organizationUuid: userOrg },
    skip: false,
  });

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

  useEffect(() => {
    if (submissionData && Object.entries(submissionData).length > 0) {
      const {
        submissions,
        _submissionsMetaData: { totalCount, totalPages: tp },
      } = submissionData;

      setFilteredResults(submissions.length);
      setTotalResults(totalCount);
      setTotalPages(tp);
      if (totalCount === 0) {
        setCurrentPage(1);
      }
    }
  }, [submissionData, loading]);

  if (
    error ||
    allDataError ||
    allFilteredDataError ||
    allSurveysError ||
    recipientTreeError ||
    allSurveyorsError
  ) {
    return generalErrorHandler(
      error ||
        allDataError ||
        allFilteredDataError ||
        allSurveysError ||
        recipientTreeError ||
        allSurveyorsError,
      {
        ...rest,
      }
    );
  }

  const mapColumnIds = {
    completed: 'completed_at',
    id: 'recipient_uuid',
    survey: 'survey_uuid',
    surveyor: 'surveyor_uuid',
  };

  const csvHeaders = [
    'Family',
    'Community',
    'Family ID',
    'Survey',
    'Surveyor',
    'Completed',
  ];

  const toolbarActions = [
    {
      title: intl.formatMessage(tableMessages.export),
      disable: allDataLoading,
      handleClick: () => {
        const dataToExport = selected.map(id =>
          dataFormatter(allData.submissions).find(item => item.id === id)
        );
        handleExport(dataToExport);
      },
    },
  ];

  const formattedColumns = importedFC(
    classes,
    primaryRecipientDetails.ChildRoutes[0].path
  );

  const dateRangeFormat = `After ${moment(dateRange.after).format(
    'MMM DD, YYYY'
  )} - Before ${moment(dateRange.before).format('MMM DD, YYYY')}`;

  const columnsData = columns(
    [
      intl.formatMessage(globalMessages.rtFamily),
      intl.formatMessage(globalMessages.recipientID),
      intl.formatMessage(globalMessages.survey),
      intl.formatMessage(globalMessages.surveyor),
      intl.formatMessage(globalMessages.community),
      intl.formatMessage(globalMessages.completed),
    ],
    {
      surveyData: {
        loading: allSurveysLoading,
        list: (allSurveys.surveys || []).map(d => ({
          id: d.uuid,
          label: d.name,
          count: d.submissionUuids.length,
          selected: false,
        })),
        chips: surveys.chips,
        clear: () => setSurveyData(defaultState),
      },
      surveyorData: {
        loading: allSurveyorsLoading,
        list: (allSurveyors.users || []).map(d => ({
          id: d.uuid,
          label: `${d.firstName} ${d.lastName}`,
          count: 0,
          selected: false,
        })),
        chips: surveyorsData.chips,
        clear: () => setSurveyorsData(defaultState),
      },
      communitiesData: {
        loading: recipientTreeLoading,
        list:
          (recipientTreeData.organization &&
            recipientTreeData.organization.nestedRecipientTree) ||
          [],
        chips: communities.chips,
        clear: () => setCommunities(defaultState),
      },
      completedData: {
        chips: dateRange.before ? [dateRangeFormat] : lastUpdate.chips,
        clear: () => {
          setLastUpdate(defaultState);
          setDateRange({ before: null, after: null });
        },
      },
    }
  );

  function handleExport(dataToExport) {
    const exportOptions = {
      filename: 'Submissions-List',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      headers: csvHeaders,
    };

    const scrubbedData = dataToExport.map(d => {
      delete d.id;
      delete d.recipientUuid;
      delete d.surveyId;
      return d;
    });

    const csvExporter = new ExportToCsv(exportOptions);
    csvExporter.generateCsv(scrubbedData);
  }

  function dataFormatter(dataToFormat) {
    return dataToFormat.map(
      ({
        completedAt,
        uuid,
        surveyUuid,
        survey: { name: svName },
        surveyor: { firstName, lastName },
        recipient: {
          parent,
          uuid: recipientUuid,
          internalId,
          name: familyName,
        },
      }) => {
        const community = parent ? parent.name : 'N/A';
        return formatData(
          familyName,
          community,
          uuid,
          surveyUuid,
          recipientUuid,
          internalId,
          svName,
          `${firstName} ${lastName}`,
          completedAt
        );
      }
    );
  }

  return (
    <SubmissionListStyle>
      <Grid
        className={classes.submissionListHeader}
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <ViewHeader
            component="Submission List"
            body={intl.formatMessage(surveyMessages.submissionListHeader)}
          />
        </Grid>
      </Grid>
      <Divider light />
      <NSTable
        arialLabels={{ checkboxes: 'select all submissions' }}
        toolbarActions={toolbarActions}
        name="submissionsTable"
        columns={columnsData}
        data={
          !loading && submissionData
            ? dataFormatter(submissionData.submissions)
            : []
        }
        filiteredRecordsUuid={
          allFilteredDataLoading
            ? []
            : allFilteredData.submissions.map(d => d.uuid)
        }
        rowsPerPageProps={{ rowsPerPage, setRowsPerPage }}
        orderByProps={{ orderBy, setOrderBy }}
        orderProps={{ order, setOrder }}
        pageProps={{ currentPage, setCurrentPage }}
        tableSearchProps={{ tableSearch, setTableSearch }}
        lastUpdateProps={{ lastUpdate, setLastUpdate }}
        dateRangeProps={{ dateRange, setDateRange }}
        filterQueryTriggers={{
          survey: setSurveyData,
          surveyor: setSurveyorsData,
          community: setCommunities,
        }}
        totalResults={totalResults}
        totalPages={totalPages}
        loading={loading}
        filteredResults={filteredResults}
        mapColumnIds={mapColumnIds}
        selected={selected}
        setSelected={setSelected}
        formattedColumns={formattedColumns}
        filterTitles={globalMessages}
        selectAllLoading={allDataLoading}
        showCheckboxes
        showTableSettings
        enableSearch
        enableFilters
      />
    </SubmissionListStyle>
  );
}

SubmissionList.propTypes = {
  intl: intlShape.isRequired,
  localOrg: PropTypes.object,
};

const IntlSubmissionList = injectIntl(SubmissionList);

const mapStateToProps = createStructuredSelector({
  localOrg: makeSelectOrg(),
});

export default connect(mapStateToProps)(IntlSubmissionList);
