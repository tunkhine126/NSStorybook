/* eslint-disable prettier/prettier */
/**
 *
 * NSTableBody
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import CustomCheckBox from '../Icons copy/customCheckbox';
import CheckboxChecked from '../Icons copy/checkboxChecked';
import Horiz from '../Horiz/index';

import { styles } from './styles';

const NSColumn = ({ direction, justify, alignItems, content }) => {
  const classes = styles();

  return (
    <TableCell scope="row" className={classes.tableCell}>
      <Grid
        container
        direction={direction}
        justify={justify}
        alignItems={alignItems}
      >
        {content}
      </Grid>
    </TableCell>
  );
};

NSColumn.propTypes = {
  direction: PropTypes.string.isRequired,
  justify: PropTypes.string.isRequired,
  alignItems: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
};

function NSTableBody({
  columns,
  formattedColumns,
  data,
  density,
  showCheckboxes,
  showTableSettings,
  horizActions,
  handleClick,
  isSelected,
  loading,
}) {
  const classes = styles();
  const columnsToShow = formattedColumns.filter((column, idx) =>
    columns[idx]
      ? column.columnId === columns[idx].id && columns[idx].show
      : null
  );

  const LoadingColumn = ({ rows }) => (
    <TableCell scope="row" className={classes.tableCell}>
      <Grid container direction="column">
        {rows.map((_, idx) => (
          <Skeleton key={idx} />
        ))}
      </Grid>
    </TableCell>
  );

  LoadingColumn.propTypes = {
    rows: PropTypes.array.isRequired,
  };

  const loadingRow = [];
  const loadingList =
    data.length > 0
      ? data
      : [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  loadingList.forEach((_, i) => {
    loadingRow.push(
      <TableRow hover tabIndex={-1} style={{ height: density }} key={i}>
        {showCheckboxes && (
          <TableCell padding="checkbox" className={classes.tableCell}>
            <Grid container direction="column" className={classes.skeletonGrid}>
              <Skeleton />
            </Grid>
          </TableCell>
        )}
        {columnsToShow.map((c, k) => (
          <LoadingColumn key={k} rows={c.loadingRows} />
        ))}
        {showTableSettings && (
          <TableCell padding="checkbox" className={classes.tableCell}>
            <Grid container direction="column" className={classes.skeletonGrid}>
              <Skeleton />
            </Grid>
          </TableCell>
        )}
      </TableRow>
    );
  });

  return (
    <TableBody>
      {loading
        ? loadingRow
        : data.map((row, index) => {
          const isItemSelected = isSelected(row.id);
          const labelId = `checkbox-${index}`;

          return (
            <TableRow
              hover
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
              style={{ height: density }}
            >
              {showCheckboxes && (
                <TableCell padding="checkbox" className={classes.tableCell}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item className={classes.checkboxHeight}>
                      <Checkbox
                        checked={isItemSelected}
                        onClick={e => handleClick(e, row.id)}
                        inputProps={{ 'aria-labelledby': labelId }}
                        icon={<CustomCheckBox />}
                        checkedIcon={<CheckboxChecked />}
                      />
                    </Grid>
                  </Grid>
                </TableCell>
              )}

              {columnsToShow.map(
                ({ direction, justify, alignItems, content }, idx) => (
                  <NSColumn
                    key={idx}
                    direction={direction}
                    justify={justify}
                    alignItems={alignItems}
                    content={content(row, idx)}
                  />
                )
              )}

              {showTableSettings && horizActions && horizActions.length > 0 ? (
                <TableCell scope="row" className={classes.tableCell}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <Horiz
                        parentClasses={classes}
                        id={row.id}
                        actions={horizActions}
                      />
                    </Grid>
                  </Grid>
                </TableCell>
              ) : (
                <TableCell scope="row" className={classes.tableCell}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item className={classes.columnHeight} />
                  </Grid>
                </TableCell>
              )}
            </TableRow>
          );
        })}
    </TableBody>
  );
}

NSTableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  formattedColumns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  density: PropTypes.string.isRequired,
  showCheckboxes: PropTypes.bool.isRequired,
  showTableSettings: PropTypes.bool.isRequired,
  horizActions: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NSTableBody;
