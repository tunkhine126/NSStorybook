/*
 *
 * Authentication actions
 *
 */

import { AUTHENTICATE, LOGOUT } from './constants';

export function authenticate() {
  return {
    type: AUTHENTICATE,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
