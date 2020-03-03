/**
 *
 * NewPassword
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import InputValidation from 'components/shared/InputValidation';

import { required } from 'utils/validations';
import messages from '../messages';
import { commonStyles } from '../styles';

export function NewPassword() {
  const classes = commonStyles();

  const handleConfirmChange = (value, field, fieldApi) => {
    fieldApi.validate('passwordConfirmation');
  };
  const minCharacters = value => {
    if (value && value.length < 6) {
      return <FormattedMessage {...messages.minCharacters} />;
    }
    return undefined;
  };

  const passwordMatch = (value, values) =>
    values.password !== values.passwordConfirmation ? (
      <FormattedMessage {...messages.passwordMatch} />
    ) : (
      undefined
    );

  const combinedValidation = (value, values) =>
    required(value) || minCharacters(value) || passwordMatch(value, values);

  return (
    <>
      <Grid item className={classes.spacing}>
        <Typography variant="body1" className={classes.darkText} gutterBottom>
          <FormattedMessage {...messages.passwordReq} />
        </Typography>

        <InputValidation
          field="password"
          type="password"
          label={<FormattedMessage {...messages.newPassword} />}
          validate={combinedValidation}
          validateOnChange
          validateOnBlur
          notify={['passwordConfirmation']}
        />
        <InputValidation
          field="passwordConfirmation"
          type="password"
          label={<FormattedMessage {...messages.confirmPassword} />}
          validate={combinedValidation}
          onChange={handleConfirmChange}
          validateOnChange
          validateOnBlur
          notify={['password']}
        />
      </Grid>
    </>
  );
}

export default NewPassword;
