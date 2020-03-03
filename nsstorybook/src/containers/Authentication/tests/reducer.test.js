import produce from 'immer';
import authenticationReducer from '../reducer';
import { authenticate, logout } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('authenticationReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      isAuthenticated: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(authenticationReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the authenticate action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticated = true;
    });

    expect(authenticationReducer(state, authenticate())).toEqual(
      expectedResult
    );
  });

  it('should handle the logout action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.isAuthenticated = false;
    });

    expect(authenticationReducer(state, logout())).toEqual(expectedResult);
  });
});
