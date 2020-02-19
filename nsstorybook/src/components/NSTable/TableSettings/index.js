/**
 *
 * TableSettings
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Grid from '@material-ui/core/Grid';
import Settings from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import SolidDownArrow from 'components/shared/Icons/solidDownArrow';
import CoreSettings from './coreSettings';
import ReorderView from './reorderView';
import messages from '../messages';
import { styles, tableSettingBtnStyle, UpArrowStyle } from '../styles';

function TableSettings({
  intl,
  columns,
  density,
  columnChange,
  densityChange,
  rowChange,
  handleReorder,
}) {
  const classes = styles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [reorderMode, setReorderMode] = useState(false);
  const [addingField, setAddingField] = useState(false);

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExited = () => {
    setAddingField(false);
    setReorderMode(false);
  };

  const handleReorderMode = () => {
    setReorderMode(!reorderMode);
  };

  const PaperProps = {
    style: {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      width: 390,
    },
  };

  const MenuListProps = {
    style: {
      paddingBottom: 0,
    },
  };

  return (
    <>
      <IconButton
        aria-label="table settings"
        size="small"
        aria-controls="table-settings"
        aria-haspopup="true"
        variant="contained"
        classes={tableSettingBtnStyle()}
        onClick={handleMenuClick}
      >
        <Settings className={classes.toolWheel} />
      </IconButton>
      <Menu
        id="table-settings"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onExited={handleExited}
        getContentAnchorEl={null}
        PaperProps={PaperProps}
        MenuListProps={MenuListProps}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs>
            <Typography
              variant="body1"
              gutterBottom
              className={classes.menuTitle}
            >
              {intl.formatMessage(messages.tableSettings)}
            </Typography>
          </Grid>
          <Grid item>
            <UpArrowStyle>
              <IconButton
                aria-label="close table settings"
                aria-controls="table-settings-close"
                aria-haspopup="false"
                color="primary"
                onClick={handleClose}
                className={classes.upArrowBtn}
              >
                <SolidDownArrow className={classes.upArrow} />
              </IconButton>
            </UpArrowStyle>
          </Grid>
        </Grid>

        <Divider />

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          {!reorderMode ? (
            <CoreSettings
              rowChange={rowChange}
              columnChange={columnChange}
              columns={columns}
              handleReorderMode={handleReorderMode}
              density={density}
              densityChange={densityChange}
              addingFieldProps={{ addingField, setAddingField }}
            />
          ) : (
            <ReorderView
              handleReorder={handleReorder}
              handleReorderMode={handleReorderMode}
              columns={columns}
            />
          )}
        </Grid>
      </Menu>
    </>
  );
}

TableSettings.propTypes = {
  intl: intlShape.isRequired,
  columns: PropTypes.array.isRequired,
  columnChange: PropTypes.func.isRequired,
  densityChange: PropTypes.func.isRequired,
  density: PropTypes.string.isRequired,
  rowChange: PropTypes.func.isRequired,
  handleReorder: PropTypes.func.isRequired,
};

const IntlTableSettings = injectIntl(TableSettings);

export default IntlTableSettings;
