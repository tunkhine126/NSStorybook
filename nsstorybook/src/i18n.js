/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const esLocaleData = require('react-intl/locale-data/es');
const ptLocaleData = require('react-intl/locale-data/pt');

// Custom Locale-Data for Haitian / Creole (not supported by react-intl)
const htLocaleData = {
  locale: 'ht',
  pluralRuleFunction: (e, t) => (t && e === 1 ? 'one' : 'other'),
};

const combineTranslationMessages = require('./translations/langs.json');

addLocaleData(enLocaleData);
addLocaleData(esLocaleData);
addLocaleData(ptLocaleData);
addLocaleData(htLocaleData);

const DEFAULT_LOCALE = 'en';

// prettier-ignore
const appLocales = [
  'en',
  'es',
  'pt',
  'ht'
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, combineTranslationMessages)
      : {};

  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, {
      [key]: formattedMessage[locale],
    });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', combineTranslationMessages),
  es: formatTranslationMessages('es', combineTranslationMessages),
  pt: formatTranslationMessages('pt', combineTranslationMessages),
  ht: formatTranslationMessages('ht', combineTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
