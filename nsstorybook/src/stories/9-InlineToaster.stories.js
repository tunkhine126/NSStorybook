import React, { useState, useEffect, useContext} from 'react';
import { BrowserRouter } from 'react-router-dom'
import InlineToaster from '../components/InlineToaster/styles'
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from '../i18n';
import { action } from '@storybook/addon-actions';
// import { RecipientViewContext } from '../components/RecipientList/RecipientView/index';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { InlineToasterWrapper, inlineToasterStyle } from '../components/InlineToaster/styles';

export default {
  title: 'Inline Toaster(not working)',
  component: 'InlineToaster'
}

export function Toaster({
  intl,
  className,
  message,
  handleUndo,
  variant,
  timer = 4500,
  clearToaster,
  showUndo = false,
  ...other
}) {

  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  const classes = inlineToasterStyle();
  const Icon = variantIcon[variant];
  const [show, setShow] = useState(true);
  const toasterDefault = state => ({ ...state, show: true });

  const timeout = setTimeout(() => {
    setShow(false);
    clearToaster(toasterDefault);
  }, timer);

  useEffect(() => () => {
    // Prevents memory leak
    setShow(false);
    clearTimeout(timeout);
    clearToaster(toasterDefault);
  });

  return (
    <BrowserRouter>
      <div>
        <h3>Inline Toaster</h3>
          {show &
            <InlineToaster
              clearToaster={() => {}}
              variant="warning"
              timer={0}
              message="test"
            />
          }
      </div>
    </BrowserRouter>
  );
}