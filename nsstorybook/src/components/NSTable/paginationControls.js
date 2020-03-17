/**
 *
 * PaginationControls
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Grid from '@material-ui/core/Grid';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import TextLink from '../TextLink/index';
import messages from './messages';
import { styles } from './styles';

function PaginationControls({
  backIconButtonProps,
  nextIconButtonProps,
  onChangePage,
  count,
  currentPage,
  totalPages,
  resultCount,
}) {
  const classes = styles();
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  const disable = currentPage >= totalPages;

  return (
    <Grid
      item
      xs={10}
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid item className={classes.numbeOfRequests}>
        <Typography
          color="inherit"
          variant="body2"
          className={classes.dataResults}
        >
          {resultCount} <FormattedMessage {...messages.of} />
        </Typography>
        <Typography color="inherit" variant="body2">
          {count} <FormattedMessage {...messages.requests} />
        </Typography>
      </Grid>

      <Grid item>
        <TextLink
          content={
            <>
              <ArrowBack
                fontSize="inherit"
                className={classes.paginationLeftArrow}
              />
              <FormattedMessage {...messages.prev} />
            </>
          }
          disabled={currentPage <= 1}
          onClick={e => {
            onChangePage(e, prevPage);
          }}
          id="prev-btn"
          {...backIconButtonProps}
        />
      </Grid>

      <Grid item>
        <Grid
          item
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <TextField
              id="page-input"
              type="number"
              disabled={disable}
              value={currentPage}
              onChange={e => {
                const { value } = e.target;
                const parsedValue = parseInt(value);

                if (parsedValue > 0) {
                  if (parsedValue > totalPages) {
                    onChangePage(e, totalPages - 1);
                  } else {
                    onChangePage(e, parsedValue);
                  }
                }
              }}
              className="paginationPageInput"
              margin="normal"
              variant="outlined"
              inputProps={{ 'aria-label': 'Page Number', maxLength: 3 }}
            />
          </Grid>
          <Grid item>
            <FormattedMessage {...messages.of} /> {totalPages}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <TextLink
          content={
            <>
              <FormattedMessage {...messages.next} />
              <ArrowForward
                fontSize="inherit"
                className={classes.paginationRightArrow}
              />
            </>
          }
          disabled={disable}
          onClick={e => {
            onChangePage(e, nextPage);
          }}
          id="next-btn"
          {...nextIconButtonProps}
        />
      </Grid>
    </Grid>
  );
}

PaginationControls.propTypes = {
  backIconButtonProps: PropTypes.object,
  nextIconButtonProps: PropTypes.object,
  onChangePage: PropTypes.func,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  resultCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PaginationControls;
