import React, { createRef, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

// Helpers
import { useInjectReducer } from 'utils/injectReducer';
import { setLocalStorage } from 'utils/helpers';
import { ROUTES, LOCAL_STORAGE } from 'utils/globalConstants';
import globalMessages from 'messages';
import messages from './messages';

import { authenticate, logout } from './actions';
import reducer from './reducer';
import makeSelectAuthentication from './selectors';

const UserLogin = ({
  classes,
  setmessageState,
  signInUser,
  logInUser,
  logoutUser,
  authentication,
  history,
}) => {
  useInjectReducer({ key: 'authentication', reducer });

  const { isAuthenticated } = authentication;
  const {
    location: { pathname },
  } = history;

  const formRef = createRef();
  const [chkBoxState, setChkBoxState] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [loadingState, setloadingState] = useState(false);

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleChkChange = event => {
    setChkBoxState(event.target.checked);
  };

  const handleSubmit = async callBack => {
    try {
      setloadingState(true);
      const response = await callBack({
        variables: { ...state },
      });
      const { token, viewer } = response.data.signInUser;

      Cookies.set(LOCAL_STORAGE.userToken, token, { expires: 30 });
      setLocalStorage(LOCAL_STORAGE.user, JSON.stringify(viewer));
      logInUser();
    } catch (error) {
      const { graphQLErrors, networkError } = error;
      setloadingState(false);

      if (graphQLErrors.length > 0) {
        const [{ message }] = graphQLErrors;
        setmessageState({ message, open: true, type: 'warning' });
      }

      if (networkError) {
        const { message } = networkError;
        const failedConnection = message.includes('Failed to fetch');

        if (failedConnection) {
          setmessageState({
            message: <FormattedMessage {...globalMessages.networkError} />,
            open: true,
            type: 'error',
          });
        }
      }
    }
  };

  if (pathname === ROUTES.logout.path) {
    logoutUser();
    setmessageState({
      message: <FormattedMessage {...messages.logout} />,
      open: true,
      type: 'success',
    });
    setTimeout(() => history.push(ROUTES.login.path), 2000);
  }

  if (pathname === ROUTES.login.path && isAuthenticated) {
    return <Redirect to={ROUTES.dashboard.path} />;
  }

  return (
    <ValidatorForm
      ref={formRef}
      instantValidate
      onSubmit={() => handleSubmit(signInUser)}
    >
      <Grid item xs={12} className={classes.form}>
        <TextValidator
          id="email"
          label={<FormattedMessage {...messages.email} />}
          type="email"
          name="email"
          fullWidth
          value={state.email}
          margin="normal"
          onChange={handleChange('email')}
          validators={['required', 'isEmail']}
          errorMessages={['Email is required', 'Invalid email.']}
        />
        <TextValidator
          id="password"
          label={<FormattedMessage {...messages.password} />}
          type="password"
          name="password"
          fullWidth
          value={state.password}
          margin="normal"
          onChange={handleChange('password')}
          validators={['required']}
          errorMessages={['Password is required']}
        />
      </Grid>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        item
        xs={12}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={chkBoxState}
              onChange={handleChkChange}
              color="primary"
            />
          }
          label={<FormattedMessage {...messages.rememberMe} />}
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          disabled={loadingState}
          className={`${classes.button} ${classes.bottomMargin} ${
            classes.topMargin
          }`}
        >
          {loadingState ? (
            <CircularProgress className={classes.progress} color="primary" />
          ) : (
            <FormattedMessage {...messages.login} />
          )}
        </Button>

        <Link href="/" className={classes.link}>
          {<FormattedMessage {...messages.forgotPassword} />}
        </Link>

        <Link href="/" className={classes.link}>
          {<FormattedMessage {...messages.unlockInstructions} />}
        </Link>
      </Grid>
    </ValidatorForm>
  );
};

UserLogin.propTypes = {
  setmessageState: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  logInUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  authentication: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  authentication: makeSelectAuthentication(),
});

function mapDispatchToProps(dispatch) {
  return {
    logInUser: () => dispatch(authenticate()),
    logoutUser: () => dispatch(logout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(UserLogin);
