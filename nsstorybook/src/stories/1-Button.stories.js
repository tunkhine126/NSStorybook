import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import NSButton from '../components/NSButton/index'
import HeaderButton from '../components/HeaderButton/index'
import { headerButtonStyles, SelectBtnStyle } from '../components/HeaderButton/styles'
import colors from '../../src/global-styles';
import { button, Typography, Collapse, IconButton, SnackbarContent, Checkbox, Input } from '@material-ui/core';
import { Edit, MoreHoriz, CheckCircleIcon, ErrorIcon, InfoIcon, WarningIcon, CheckBox } from '@material-ui/icons';
import { NSButtonStyles, btnLinkStyles } from '../components/NSButton/styles'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
// import globalMessages from 'messages';

export default {
  title: 'Buttons',
  component: NSButton, button, 
};

export function ButtonContainer({
  version,
  textBtn,
  disabled,
  variant,
  bgColor,
  padding,
  ...rest
}) {
  const classes = NSButtonStyles(); headerButtonStyles(bgColor, padding)();
  const danger = version === 3 ? classes.negative : classes.primary;
  const type = version === 2 ? classes.secondary : danger;
  let element;
  
  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  return (
    <BrowserRouter>
    <h3>Material-UI Buttons</h3>
      <p>
        <button 
          className="MuiButton" 
          onClick={action("I've been clicked")}>
          Base
          {/* <FormattedMessage {...appMessages.cancel}/> */}
        </button>
      &nbsp;
        <button className="MuiButton-contained" onClick={action("I've been clicked!")}>
          <span>Contained</span>
        </button>
      &nbsp;
        <button 
          className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall" 
          onClick={action("I've been clicked")}>
            <span class="MuiButton-label">Smol</span>
        </button>  
      &nbsp;
        <button 
          className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeMedium MuiButton-sizeMedium MuiButton-containedSecondary" 
          onClick={action("I've been clicked")}>
            <span class="MuiButton-label">Med</span>
        </button>
      &nbsp;
        <button 
          className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeLarge MuiButton-sizeLarge MuiButton-containedPrimary" 
          onClick={action("I've been clicked")}>
            <span class="MuiButton-label">Thicc</span>
        </button>  
      </p>
    <h3>NS Base Buttons</h3>
      <p>
        <NSButton
          id="Base"
          version={1}
          componentClasses={clsx(classes.btns, classes.margin)}
          onClick={action("I've been clicked")}>
          <span>NS Btn V1</span>
        </NSButton>
      &nbsp;
        <NSButton
          id="Forward"
          version={2}
          componentClasses={clsx(classes.btns, classes.margin)}
          onClick={action("I've been clicked")}>
          <span>NS Btn V2</span>
        </NSButton>
      &nbsp;
        <NSButton
          id="Danger"
          version={3}
          componentClasses={clsx(classes.btns, classes.margin)}
          onClick={action("I've been clicked")}>
          <span>NS BTN V3</span>
        </NSButton>
      &nbsp;
        <NSButton                 
          componentClasses={classes.tsReorder}
          variant="disabled">
          <span>Disabled</span>
        </NSButton>
      &nbsp;
      <NSButton
          textBtn
          variant="contained"
          size="small"
          onClick={action("I've been clicked")}
          componentClasses={classes.tsDragNDropCancelBtn}>
        <span>Txt Link Btn</span>
        </NSButton>
      &nbsp;
    </p>
    <h3>Buttons with Icons</h3>
      <p>
      <NSButton 
        version={2}
        onClick={action("I've been clicked")}>
        <>
          <Edit fontSize="small" className={classes.editBtn} />
          <Typography className={classes.editText}/>
          &nbsp; Edit
        </>
      </NSButton>
    &nbsp;
      <IconButton
        size="medium"
        variant="contained"
        color="primary"
        onClick={action("I've been clicked")}
        >
          <MoreHoriz className={classes.horiz} />
      </IconButton>
    &nbsp;
    <IconButton
        size="small"
        variant="contained"
        color="primary"
        onClick={action("I've been checked")}>
          <Checkbox className={classes.listItemChkbox} />
      </IconButton>
    </p>
    <h3>Header Button</h3>
      <p>
        <HeaderButton version={1} className={clsx(classes.customInput, 'header-button')}>
          Header V1
        </HeaderButton>
        <HeaderButton version={2} className={clsx(classes.customInput)}>Header V2</HeaderButton>
        <HeaderButton version={3} className={clsx(classes.btn)}>Header V3</HeaderButton>
        <HeaderButton version={4} className={clsx(classes.btn)}>Header V4</HeaderButton>
      </p>
    </BrowserRouter>
  );
}

