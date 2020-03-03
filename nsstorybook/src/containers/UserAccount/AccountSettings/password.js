/**
 *
 * Password
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinkRouter from 'components/shared/LinkRouter';

import { ROUTES } from 'utils/globalConstants';
import messages from '../messages';
import { commonStyles } from '../styles';

export function Password() {
  const classes = commonStyles();
  const passwordSettingsPath = ROUTES.account.children[1].path;

  return (
    <>
      <Grid item className={classes.spacing}>
        <Typography variant="body1" className={classes.darkText} gutterBottom>
          <FormattedMessage {...messages.passwordChange} />:
        </Typography>
      </Grid>

      <Grid item>
        <LinkRouter to={passwordSettingsPath}>
          <Typography
            variant="body1"
            className={classes.linkStyle}
            gutterBottom
          >
            <FormattedMessage {...messages.passwordLink} />
          </Typography>
        </LinkRouter>
      </Grid>
    </>
  );
}

export default Password;
