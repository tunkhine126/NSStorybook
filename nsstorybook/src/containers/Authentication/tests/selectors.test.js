import { selectAuthenticationDomain } from '../selectors';

describe('selectAuthenticationDomain', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      authentication: globalState,
    };
    expect(selectAuthenticationDomain(mockedState)).toEqual(globalState);
  });
});
