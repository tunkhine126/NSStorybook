import Cookies from 'js-cookie';
import { LOCAL_STORAGE } from '../utils/globalConstants';
import moment from 'moment';

export const setLocalStorage = (key, value) => localStorage.setItem(key, value);

export const getLocalStorage = key => localStorage.getItem(key);

export const userTokenExist = () =>
  Cookies.get(LOCAL_STORAGE.userToken) !== undefined;

export const resetNestedLevels = options => {
  const keys = Object.keys(options).filter(
    k => k === 'checked' || k === 'active' || k === 'toggled'
  );

  const resetKeys = obj =>
    keys.forEach(key => {
      obj[key] = false;
    });

  const recursive = function(arr) {
    arr.forEach(obj => {
      resetKeys(obj);
      if (obj.children.length > 0) {
        recursive(obj.children);
      }
    });
  };

  if (options.children.length > 0) {
    recursive(options.children);
  }

  resetKeys(options);
};

export const generateISODate = days =>
  moment(moment(new Date()).format('YYYY-MM-DD'))
    .subtract(days, 'days')
    .toISOString();

export const generateImg = img => {
  const dataSignature = img.includes('data:image/')
    ? ''
    : 'data:image/png;base64,';
  return img.includes('http') ? img : `${dataSignature}${img}`;
};

export const filterObj = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(key))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});
