import { authenticate, logout } from '../actions';
import { AUTHENTICATE, LOGOUT } from '../constants';

describe('Authentication actions', () => {
  describe('authenticate', () => {
    it('has a type of AUTHENTICATE', () => {
      const expected = {
        type: AUTHENTICATE,
      };
      expect(authenticate()).toEqual(expected);
    });
  });
  describe('logout', () => {
    it('has a type of LOGOUT', () => {
      const expected = {
        type: LOGOUT,
      };
      expect(logout()).toEqual(expected);
    });
  });
});
