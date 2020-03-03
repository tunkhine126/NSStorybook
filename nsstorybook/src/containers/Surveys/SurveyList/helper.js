import React from 'react';
import clsx from 'clsx';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import LinkRouter from 'components/shared/LinkRouter';
import { ROUTES } from 'utils/globalConstants';

export function formatData(
  name,
  id,
  questionsCount,
  availableContexts,
  submissionsCount,
  lastUpdate
) {
  return {
    name,
    id,
    questionsCount,
    availableContexts,
    submissionsCount,
    lastUpdate,
  };
}

export const formattedColumns = classes => [
  {
    direction: 'column',
    justify: 'flex-start',
    alignItems: 'flex-start',
    columnId: 'name',
    loadingRows: [{}, {}],
    content(row) {
      return (
        <>
          <Grid item>
            <LinkRouter
              color="primary"
              className={clsx(classes.surveyTemplate, 'recipientColumn')}
              to={ROUTES.surveys.children[1].path.replace(':id', row.id)}
            >
              {row.name}
            </LinkRouter>
          </Grid>
          <Grid item className={classes.familyCommunity}>
            <Typography variant="caption" className={classes.caption}>
              {row.id}
            </Typography>
          </Grid>
        </>
      );
    },
  },
  {
    direction: 'row',
    justify: 'center',
    alignItems: 'flex-start',
    columnId: 'questionsCount',
    loadingRows: [{}],
    content(row) {
      return (
        <Grid item className={classes.columnHeight}>
          {row.questionsCount}
        </Grid>
      );
    },
  },
  {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-start',
    columnId: 'availableContexts',
    loadingRows: [{}],
    content(row) {
      return (
        <Grid item className={classes.columnHeight}>
          {row.availableContexts}
        </Grid>
      );
    },
  },
  {
    direction: 'row',
    justify: 'center',
    alignItems: 'flex-start',
    columnId: 'submissionsCount',
    loadingRows: [{}],
    content(row) {
      return (
        <Grid item className={classes.columnHeight}>
          {row.submissionsCount}
        </Grid>
      );
    },
  },
  {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-start',
    columnId: 'lastUpdate',
    loadingRows: [{}],
    content(row) {
      return (
        <Grid item className={classes.columnHeight}>
          {moment(row.lastUpdate).format('MMMM DD, YYYY')}
        </Grid>
      );
    },
  },
];

export const columns = (label, { contextsData, lastUpdateData }) => [
  {
    id: 'name',
    defaultWidth: '300px',
    label: label[0],
    align: 'left',
    type: 'single',
    columnData: null,
    noData: false,
    disablePadding: true,
    show: true,
    sortable: true,
    defaultFilter: false,
    filter: false,
    custom: false,
  },
  {
    id: 'questionsCount',
    defaultWidth: '100px',
    type: 'multi',
    label: label[1],
    align: 'center',
    columnData: null,
    noData: false,
    disablePadding: true,
    show: true,
    sortable: false,
    filter: false,
    defaultFilter: false,
    custom: false,
  },
  {
    id: 'availableContexts',
    defaultWidth: '300px',
    label: label[2],
    filterWidth: 170,
    align: 'left',
    type: 'multi',
    columnData: contextsData,
    noData: false,
    disablePadding: false,
    show: true,
    sortable: false,
    filter: true,
    defaultFilter: false,
    custom: false,
  },
  {
    id: 'submissionsCount',
    defaultWidth: '100px',
    type: 'multi',
    label: label[3],
    align: 'center',
    columnData: null,
    noData: false,
    disablePadding: true,
    show: true,
    sortable: false,
    filter: false,
    defaultFilter: false,
    custom: false,
  },
  {
    id: 'lastUpdate',
    defaultWidth: '200px',
    type: 'date',
    label: label[4],
    columnData: lastUpdateData,
    filterWidth: 150,
    align: 'center',
    noData: true,
    disablePadding: true,
    show: true,
    sortable: false,
    filter: true,
    defaultFilter: true,
    custom: false,
  },
];
