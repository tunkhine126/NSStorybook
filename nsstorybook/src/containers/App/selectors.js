import { createSelector } from 'reselect';

const selectApp = state => state.app;

const makeSelectApp = () =>
  createSelector(
    selectApp,
    appState => appState
  );

const makeSelectOrg = () =>
  createSelector(
    selectApp,
    appState => appState.org
  );

export { makeSelectApp, makeSelectOrg };
