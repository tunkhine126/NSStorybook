/*
 * Authentication Messages
 *
 * This contains all the text for the Authentication container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Authentication';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Log In',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: `You've successfully logged out!`,
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: `Log In`,
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: `Email*`,
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: `Password*`,
  },
  rememberMe: {
    id: `${scope}.rememberMe`,
    defaultMessage: `Remember Me`,
  },
  forgotPassword: {
    id: `${scope}.forgotPassword`,
    defaultMessage: `Forgot your password?`,
  },
  unlockInstructions: {
    id: `${scope}.unlockInstructions`,
    defaultMessage: `Didn't receive unlock instructions?`,
  },
});
