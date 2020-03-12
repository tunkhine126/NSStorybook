/*
 *
 * App reducer
 *
 */
import produce from 'immer';

import { LOCAL_STORAGE } from '../../utils/globalConstants';
import { setLocalStorage } from '../../utils/helpers';
import { SHOW_TOASTER, HIDE_TOASTER, SET_ORG } from './constants';

export const initialState = (window.Cypress && window.initialState) || {
  showToaster: false,
  org: {},
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_TOASTER:
        draft.showToaster = true;
        break;
      case HIDE_TOASTER:
        draft.showToaster = false;
        break;
      case SET_ORG:
        draft.org = action.payload;
        setLocalStorage(LOCAL_STORAGE.org, JSON.stringify(action.payload));
        break;
    }
  });

export default appReducer;
