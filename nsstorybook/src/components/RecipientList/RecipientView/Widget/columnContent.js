/**
 *
 * ColumnContent
 *
 */

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl, intlShape } from 'react-intl';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import NSButton from 'components/shared/NSButton';
import InlineToaster from 'components/shared/InlineToaster';
import moment from 'moment';
import globalMessage from 'messages';
import Widget from './widget';
import { recipientListStyles } from '../../styles';
import { RecipientViewContext } from '../context';
import FieldHistory from './fieldHistory';

function ColumnContent({
  intl,
  header,
  data,
  customClasses,
  dynamic,
  handleEditMode,
  recipientUuid,
  field,
  ...rest
}) {
  const classes = recipientListStyles();
  const {
    toasterProps: { toaster, setToaster },
    saveProps: { saveState },
  } = useContext(RecipientViewContext);

  const showToaster =
    toaster.show &&
    toaster.field === field &&
    toaster.recipientUuid === recipientUuid;

  const loading =
    saveState.isLoading &&
    saveState.recipientUuid === recipientUuid &&
    saveState.field === field;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // TODO: Finish this feature
  const fieldHistory = [
    {
      timestamp: '2019-10-01T14:55:06.789Z',
      value: 'Eddie Dozier',
      user_uuid: '77c7702c-a4bc-11e9-bb06-22000a96ad48',
      user_name: 'Eddie Dozier',
    },
    {
      timestamp: '2019-10-02T14:28:19.535Z',
      value: 'Jimmy Hindrix',
      user_uuid: '77c7702c-a4bc-11e9-bb06-22000a96ad48',
      user_name: 'Eddie Dozier',
    },
    {
      timestamp: '2019-10-03T14:28:03.317Z',
      value: 'Maxwell',
      user_uuid: '77c7702c-a4bc-11e9-bb06-22000a96ad48',
      user_name: 'Eddie Dozier',
    },
  ].map(({ timestamp, value, user_name: userName }, idx, arr) => (
    <FieldHistory
      key={idx}
      date={moment(timestamp)
        .format('MMM DD, YYYY hh:mm:ss')
        .toLocaleString()}
      value={value}
      user={userName}
      currentVersion={idx === 0}
      lastItem={arr.length - 1 === idx}
      field={header}
    />
  ));

  return (
    <Grid
      {...rest}
      container
      className={customClasses}
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      {loading ? (
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid item xs={9}>
            <Grid item className={clsx(classes.captionSpacing)}>
              <Typography variant="caption" className={classes.caption}>
                {header}
              </Typography>
            </Grid>

            <Grid item>
              {typeof data === 'string' ? (
                <Typography variant="body2" className={classes.contentBody}>
                  {data}
                </Typography>
              ) : (
                data
              )}
            </Grid>
          </Grid>
          {dynamic && (
            <Grid
              item
              xs={3}
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              className={clsx('column-action-btns', classes.columnActionBtns)}
            >
              {!toaster.show && (
                <Grid
                  item
                  container
                  direction="column"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Grid item component="span" className={clsx(classes.editBtn)}>
                    <span className="edit-recipient">
                      <NSButton
                        version={2}
                        onClick={() => handleEditMode(true)}
                      >
                        <EditIcon />
                      </NSButton>
                    </span>
                  </Grid>

                  <Grid item component="span">
                    <span className="access-time">
                      <NSButton
                        onClick={handleOpen}
                        id={`${field}_${recipientUuid}`}
                      >
                        <AccessTimeIcon />
                      </NSButton>
                    </span>
                  </Grid>

                  <Modal
                    aria-labelledby={`${field}_${recipientUuid}`}
                    aria-describedby={`${field}_${recipientUuid}`}
                    open={open}
                    className={classes.modal}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 400,
                    }}
                  >
                    <Fade in={open}>
                      <div className={classes.columnPaper}>
                        <Widget
                          header={`${intl.formatMessage(
                            globalMessage.fieldHistory
                          )}: ${header}`}
                          body={
                            <Grid
                              container
                              direction="row"
                              justify="center"
                              alignItems="flex-start"
                              className={classes.fieldHistory}
                            >
                              {fieldHistory}
                            </Grid>
                          }
                          message="closeWindow"
                          buttonPosition="end"
                          btnHandler={handleClose}
                        />
                      </div>
                    </Fade>
                  </Modal>
                </Grid>
              )}

              <Grid item>
                {showToaster && (
                  <InlineToaster
                    variant="success"
                    className="success-toaster"
                    message={intl.formatMessage(globalMessage.saved)}
                    showUndo
                    clearToaster={setToaster}
                    handleUndo={toaster.undoHandler}
                  />
                )}
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
}

ColumnContent.propTypes = {
  intl: intlShape.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  customClasses: PropTypes.string,
  field: PropTypes.string,
  recipientUuid: PropTypes.string,
  handleEditMode: PropTypes.func,
  dynamic: PropTypes.bool,
};

const intlColumnContent = injectIntl(ColumnContent);

export default intlColumnContent;
