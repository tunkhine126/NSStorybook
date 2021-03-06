/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './history';
import languageProviderReducer from '../containers/LanguageProvider/reducer';
import authenticationReducer from '../containers/Authentication/reducer';
import appReducer from '../containers/App/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    authentication: authenticationReducer,
    app: appReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
