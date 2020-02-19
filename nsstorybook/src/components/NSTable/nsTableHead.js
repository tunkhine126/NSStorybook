/**
 *
 * NSTableHead
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl, intlShape } from 'react-intl';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';

import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TextLink from 'components/shared/TextLink';
import CustomCheckBox from 'components/shared/Icons/customCheckbox';
import CheckboxChecked from 'components/shared/Icons/checkboxChecked';
import IntermediateCheckbox from 'components/shared/Icons/intermediateCheckbox';
import TableSettings from './TableSettings';
import messages from './messages';
import {
  headerRowStyles,
  helperClasses,
  tableCellStyles,
  useToolbarStyles,
  styles,
} from './styles';

const TableToolbar = ({
  numSelected,
  intl,
  toolbarActions,
  totalItems,
  onSelectAllClick,
  selectAllLoading,
}) => {
  const ttClasses = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(
        ttClasses.root,
        ttClasses.highlight,
        'optionToolBar',
        'bounceInDown',
        'animated',
        'faster'
      )}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <div className={ttClasses.title}>
            {numSelected > 0 ? (
              <Typography color="inherit" variant="body2">
                {`${
                  totalItems === numSelected
                    ? intl.formatMessage(messages.all)
                    : ''
                } ${numSelected} ${intl.formatMessage(
                  messages[numSelected > 1 ? 'itemsSelected' : 'itemSelected']
                )} -`}
                <TextLink
                  disable={selectAllLoading}
                  content={`${intl.formatMessage(
                    messages.selectAll
                  )} ${totalItems} ${intl.formatMessage(messages.items)}`}
                  onClick={onSelectAllClick}
                  className={clsx(ttClasses.selectAllText, 'select-all-link')}
                />
              </Typography>
            ) : null}
          </div>
          <div className={ttClasses.spacer} />
        </Grid>
        <Grid item>
          {toolbarActions.map(({ title, handleClick, disable }, idx) => (
            <TextLink
              key={idx}
              disable={disable}
              content={title}
              onClick={handleClick}
              className={clsx(ttClasses.optionToolBarText, 'optionToolBarText')}
            />
          ))}
        </Grid>
      </Grid>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  toolbarActions: PropTypes.array,
  selectAllLoading: PropTypes.bool,
};

const IntlTableToolbar = injectIntl(TableToolbar);

function NSTableHead({
  selectAllLoading,
  totalResults,
  mapColumnIds,
  columns,
  showCheckboxes,
  showTableSettings,
  arialLabels,
  onSelectAllClick,
  currentPage,
  allSelectedPages,
  order,
  orderBy,
  numSelected,
  toolbarActions,
  onRequestSort,
  columnChange,
  densityChange,
  density,
  rowChange,
  handleReorder,
  data,
  loading,
  totalPossibleItems,
}) {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  const headerClasses = headerRowStyles();
  const { columnTools } = helperClasses;
  const classes = styles();

  const viewDetails =
    allSelectedPages[allSelectedPages.findIndex(i => i.page === currentPage)];

  const allCheckedInView = viewDetails
    ? viewDetails.selected.length === data.length
    : false;

  const someChecked = viewDetails
    ? viewDetails.selected.length > 0 &&
      viewDetails.selected.length < totalPossibleItems
    : false;

  return (
    <TableHead className={classes.tableHead}>
      <TableRow className={classes.tableHeadRow}>
        {showCheckboxes && (
          <TableCell
            width={columnTools.width}
            className={clsx(classes.tableHeadText, classes.stickyHeader)}
            padding="none"
          >
            <Checkbox
              className={clsx(classes.checkBoxBg, 'select-all-checkBox')}
              indeterminate={!loading && someChecked && !allCheckedInView}
              disabled={loading || data.length === 0}
              checked={!loading && data.length > 0 && allCheckedInView}
              onChange={e => onSelectAllClick(e, data)}
              inputProps={{
                'aria-label': arialLabels ? arialLabels.checkboxes : '',
              }}
              icon={<CustomCheckBox />}
              checkedIcon={<CheckboxChecked />}
              indeterminateIcon={<IntermediateCheckbox />}
            />
          </TableCell>
        )}
        {columns.map(row => {
          if (row.show) {
            const defaultWidth = row.defaultWidth ? row.defaultWidth : 'auto';
            if (row.sortable && !row.custom) {
              return (
                <TableCell
                  width={defaultWidth}
                  classes={headerClasses}
                  className={clsx(classes.tableHeadText, classes.stickyHeader)}
                  key={row.id}
                  padding={row.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === row.id ? order : false}
                  align={row.align}
                >
                  <TableSortLabel
                    active={orderBy === mapColumnIds[row.id]}
                    direction={order}
                    onClick={createSortHandler(row.id)}
                    IconComponent={ExpandLess}
                  >
                    {row.label}
                    {orderBy === row.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              );
            }
            return (
              <TableCell
                width={defaultWidth}
                classes={headerClasses}
                className={clsx(classes.tableHeadText, classes.stickyHeader)}
                key={row.id}
                padding={row.disablePadding ? 'none' : 'default'}
                align={row.align}
              >
                <Typography
                  variant="body1"
                  className={clsx(classes.nonSortableText)}
                  style={{
                    marginLeft: row.align === 'left' ? 'auto' : -25,
                  }}
                >
                  {row.custom ? row.custom : row.label}
                </Typography>
              </TableCell>
            );
          }
          return null;
        })}
        {showTableSettings && (
          <TableCell
            width={columnTools.width}
            classes={headerClasses}
            className={clsx(classes.tableHeadText, classes.stickyHeader)}
            padding="none"
            align="center"
          >
            <DndProvider backend={HTML5Backend}>
              <TableSettings
                columns={columns}
                density={density}
                columnChange={columnChange}
                densityChange={densityChange}
                rowChange={rowChange}
                handleReorder={handleReorder}
              />
            </DndProvider>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={7}
          padding="none"
          classes={tableCellStyles()}
          className={clsx(classes.toolBarSticky, classes.stickyHeader)}
        >
          {!loading && data.length > 0 && numSelected > 0 && (
            <IntlTableToolbar
              numSelected={numSelected}
              toolbarActions={toolbarActions}
              totalItems={totalResults}
              onSelectAllClick={onSelectAllClick}
              selectAllLoading={selectAllLoading}
            />
          )}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

NSTableHead.propTypes = {
  totalResults: PropTypes.number.isRequired,
  mapColumnIds: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  allSelectedPages: PropTypes.array.isRequired,
  densityChange: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  columnChange: PropTypes.func.isRequired,
  rowChange: PropTypes.func.isRequired,
  density: PropTypes.string.isRequired,
  handleReorder: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  totalPossibleItems: PropTypes.number.isRequired,
  arialLabels: PropTypes.object,
  toolbarActions: PropTypes.array,
  showCheckboxes: PropTypes.bool,
  showTableSettings: PropTypes.bool,
  selectAllLoading: PropTypes.bool,
};

export default NSTableHead;
