import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import Button from '../components/NSButton/index'
import { NSButtonStyles, btnLinkStyles } from '../components/NSButton/styles'
import clsx from 'clsx';

export default {
  title: 'Buttons',
  component: Button,
};

export function NSButton({
  children,
  componentClasses,
  version,
  textBtn,
  deleteLink,
  formId,
  disabled,
  ...rest
}) {
  const classes = NSButtonStyles();
  const danger = version === 3 ? classes.negative : classes.primary;
  const type = version === 2 ? classes.secondary : danger;

  return (
    <BrowserRouter>
    <h3>Base</h3>
      <Button
        className={clsx(classes.btn, type, componentClasses)}
        classes={textBtn ? btnLinkStyles(deleteLink)() : null}
        {...rest}
        onClick={action("I've been clicked!")}
      >
        {children}
        Button
      </Button>
    <h3>Mutations</h3>
    <p>
    <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.confirmBtn}
        form={formId}
        type={type}
        disabled={disabled}
        onClick={action("I've been clicked")}
        >Button
      </Button>
      &nbsp;
      <Button className={classes.cancelBtn} onClick={action('cancel')}>Button</Button>
    </p>
    <NSButton
      id="back-button"
      version={2}
      componentClasses={clsx(classes.btns, classes.margin)}
      onClick={action('goBack')}>
    </NSButton>
    </BrowserRouter>
  );
}

NSButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  componentClasses: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  version: PropTypes.number,
  textBtn: PropTypes.bool,
  deleteLink: PropTypes.bool,
};



// export function NSButton({
//   children,
//   componentClasses,
//   version,
//   textBtn,
//   deleteLink,
//   formId,
//   disabled,
//   ...rest
// }) {
//   const classes = NSButtonStyles();
//   const danger = version === 3 ? classes.negative : classes.primary;
//   const type = version === 2 ? classes.secondary : danger;

//   return (
//     <Button 
//       onClick={action('I was clicked')}
//       variant="contained"
//       color="primary"
//       size="large"
//       className={classes.confirmBtn}
//       form={formId}
//       type={type}
//       disabled={disabled}
//       >Primary
//     </Button>
//   )
// }


 







