/*
 *
 * Authentication reducer
 *
 */
import produce from 'immer';
import Cookies from 'js-cookie';
import { LOCAL_STORAGE } from 'utils/globalConstants';
import { AUTHENTICATE, LOGOUT } from './constants';

export const initialState = (window.Cypress && window.initialState) || {
  isAuthenticated: false,
};

/* eslint-disable default-case, no-param-reassign */
const authenticationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTHENTICATE:
        draft.isAuthenticated = true;
        break;
      case LOGOUT:
        Cookies.remove(LOCAL_STORAGE.userToken, { path: '' });
        draft.isAuthenticated = false;
        break;
    }
  });

export default authenticationReducer;
