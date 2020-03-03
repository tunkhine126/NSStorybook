import produce from 'immer';
import appReducer from '../reducer';
import { showToaster, hideToaster, setOrg } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      // default state params here
      showToaster: false,
      org: {},
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should show toaster', () => {
    const expectedResult = produce(state, draft => {
      draft.showToaster = true;
    });

    expect(appReducer(state, showToaster())).toEqual(expectedResult);
  });

  it('should hide toaster', () => {
    const expectedResult = produce(state, draft => {
      draft.showToaster = false;
    });

    expect(appReducer(state, hideToaster())).toEqual(expectedResult);
  });

  it('should set the user org', () => {
    const value = {
      uuid: '5d6d254c-5641-11e9-9966-22000bd4493b',
      value: 'New Story',
    };
    const expectedResult = produce(state, draft => {
      draft.org = value;
    });

    expect(appReducer(state, setOrg(value))).toEqual(expectedResult);
  });
});
