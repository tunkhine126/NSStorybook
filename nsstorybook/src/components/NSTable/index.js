/**
 *
 * NSTable
 *
 */

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'fast-deep-equal';
import { injectIntl, intlShape } from 'react-intl';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import resizableGrid from '../../utils/tableResizer';
import NSTableHead from '../NSTable/nsTableHead';
import NSFilters from '../NSTable/nsTableHead';
import PaginationControls from '../NSTable/paginationControls';
import NSTableBody from '../NSTable/nsTableBody';
import { NSFiltersProvider } from './context/filters';
import tableMessages from './messages';

import { styles, TableStyleWrapper } from './styles';

const isSame = (prev, next) => {
  // Removing Properties that doesn't need checking
  const ignoreProps = columns => ({
    arialLabels: null,
    formattedColumns: null,
    name: null,
    setSelected: null,
    toolbarActions: null,
    horizActions: null,
    columns: columns.map(item => ({ ...item, custom: null })),
  });
  const prevScrubed = {
    ...prev,
    ...ignoreProps(prev.columns),
  };
  const nextScrubed = {
    ...next,
    ...ignoreProps(next.columns),
  };

  return isEqual(prevScrubed, nextScrubed);
};

function NSTable({
  intl,
  name,
  horizActions = [],
  showCheckboxes = true,
  showTableSettings = true,
  selectAllLoading = false,
  arialLabels,
  filterTitles,
  data,
  selected,
  setSelected,
  formattedColumns,
  columns,
  enableSearch,
  enableFilters,
  rowsPerPageProps: { rowsPerPage, setRowsPerPage },
  orderByProps: { orderBy, setOrderBy },
  orderProps: { order, setOrder },
  pageProps: { currentPage, setCurrentPage },
  filterQueryTriggers,
  dateRangeProps = {},
  tableSearchProps,
  lastUpdateProps = {},
  filteredResults,
  totalResults,
  totalPages,
  mapColumnIds,
  loading,
  toolbarActions = [],
  filiteredRecordsUuid,
}) {
  const classes = styles();
  const tableRef = useRef();
  const [density, setDensity] = useState('72px');
  const [nsFormattedColumns, setNSFormattedColumns] = useState(
    formattedColumns
  );
  const [allSelectedPages, setAllSelectedPages] = useState([]);

  const headerRowColumns = columns.filter(column =>
    formattedColumns.find(fm => fm.columnId === column.id)
  );
  const [columnsData, setColumnsData] = useState(headerRowColumns);

  const setInitalViewState = useCallback(
    (rpp = rowsPerPage) => {
      const pages = [];
      for (let i = 1; i <= Math.ceil(totalResults / rpp); i += 1) {
        pages.push({ page: i, selected: [] });
      }
      return pages;
    },
    [rowsPerPage, totalResults]
  );

  useEffect(() => {
    let removeEventListners = null;
    if (tableRef.current) {
      removeEventListners = resizableGrid(tableRef.current, '#797979').dismount;
    }
    setAllSelectedPages(setInitalViewState());

    return () => {
      if (tableRef) {
        removeEventListners();
      }
    };
  }, [columnsData, setInitalViewState]);

  const isSelected = id => selected.indexOf(id) !== -1;

  function handleReorder(updatedColumnData) {
    const reOrderedColumns = [];
    updatedColumnData.forEach((column, index) => {
      reOrderedColumns[index] = {
        ...nsFormattedColumns.find(item => item.columnId === column.id),
      };
    });
    setColumnsData(updatedColumnData);
    setNSFormattedColumns(reOrderedColumns);
  }

  const handleDensityChange = (e, newDensity) => {
    setDensity(newDensity || '72px');
  };

  function handleOrderyBy(event, columnId) {
    const newOrder = o => (o === 'asc' ? 'desc' : 'asc');
    setOrder(newOrder(order));
    setOrderBy(mapColumnIds[columnId]);
  }

  function handleSelectAllClick(event, items) {
    // Select All Items
    if (event.target.parentElement.classList.contains('select-all-link')) {
      setSelected(filiteredRecordsUuid);
      setAllSelectedPages(currentState =>
        currentState.map((item, idx) => {
          let pageSelected = [];
          const condition = allSelectedPages[idx + 1]
            ? rowsPerPage
            : totalResults - (item.page * rowsPerPage - rowsPerPage);

          for (
            let i = idx * rowsPerPage;
            i < idx * rowsPerPage + condition;
            i += 1
          ) {
            pageSelected = [...pageSelected, filiteredRecordsUuid[i]];
          }
          item.selected = pageSelected;
          return item;
        })
      );
      return;
    }
    // Select All items on current page
    if (event.target.checked) {
      const newSelected = [];
      const currentPageSelected = [];

      items.forEach(item => {
        if (!selected.includes(item.id)) {
          newSelected.push(item.id);
        }
        currentPageSelected.push(item.id);
      });

      if (
        allSelectedPages.length > 0 &&
        allSelectedPages.find(item => item.page === currentPage)
      ) {
        setAllSelectedPages(currentState =>
          currentState.map(item => {
            if (item.page === currentPage) {
              item.selected = currentPageSelected;
            }
            return item;
          })
        );
      } else {
        setAllSelectedPages(currentState => [
          ...currentState,
          { currentPage, selected: currentPageSelected },
        ]);
      }

      setSelected(currentState => [...currentState, ...newSelected]);
      return;
    }

    if (!event.target.checked) {
      setAllSelectedPages(currentState =>
        currentState.map(item => {
          item.selected = [];
          return item;
        })
      );

      setSelected(
        selected.filter(
          item => !items.find(selectedItem => item === selectedItem.id)
        )
      );
    }
    if (selected.length === totalResults) {
      setSelected([]);
    }
  }

  function handleClick(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setAllSelectedPages(currentState =>
      currentState.map(item => {
        if (item.page === currentPage) {
          if (newSelected.find(arrId => arrId === id) === id) {
            item.selected = [...item.selected, id];
          } else {
            item.selected = item.selected.filter(itemId => itemId !== id);
          }
        }

        return item;
      })
    );

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setCurrentPage(newPage);
  }

  function handleRowChange(number) {
    setRowsPerPage(number);
    setCurrentPage(1);
    setSelected([]);
    setAllSelectedPages(setInitalViewState(number));
  }

  function handleColumnChange(e, id) {
    setColumnsData(
      columnsData.map(column => {
        if (column.id === id) {
          column.show = e.target.checked;
        }
        return column;
      })
    );
  }

  return (
    <>
      <NSFiltersProvider
        filterCategories={columns}
        dateRangeProps={dateRangeProps}
        lastUpdateProps={lastUpdateProps}
        handleSelected={setSelected}
      >
        <NSFilters
          filterTitles={filterTitles}
          enableSearch={enableSearch}
          enableFilters={enableFilters}
          tableSearchProps={tableSearchProps}
          handleSelected={setSelected}
          handlePageChange={setCurrentPage}
          filterQueryTriggers={filterQueryTriggers}
        />
      </NSFiltersProvider>

      <TableStyleWrapper>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Table
              ref={tableRef}
              className={classes.table}
              aria-labelledby={name}
              size="medium"
            >
              <NSTableHead
                totalResults={totalResults}
                totalPossibleItems={rowsPerPage}
                loading={loading}
                selectAllLoading={selectAllLoading}
                mapColumnIds={mapColumnIds}
                columns={columnsData}
                data={data}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                allSelectedPages={allSelectedPages}
                currentPage={currentPage}
                onRequestSort={handleOrderyBy}
                arialLabels={arialLabels}
                toolbarActions={toolbarActions}
                showCheckboxes={showCheckboxes}
                showTableSettings={showTableSettings}
                columnChange={handleColumnChange}
                densityChange={handleDensityChange}
                density={density}
                rowChange={handleRowChange}
                handleReorder={handleReorder}
              />
              <NSTableBody
                columns={columnsData}
                formattedColumns={nsFormattedColumns}
                isSelected={isSelected}
                handleClick={handleClick}
                loading={loading}
                data={data}
                density={density}
                showCheckboxes={showCheckboxes}
                showTableSettings={showTableSettings}
                horizActions={horizActions}
              />
            </Table>

            {!loading && data.length === 0 && (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.notFoundContainer}
              >
                <Typography className={classes.body} variant="body1">
                  {intl.formatMessage(tableMessages.noRequests)}
                </Typography>
              </Grid>
            )}

            {!loading && data.length > 0 && (
              <TablePagination
                className={classes.paginationContainer}
                rowsPerPageOptions={[10, 15, 20]}
                labelDisplayedRows={() => ''}
                labelRowsPerPage=""
                component="div"
                count={totalResults}
                rowsPerPage={rowsPerPage}
                page={currentPage - 1}
                ActionsComponent={() => (
                  <PaginationControls
                    totalPages={totalPages}
                    resultCount={filteredResults}
                    count={totalResults}
                    currentPage={currentPage}
                    onChangePage={handleChangePage}
                  />
                )}
                backIconButtonProps={{
                  'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
              />
            )}
          </Paper>
        </div>
      </TableStyleWrapper>
    </>
  );
}

NSTable.propTypes = {
  intl: intlShape.isRequired,
  name: PropTypes.string.isRequired,
  filterTitles: PropTypes.object.isRequired,
  formattedColumns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  rowsPerPageProps: PropTypes.object.isRequired,
  orderByProps: PropTypes.object.isRequired,
  orderProps: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
  tableSearchProps: PropTypes.object.isRequired,
  filteredResults: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  mapColumnIds: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  filiteredRecordsUuid: PropTypes.array.isRequired,
  horizActions: PropTypes.array,
  dateRangeProps: PropTypes.object,
  lastUpdateProps: PropTypes.object,
  filterQueryTriggers: PropTypes.object,
  toolbarActions: PropTypes.array,
  showCheckboxes: PropTypes.bool,
  showTableSettings: PropTypes.bool,
  arialLabels: PropTypes.object,
  enableSearch: PropTypes.bool,
  enableFilters: PropTypes.bool,
  selectAllLoading: PropTypes.bool,
};

const IntlNSTable = injectIntl(NSTable);

export default memo(IntlNSTable, isSame);
