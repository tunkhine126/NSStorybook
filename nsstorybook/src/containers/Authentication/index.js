/**
 *
 * Authentication
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useMutation } from '@apollo/react-hooks';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Notification from 'components/shared/Notification';
import { useInjectReducer } from 'utils/injectReducer';
import logo from 'assets/images/black-icon-logo.svg';
import { LOGIN_USER } from 'graphql/mutations/user-mutation';
import UserLogin from './userLogin';

// Styles
import { useStyles, ComponentStyle } from './style';

// Helpers
import reducer from './reducer';
import messages from './messages';
import makeSelectAuthentication from './selectors';

export function Authentication({ history }) {
  useInjectReducer({ key: 'authentication', reducer });

  const classes = useStyles();

  const [messageState, setmessageState] = useState({
    message: '',
    open: false,
    type: 'warning',
  });

  const [signInUser] = useMutation(LOGIN_USER);

  const messageHandler = (event, reason) => {
    if (reason === 'clickaway') return;
    setmessageState({ open: false });
  };

  return (
    <>
      <Helmet>
        <title>New Story - Login</title>
        <meta name="description" content="Login" />
      </Helmet>
      <ComponentStyle />
      <Container maxWidth="xs">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={8}
        >
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            xs={12}
          >
            <Notification
              status={messageState.open}
              message={messageState.message}
              classes={classes}
              messageHandler={messageHandler}
              duration={5000}
              position={{ vertical: 'top', horizontal: 'center' }}
              type={messageState.type}
            />
          </Grid>

          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            xs="auto"
          >
            <img
              alt="New Story Logo"
              className={classes.bottomMargin}
              src={logo}
              width="75"
            />

            <Typography variant="h5" gutterBottom>
              <FormattedMessage {...messages.header} />
            </Typography>
          </Grid>
          <UserLogin
            setmessageState={setmessageState}
            signInUser={signInUser}
            classes={classes}
            history={history}
          />
        </Grid>
      </Container>
    </>
  );
}

Authentication.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authentication: makeSelectAuthentication(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Authentication);
