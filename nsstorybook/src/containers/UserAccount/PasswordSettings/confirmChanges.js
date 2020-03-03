/**
 *
 * NewPassword
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Grid from '@material-ui/core/Grid';

import InputValidation from 'components/shared/InputValidation';
import { required } from 'utils/validations';
import messages from '../messages';
import { commonStyles } from '../styles';
import { ConfirmPwdStyle } from './styles';

export function ConfirmChanges() {
  const classes = commonStyles();

  return (
    <ConfirmPwdStyle>
      <Grid item className={classes.spacing}>
        <InputValidation
          field="currentPassword"
          type="password"
          label={<FormattedMessage {...messages.currentPassword} />}
          validate={required}
          validateOnChange
          validateOnBlur
        />
      </Grid>
    </ConfirmPwdStyle>
  );
}

export default ConfirmChanges;
