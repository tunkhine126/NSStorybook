/* eslint-disable react/prop-types */
/**
 *
 * TableViews
 *
 */

import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import SolidDownArrow from 'components/shared/Icons/solidDownArrow';
import HeaderButton from 'components/shared/HeaderButton';
import NSInput from 'components/shared/NSInput';
import TextLink from 'components/shared/TextLink';
import CheckMark from 'components/shared/Icons/checkMark';
import globalMessages from 'messages';
import messages from './messages';

import {
  TableViewStyle,
  UpArrowStyle,
  NewViewContainerStyle,
  MenuStyle,
  styles,
  tableViewHelperClasses,
} from './styles';

function TableViews({
  intl,
  anchorEl,
  addView,
  options,
  selectedId,
  handleClose,
  handleExited,
  handleCancel,
  handleMenuItemClick,
  handleAddViewDelete,
  handleAddViewClick,
}) {
  const classes = TableViewStyle();
  const classes2 = styles();
  const { actionBtns, createBtn, cancelBtn } = tableViewHelperClasses;

  const PaperProps = {
    style: {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      width: 272,
    },
  };

  return (
    <Menu
      id="saved-views-menu"
      PaperProps={PaperProps}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      onExited={handleExited}
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
            {addView
              ? intl.formatMessage(messages.newTableView)
              : intl.formatMessage(messages.loadTableView)}
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
              className={classes2.upArrowBtn}
            >
              <SolidDownArrow className={classes2.upArrow} />
            </IconButton>
          </UpArrowStyle>
        </Grid>
      </Grid>

      <Divider />

      {addView && (
        <NewViewContainerStyle>
          <Typography
            variant="caption"
            gutterBottom
            className={classes.newViewNotice}
          >
            {intl.formatMessage(messages.newViewNotice)}
          </Typography>

          <NSInput
            placeholder={intl.formatMessage(messages.inputPlaceholder)}
            className={clsx(classes.newViewInput, 'newViewInput')}
          />

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            className={classes.actionBtns}
          >
            <HeaderButton
              version={2}
              padding={actionBtns.padding}
              bgColor={cancelBtn.bg}
              onClick={handleCancel}
              className={classes.cancelBtn}
            >
              <Typography
                variant="body1"
                className={clsx(classes.actionBtnText)}
              >
                {intl.formatMessage(globalMessages.cancel)}
              </Typography>
            </HeaderButton>

            <HeaderButton
              version={1}
              padding={actionBtns.padding}
              bgColor={createBtn.bg}
            >
              <Typography variant="body1" className={classes.actionBtnText}>
                {intl.formatMessage(globalMessages.create)}
              </Typography>
            </HeaderButton>
          </Grid>
        </NewViewContainerStyle>
      )}

      {!addView && (
        <MenuStyle>
          {options.map((option, index) => (
            <MenuItem
              key={option.id}
              id={option.id}
              selected={option.id === selectedId}
              onClick={event => handleMenuItemClick(event, option.id)}
            >
              <Checkbox
                icon={<></>}
                checked={option.id === selectedId}
                checkedIcon={<CheckMark />}
              />
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs>
                  <Typography
                    variant="body1"
                    className={classes.menuOptionText}
                  >
                    {option.name}
                  </Typography>
                </Grid>
                {index !== 0 && (
                  <Delete
                    className={clsx(classes.deleteView, 'deleteViewBtn')}
                    onClick={event => handleAddViewDelete(event, option.id)}
                  />
                )}
              </Grid>
            </MenuItem>
          ))}
        </MenuStyle>
      )}

      {!addView && (
        <span>
          <Divider />
          <Grid
            className={classes.saveNewView}
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <TextLink
              content={intl.formatMessage(messages.saveNewView)}
              onClick={handleAddViewClick}
            />

            <Typography
              variant="caption"
              gutterBottom
              className={classes.saveNewViewDesc}
            >
              {intl.formatMessage(messages.saveNewViewDesc)}
            </Typography>
          </Grid>
        </span>
      )}
    </Menu>
  );
}

TableViews.propTypes = {
  intl: intlShape.isRequired,
  options: PropTypes.array.isRequired,
};

const IntlTableTableViews = injectIntl(TableViews);

export default IntlTableTableViews;
