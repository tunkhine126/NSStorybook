import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authentication state domain
 */

const selectAuthenticationDomain = state =>
  state.authentication || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Authentication
 */

const makeSelectAuthentication = () =>
  createSelector(
    selectAuthenticationDomain,
    substate => substate
  );

export default makeSelectAuthentication;
export { selectAuthenticationDomain };
