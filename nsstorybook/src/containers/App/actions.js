/*
 *
 * APP actions
 *
 */

import { SHOW_TOASTER, HIDE_TOASTER, SET_ORG } from './constants';

export function showToaster() {
  return {
    type: SHOW_TOASTER,
  };
}

export function hideToaster() {
  return {
    type: HIDE_TOASTER,
  };
}

export function setOrg(org) {
  return {
    type: SET_ORG,
    payload: org,
  };
}
