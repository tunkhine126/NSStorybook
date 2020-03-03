/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE, APP_LOADED } from './constants';

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}

export function initLoad() {
  return {
    type: APP_LOADED,
  };
}
