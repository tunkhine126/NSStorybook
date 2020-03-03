/* eslint-disable react/prop-types */
/**
 *
 * SurveyList
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

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Add from '@material-ui/icons/Add';
import OpenInNew from '@material-ui/icons/OpenInNew';

import NSTable from 'components/shared/NSTable';
import { makeSelectOrg } from 'containers/App/selectors';
import LookUp from 'components/shared/Icons/lookup';
import HeaderButton from 'components/shared/HeaderButton';
import ViewHeader from 'components/shared/ViewHeader';
import tableMessages from 'components/shared/NSTable/messages';
import TableViews from 'components/shared/NSTable/tableViews';
import { GET_SURVEYS } from 'graphql/queries/surveys/survey-queries';
import {
  GET_ALL_SURVEYS,
  GET_ALL_FILTERED_SURVEYS,
  GET_ALL_CONTEXTS,
} from 'graphql/queries/all-queries';
import colors from 'global-styles';
import { generalErrorHandler } from 'utils/error-handler';
import globalMessages from 'messages';
import messages from '../messages';
import { formatData, formattedColumns as importedFC, columns } from './helper';
import { SurveyListStyle, helperClasses, surveyListStyles } from './styles';

function SurveyList({ intl, localOrg, ...rest }) {
  const { lookUpBtn, exportBtn, newSurveyBtn } = helperClasses;
  const classes = surveyListStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(0);
  const [addView, setaddView] = useState(false);
  const [selected, setSelected] = useState([]);
  // TODO: Remove Hardcoded values
  const [options, setOptions] = useState([
    { name: intl.formatMessage(globalMessages.defaultView), id: 0 },
    { name: 'Ahuachapan Quarterly Audit', id: 1 },
    { name: 'Year-End Report', id: 2 },
  ]);
  const defaultState = { query: null, chips: [] };

  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [orderBy, setOrderBy] = useState('updated_at');
  const [order, setOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredResults, setFilteredResults] = useState(0);
  const [tableSearch, setTableSearch] = useState('');
  const [contexts, setContexts] = useState({
    query: null,
    chips: [],
  });
  const [lastUpdate, setLastUpdate] = useState(defaultState);
  const [dateRange, setDateRange] = useState({ before: null, after: null });
  const customDate = lastUpdate.query === 'custom';
  const userOrg = localOrg ? localOrg.uuid : null;

  const { loading, error, data: surveyData } = useQuery(GET_SURVEYS, {
    variables: {
      resultsPerPage: rowsPerPage,
      skip: currentPage > 1 ? rowsPerPage * (currentPage - 1) : 0,
      sortColumn: orderBy,
      sortDirection: order,
      nameContains: tableSearch,
      contextUuids: contexts.query,
      organizationUuid: userOrg,
      lastSyncedAt: customDate ? null : lastUpdate.query,
      before: dateRange.before,
      after: dateRange.after,
    },
    skip: customDate && dateRange.before === null && dateRange.after === null,
    fetchPolicy: 'network-only',
  });

  const {
    loading: allFilteredDataLoading,
    error: allFilteredDataError,
    data: allFilteredData,
  } = useQuery(GET_ALL_FILTERED_SURVEYS, {
    variables: {
      sortColumn: orderBy,
      sortDirection: order,
      nameContains: tableSearch,
      contextUuids: contexts.query,
      organizationUuid: userOrg,
      lastSyncedAt: customDate ? null : lastUpdate.query,
      before: dateRange.before,
      after: dateRange.after,
    },
    fetchPolicy: 'network-only',
  });

  const {
    loading: allDataLoading,
    error: allDataError,
    data: allData,
  } = useQuery(GET_ALL_SURVEYS, {
    variables: {
      sortColumn: orderBy,
      sortDirection: order,
    },
  });

  const {
    loading: allContextsLoading,
    error: allContextsError,
    data: allContexts,
  } = useQuery(GET_ALL_CONTEXTS, { skip: false });

  const mapColumnIds = {
    lastUpdate: 'changed_at',
    id: 'uuid',
    name: 'name',
  };

  const csvHeaders = [
    'Name',
    'Questions',
    'Languages',
    'Submissions',
    'Last Update',
  ];

  const toolbarActions = [
    {
      title: intl.formatMessage(tableMessages.export),
      disable: allDataLoading,
      handleClick: () => {
        const dataToExport = selected.map(id =>
          dataFormatter(allData.surveys).find(item => item.id === id)
        );

        handleExport(dataToExport);
      },
    },
  ];

  const formattedColumns = importedFC(classes);

  const horizActions = [];

  const dateRangeFormat = `After ${moment(dateRange.after).format(
    'MMM DD, YYYY'
  )} - Before ${moment(dateRange.before).format('MMM DD, YYYY')}`;

  const columnsData = columns(
    [
      intl.formatMessage(messages.name),
      intl.formatMessage(messages.questionsCount),
      intl.formatMessage(messages.availableContexts),
      intl.formatMessage(messages.submissionsCount),
      intl.formatMessage(messages.lastUpdate),
    ],
    {
      contextsData: {
        loading: allContextsLoading,
        list: (allContexts.contexts || []).map(d => ({
          id: d.uuid,
          label: d.name,
          count: 0,
          selected: false,
        })),
        chips: contexts.chips,
        clear: () => setContexts(defaultState),
      },
      lastUpdateData: {
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
      filename: 'Surveys-List',
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
      return d;
    });

    const csvExporter = new ExportToCsv(exportOptions);
    csvExporter.generateCsv(scrubbedData);
  }

  function handleBtnClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleExited() {
    setaddView(false);
  }

  function handleMenuItemClick(event, id) {
    setSelectedId(id);
    setAnchorEl(null);
  }

  function handleAddViewClick() {
    setaddView(true);
  }

  function handleCancel() {
    setaddView(false);
  }

  function handleAddViewDelete(e, id) {
    e.stopPropagation();
    // Reset the selected view to default if the view being deleted is selected
    if (selectedId === id) {
      setSelectedId(0);
    }
    setOptions(options.filter(option => option.id !== id));
  }

  function dataFormatter(dataToFormat) {
    return dataToFormat.map(
      ({
        name,
        uuid,
        surveySections,
        availableContexts,
        completedSubmissionUuids,
        lastCompletedSubmission,
      }) =>
        formatData(
          name,
          uuid,
          surveySections.reduce(
            (acc, section) => acc + section.surveyQuestionUuids.length,
            0
          ),
          availableContexts.map(context => context.name).join(', '),
          completedSubmissionUuids.length,
          lastCompletedSubmission && lastCompletedSubmission.completedAt
        )
    );
  }

  useEffect(() => {
    if (surveyData && Object.entries(surveyData).length > 0) {
      const {
        surveys,
        _surveysMetaData: { totalCount, totalPages: tp },
      } = surveyData;

      setFilteredResults(surveys.length);
      setTotalResults(totalCount);
      setTotalPages(tp);
      if (totalCount === 0) {
        setCurrentPage(1);
      }
    }
  }, [surveyData]);

  if (error || allDataError || allFilteredDataError || allContextsError) {
    return generalErrorHandler(
      error || allDataError || allFilteredDataError || allContextsError,
      {
        ...rest,
      }
    );
  }

  return (
    <SurveyListStyle>
      <Grid
        className={classes.surveyListHeader}
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <ViewHeader
            component="Survey List"
            body={intl.formatMessage(messages.surveyListHeader)}
          />
        </Grid>
        <Grid item>
          <HeaderButton
            version={4}
            bgColor={colors.TEXT.medium}
            padding={lookUpBtn.padding}
            click={handleBtnClick}
            menu={
              <TableViews
                anchorEl={anchorEl}
                addView={addView}
                options={options}
                selectedId={selectedId}
                handleClose={handleClose}
                handleExited={handleExited}
                handleCancel={handleCancel}
                handleMenuItemClick={handleMenuItemClick}
                handleAddViewDelete={handleAddViewDelete}
                handleAddViewClick={handleAddViewClick}
              />
            }
          >
            <LookUp />
          </HeaderButton>
          <HeaderButton
            version={1}
            id="export-data"
            bgColor={colors.TEXT.medium}
            padding={exportBtn.padding}
            disabled={allDataLoading}
            onClick={() => handleExport(dataFormatter(allData.surveys))}
          >
            <>
              <OpenInNew className={classes.exportBtn} />
              {intl.formatMessage(tableMessages.export)}
            </>
          </HeaderButton>
          <HeaderButton
            version={1}
            bgColor={colors.LINKS.link}
            padding={newSurveyBtn.padding}
          >
            <>
              <Add className={classes.newSurveyBtn} />
              {intl.formatMessage(globalMessages.newSurvey)}
            </>
          </HeaderButton>
        </Grid>
      </Grid>
      <Divider light />
      <NSTable
        arialLabels={{ checkboxes: 'select all surveys' }}
        toolbarActions={toolbarActions}
        name="surveysTable"
        columns={columnsData}
        horizActions={horizActions}
        data={!loading && surveyData ? dataFormatter(surveyData.surveys) : []}
        filiteredRecordsUuid={
          allFilteredDataLoading ? [] : allFilteredData.surveys.map(d => d.uuid)
        }
        rowsPerPageProps={{ rowsPerPage, setRowsPerPage }}
        orderByProps={{ orderBy, setOrderBy }}
        orderProps={{ order, setOrder }}
        pageProps={{ currentPage, setCurrentPage }}
        tableSearchProps={{ tableSearch, setTableSearch }}
        lastUpdateProps={{ lastUpdate, setLastUpdate }}
        dateRangeProps={{ dateRange, setDateRange }}
        filterQueryTriggers={{
          availableContexts: setContexts,
        }}
        totalResults={totalResults}
        totalPages={totalPages}
        loading={loading}
        filteredResults={filteredResults}
        mapColumnIds={mapColumnIds}
        selected={selected}
        setSelected={setSelected}
        formattedColumns={formattedColumns}
        filterTitles={messages}
        showCheckboxes
        showTableSettings
        enableSearch
        enableFilters
      />
    </SurveyListStyle>
  );
}
SurveyList.propTypes = {
  intl: intlShape.isRequired,
  localOrg: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  localOrg: makeSelectOrg(),
});

const IntlSurveyList = injectIntl(SurveyList);

export default connect(mapStateToProps)(IntlSurveyList);
