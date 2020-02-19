import React from 'react';
import { action } from '@storybook/addon-actions';
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
    <Button 
      onClick={action('I was clicked')}
      variant="contained"
      color="primary"
      size="large"
      className={classes.confirmBtn}
      form={formId}
      type={type}
      disabled={disabled}
      >Primary
    </Button>
  )
}
 







