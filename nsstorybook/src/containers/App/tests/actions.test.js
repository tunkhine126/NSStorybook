import { showToaster, hideToaster, setOrg } from '../actions';
import { SHOW_TOASTER, HIDE_TOASTER, SET_ORG } from '../constants';

describe('App actions', () => {
  describe('showToaster', () => {
    it('has a type of SHOW_TOASTER', () => {
      const expected = {
        type: SHOW_TOASTER,
      };
      expect(showToaster()).toEqual(expected);
    });
  });
  describe('hideToaster', () => {
    it('has a type of HIDE_TOASTER', () => {
      const expected = {
        type: HIDE_TOASTER,
      };
      expect(hideToaster()).toEqual(expected);
    });
  });
  describe('setOrg', () => {
    it('has a type of SET_ORG', () => {
      const payload = {
        uuid: '5d6d254c-5641-11e9-9966-22000bd4493b',
        value: 'New Story',
      };
      const expected = {
        type: SET_ORG,
        payload,
      };
      expect(setOrg(payload)).toEqual(expected);
    });
  });
});
