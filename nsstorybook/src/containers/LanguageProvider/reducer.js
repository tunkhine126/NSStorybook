/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';

import { DEFAULT_LOCALE } from '../../i18n';
import { CHANGE_LOCALE, APP_LOADED } from './constants';

export const initialState = {
  locale: DEFAULT_LOCALE,
  initialLoad: false,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
      case APP_LOADED:
        draft.initialLoad = true;
        break;
    }
  });

export default languageProviderReducer;
