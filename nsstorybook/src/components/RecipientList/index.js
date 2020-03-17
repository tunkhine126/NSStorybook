/* eslint-disable react/prop-types */
/**
 *
 * RecipientList
 *
 */

import React, { useEffect, useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { ExportToCsv } from 'export-to-csv';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Add from '@material-ui/icons/Add';
import OpenInNew from '@material-ui/icons/OpenInNew';
// import Edit from '@material-ui/icons/Edit';
// import ImportExport from '@material-ui/icons/ImportExport';

import NSTable from '../NSTable/index';
import LookUp from '../Icons copy/lookup';
import HeaderButton from '../HeaderButton/index';
import ViewHeader from '../ViewHeader/index';
import tableMessages from '../NSTable/messages';
import TableViews from '../NSTable/tableViews';
import { makeSelectOrg } from '../../containers/App/selectors';
import { GET_RECIPIENTS } from '../../graphql/queries/recipients';
import {
  GET_ALL_RECIPIENTS,
  GET_ALL_FILTERED_RECIPIENTS,
  GET_ALL_SURVEYS,
} from '../../graphql/queries/all-queries';
import colors from '../../global-styles';
import { generalErrorHandler } from '../../utils/error-handler';
import globalMessages from '../../messages';
import { formattedColumns as importedFC, generateColumns } from './helper';
import {
  RecipientListStyle,
  helperClasses,
  recipientListStyles,
} from './styles';

function RecipientList({
  intl,
  localOrg,
  details,
  preSetFilterId,
  preSetFilterName,
  disableHeader,
  ...rest
}) {
  const { lookUpBtn, exportBtn, newFamilyBtn } = helperClasses;
  const {
    title,
    addRecipientName,
    columns,
    hierarchyId,
    recipientDefintionUuid,
    hasParentRecipient,
    nestedRecipientTree,
    childRoutes,
  } = details;

  const hasCompletedSurveys = Boolean(
    columns.find(c => c.id === 'completedSurveys')
  );

  const defaultState = { query: null, chips: [] };
  const classes = recipientListStyles();

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

  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [orderBy, setOrderBy] = useState('updated_at');
  const [order, setOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredResults, setFilteredResults] = useState(0);
  const [tableSearch, setTableSearch] = useState('');
  const [lastUpdate, setLastUpdate] = useState(defaultState);
  const [dateRange, setDateRange] = useState({ before: null, after: null });
  const [completedSurveys, setCompletedSurveys] = useState(defaultState);
  const [parentRecipients, setParentRecipient] = useState(
    !disableHeader
      ? defaultState
      : { query: [preSetFilterId], chips: [preSetFilterName] }
  );

  const columnsToUse = columns
    .filter(c => {
      if (!hasCompletedSurveys) {
        return c.id !== 'completedSurveys';
      }
      return c;
    })
    .filter(c => {
      if (!hasParentRecipient) {
        return c.id !== 'parentRecipients';
      }
      return c;
    })
    .filter(c => {
      if (hierarchyId === 0) {
        return c.id !== 'childRecipients';
      }
      return c;
    });

  const customDate = lastUpdate.query === 'custom';
  const userOrg = localOrg.uuid;

  const { loading, error, data: recipientData } = useQuery(GET_RECIPIENTS, {
    variables: {
      resultsPerPage: rowsPerPage,
      surveyUuids: completedSurveys.query,
      parentUuids: parentRecipients.query,
      skip: currentPage > 1 ? rowsPerPage * (currentPage - 1) : 0,
      sortColumn: orderBy,
      sortDirection: order,
      nameContains: tableSearch,
      internalIdContains: tableSearch,
      organizationUuid: userOrg,
      recipientDefinitionUuid: recipientDefintionUuid,
      lastSyncedAt: customDate ? null : lastUpdate.query,
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
  } = useQuery(GET_ALL_RECIPIENTS, {
    variables: {
      sortColumn: orderBy,
      sortDirection: order,
      organizationUuid: userOrg,
      recipientDefinitionUuid: recipientDefintionUuid,
    },
  });

  const {
    loading: allFilteredDataLoading,
    error: allFilteredDataError,
    data: allFilteredData,
  } = useQuery(GET_ALL_FILTERED_RECIPIENTS, {
    variables: {
      surveyUuids: completedSurveys.query,
      parentUuids: parentRecipients.query,
      sortColumn: orderBy,
      sortDirection: order,
      nameContains: tableSearch,
      internalIdContains: tableSearch,
      organizationUuid: userOrg,
      recipientDefinitionUuid: recipientDefintionUuid,
      lastSyncedAt: customDate ? null : lastUpdate.query,
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

  useEffect(() => {
    if (recipientData && Object.entries(recipientData).length > 0) {
      const {
        recipients,
        _recipientsMetaData: { totalCount, totalPages: tp },
      } = recipientData;

      setFilteredResults(recipients.length);
      setTotalResults(totalCount);
      setTotalPages(tp);
      if (totalCount === 0) {
        setCurrentPage(1);
      }
    }
  }, [recipientData, loading]);

  if (error || allDataError || allFilteredDataError || allSurveysError) {
    return generalErrorHandler(
      error || allDataError || allFilteredDataError || allSurveysError,
      {
        ...rest,
      }
    );
  }

  const mapColumnIds = {
    lastUpdate: 'updated_at',
    id: 'internal_id',
    recipientName: 'name',
  };

  const csvHeaders = columnsToUse.map(c => c.label);

  const toolbarActions = [
    {
      title: intl.formatMessage(tableMessages.createSurvReq),
      disable: allDataLoading,
      handleClick: () => {
        // TODO: Revisit
        console.log('Creating Survey');
      },
    },
    {
      title: intl.formatMessage(tableMessages.export),
      disable: allDataLoading,
      handleClick: () => {
        const dataToExport = selected.map(id =>
          dataFormatter(allData.recipients, true).find(item => item.id === id)
        );

        handleExport(dataToExport);
      },
    },
  ];

  const formattedColumns = importedFC(classes, columnsToUse);

  // const horizActions = [
  //   {
  //     route: '/survey-requests',
  //     icon: Add,
  //     text: intl.formatMessage(messages.surveyRequests),
  //   },
  //   {
  //     route: '/survey-requests/edit',
  //     icon: Edit,
  //     text: intl.formatMessage(messages.editSurveyRequests),
  //   },
  //   {
  //     route: '/update-status',
  //     icon: ImportExport,
  //     text: intl.formatMessage(messages.updateStatus),
  //   },
  // ];

  const dateRangeFormat = `After ${moment(dateRange.after).format(
    'MMM DD, YYYY'
  )} - Before ${moment(dateRange.before).format('MMM DD, YYYY')}`;

  const columnsData = generateColumns(
    [
      {
        id: 'completedSurveys',
        loading: allSurveysLoading,
        list: (allSurveys.surveys || []).map(d => ({
          id: d.uuid,
          label: d.name,
          count: d.submissionUuids.length,
          selected: false,
        })),
        chips: completedSurveys.chips,
        clear: () => setCompletedSurveys(defaultState),
      },
      {
        id: 'parentRecipients',
        loading: false,
        list: nestedRecipientTree,
        chips: parentRecipients.chips,
        clear: () => setParentRecipient(defaultState),
      },
      {
        id: 'lastUpdate',
        chips: dateRange.before ? [dateRangeFormat] : lastUpdate.chips,
        clear: () => {
          setLastUpdate(defaultState);
          setDateRange({ before: null, after: null });
        },
      },
    ],
    columnsToUse
  );

  function handleExport(dataToExport) {
    const exportOptions = {
      filename: `${title.replace(/ /g, '-')}-List`,
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
      delete d.uuid;
      delete d.recipientPath;
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

  function dataFormatter(dataToFormat, exportingData) {
    return dataToFormat.map(
      ({
        children,
        parent,
        uuid,
        internalId,
        name,
        submissionUuids,
        updatedAt,
      }) => {
        const parentRecipientName = parent ? parent.name : null;

        let tempObjStructure = {
          recipientPath: childRoutes[0].path,
          parentRecipients: parentRecipientName,
          uuid,
        };

        const arr = [
          name,
          internalId,
          submissionUuids.length,
          children.length,
          updatedAt,
        ];

        if (!hasCompletedSurveys) {
          arr.splice(2, 1);
        }

        if (hierarchyId === 0) {
          arr.splice(arr.length - 2, 1);
        }

        columnsToUse
          .filter(c => !c.noColumn)
          .map(({ id }) => id)
          .forEach((c, idx) => {
            tempObjStructure = {
              ...tempObjStructure,
              [c === 'uuid' ? 'id' : c]: arr[idx],
            };
          });

        // Restructure Object for exporting
        if (exportingData) {
          let newObjStructure = {};

          columnsToUse.forEach(c => {
            newObjStructure = {
              ...newObjStructure,
              [c.id]: tempObjStructure[c.id],
            };
          });

          return newObjStructure;
        }
        return tempObjStructure;
      }
    );
  }

  let filterTitles = {};

  columnsToUse.forEach(f => {
    if (f.filter) {
      filterTitles = { ...filterTitles, [f.id]: f.label };
    }
  });

  return (
    <RecipientListStyle>
      {!disableHeader && (
        <>
          <Grid
            className={classes.recipientListHeader}
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <ViewHeader component={title} body={title} />
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
                onClick={() =>
                  handleExport(dataFormatter(allData.recipients, true))
                }
              >
                <>
                  <OpenInNew className={classes.exportBtn} />
                  {intl.formatMessage(tableMessages.export)}
                </>
              </HeaderButton>
              <HeaderButton
                version={1}
                bgColor={colors.LINKS.link}
                padding={newFamilyBtn.padding}
              >
                <>
                  <Add className={classes.newFamilyBtn} />
                  {addRecipientName}
                </>
              </HeaderButton>
            </Grid>
          </Grid>
          <Divider light />
        </>
      )}
      <NSTable
        arialLabels={{ checkboxes: 'select all recipients' }}
        toolbarActions={toolbarActions}
        name={`${title}Table`}
        columns={columnsData}
        horizActions={[]}
        data={
          !loading && recipientData
            ? dataFormatter(recipientData.recipients)
            : []
        }
        filiteredRecordsUuid={
          allFilteredDataLoading
            ? []
            : allFilteredData.recipients.map(d => d.uuid)
        }
        rowsPerPageProps={{ rowsPerPage, setRowsPerPage }}
        orderByProps={{ orderBy, setOrderBy }}
        orderProps={{ order, setOrder }}
        pageProps={{ currentPage, setCurrentPage }}
        tableSearchProps={{ tableSearch, setTableSearch }}
        lastUpdateProps={{ lastUpdate, setLastUpdate }}
        dateRangeProps={{ dateRange, setDateRange }}
        filterQueryTriggers={{
          completedSurveys: setCompletedSurveys,
          parentRecipients: setParentRecipient,
        }}
        totalResults={totalResults}
        totalPages={totalPages}
        loading={loading}
        filteredResults={filteredResults}
        mapColumnIds={mapColumnIds}
        selected={selected}
        setSelected={setSelected}
        formattedColumns={formattedColumns}
        filterTitles={filterTitles}
        showCheckboxes
        showTableSettings
        enableSearch
        enableFilters
      />
    </RecipientListStyle>
  );
}
RecipientList.propTypes = {
  intl: intlShape.isRequired,
  localOrg: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  disableHeader: PropTypes.bool,
};

const IntlRecipientList = injectIntl(RecipientList);

const mapStateToProps = createStructuredSelector({
  localOrg: makeSelectOrg(),
});

export default connect(mapStateToProps)(IntlRecipientList);
