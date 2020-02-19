import React from 'react';
import clsx from 'clsx';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import LinkRouter from 'components/shared/LinkRouter';

export const formattedColumns = (classes, columns) =>
  columns
    .filter(c => !c.noColumn)
    .map((c, idx) => ({
      direction: idx === 0 ? 'column' : 'row',
      justify: idx < 2 ? 'flex-start' : 'center',
      alignItems: 'flex-start',
      columnId: c.id,
      loadingRows: [{}, {}],
      content(row) {
        const rowData = row[c.id];

        return idx === 0 ? (
          <>
            <Grid item>
              <LinkRouter
                color="primary"
                className={clsx(classes.recipientLink, 'recipientColumn')}
                to={row.recipientPath.replace(':id', row.uuid)}
              >
                {rowData}
              </LinkRouter>
            </Grid>
            {row.parentRecipients && (
              <Grid item className={classes.familyCommunity}>
                <Typography variant="caption" className={classes.caption}>
                  {row.parentRecipients}
                </Typography>
              </Grid>
            )}
          </>
        ) : (
          <Grid item className={classes.columnHeight}>
            {c.type === 'date'
              ? moment(rowData).format('MMMM DD, YYYY')
              : rowData}
          </Grid>
        );
      },
    }));

export const generateColumns = (data, columns) =>
  columns.map(column => {
    const columnData = data.find(d => d.id === column.id);
    if (columnData) {
      column.columnData = columnData;
    }
    return column;
  });
