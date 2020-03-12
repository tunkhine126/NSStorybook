import React from 'react';
import clsx from 'clsx';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import LinkRouter from 'components/shared/LinkRouter';
import { ROUTES } from '../../../utils/globalConstants';

export function formatData(
  family,
  community,
  id,
  surveyId,
  recipientUuid,
  familyId,
  survey,
  surveyor,
  completed
) {
  return {
    family,
    community,
    id,
    surveyId,
    recipientUuid,
    familyId,
    survey,
    surveyor,
    completed,
  };
}

export const formattedColumns = (classes, primaryRecipientIdPath) => [
  {
    direction: 'column',
    justify: 'flex-start',
    alignItems: 'flex-start',
    columnId: 'family',
    loadingRows: [{}, {}],
    content(row) {
      return (
        <>
          <Grid item>
            <LinkRouter
              color="primary"
              className={clsx(classes.recipientLink)}
              to={primaryRecipientIdPath.replace(
                ':id',
                `${row.recipientUuid}?tab=2&name=${row.survey}&date=${
                  row.completed
                }`
              )}
            >
              {row.family}
            </LinkRouter>
          </Grid>

          <Grid item className={classes.familyCommunity}>
            <Typography variant="caption" className={classes.caption}>
              {row.community}
            </Typography>
          </Grid>
        </>
      );
    },
  },
  {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-start',
    columnId: 'id',
    loadingRows: [{}],
    content(row) {
      return (
        <Grid item className={classes.columnHeight}>
          {row.familyId}
        </Grid>
      );
    },
  },
  {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-start',
    columnId: 'survey',
    loadingRows: [{}],
    content(row) {
      return (
        <Grid item className={classes.columnHeight}>
          <LinkRouter
            color="primary"
            to={ROUTES.surveys.children[1].path.replace(':id', row.surveyId)}
          >
            {row.survey}
          </LinkRouter>
        </Grid>
      );
    },
  },
  {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-start',
    columnId: 'surveyor',
    loadingRows: [{}],
    content(row) {
      return (
        <Grid item className={classes.columnHeight}>
          <Chip
            component="span"
            avatar={
              <Avatar className={classes.avatar} component="span">
                {row.surveyor.split('')[0]}
              </Avatar>
            }
            label={row.surveyor}
            className={classes.chip}
          />
        </Grid>
      );
    },
  },
  {
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-start',
    columnId: 'completed',
    loadingRows: [{}],
    content(row) {
      return (
        <>
          <Grid item xs={12}>
            {moment(row.completed).format('MMMM DD, YYYY')}
          </Grid>
          <Grid item className={classes.caption}>
            {moment(row.completed)
              .startOf('hour')
              .fromNow()}
          </Grid>
        </>
      );
    },
  },
];

export const columns = (
  label,
  { surveyData, surveyorData, communitiesData, completedData }
) => [
  {
    id: 'family',
    defaultWidth: '150px',
    label: label[0],
    align: 'left',
    type: 'single',
    columnData: null,
    noData: false,
    disablePadding: true,
    show: true,
    sortable: false,
    defaultFilter: false,
    filter: false,
    custom: false,
  },
  {
    id: 'id',
    defaultWidth: '150px',
    label: label[1],
    align: 'left',
    type: 'single',
    columnData: null,
    noData: false,
    disablePadding: false,
    show: true,
    sortable: true,
    filter: false,
    defaultFilter: false,
    custom: false,
  },
  {
    id: 'survey',
    defaultWidth: '123px',
    type: 'multi',
    label: label[2],
    filterWidth: 170,
    align: 'left',
    columnData: surveyData,
    disablePadding: true,
    noData: false,
    show: true,
    sortable: true,
    filter: true,
    defaultFilter: true,
    custom: false,
  },
  {
    id: 'surveyor',
    defaultWidth: '123px',
    type: 'multi',
    label: label[3],
    filterWidth: 150,
    align: 'left',
    columnData: surveyorData,
    noData: false,
    disablePadding: true,
    show: true,
    sortable: true,
    filter: true,
    defaultFilter: true,
    custom: false,
  },
  {
    id: 'community',
    type: 'levels',
    label: label[4],
    filterWidth: 150,
    align: 'left',
    noData: false,
    columnData: communitiesData,
    disablePadding: true,
    show: true,
    sortable: false,
    filter: true,
    defaultFilter: true,
    custom: false,
  },
  {
    id: 'completed',
    defaultWidth: '100px',
    type: 'date',
    label: label[5],
    columnData: completedData,
    filterWidth: 150,
    align: 'left',
    noData: true,
    disablePadding: true,
    show: true,
    sortable: true,
    filter: true,
    defaultFilter: false,
    custom: false,
  },
];
