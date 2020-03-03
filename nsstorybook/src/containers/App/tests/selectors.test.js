import { makeSelectApp, makeSelectOrg } from 'containers/App/selectors';

describe('makeSelectApp', () => {
  it('should select the app state', () => {
    const appState = { showToaster: false };
    const mockedState = {
      app: appState,
    };
    expect(makeSelectApp()(mockedState)).toEqual(appState);
  });

  it('should select the org state', () => {
    const mockedState = {
      app: {
        org: {
          uuid: '5d6d254c-5641-11e9-9966-22000bd4493b',
          value: 'New Story',
        },
      },
    };
    expect(makeSelectOrg()(mockedState)).toEqual({
      uuid: '5d6d254c-5641-11e9-9966-22000bd4493b',
      value: 'New Story',
    });
  });
});
