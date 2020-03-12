import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const BREAD_CRUMB_NAME_MAP = {
  '/dashboard': <FormattedMessage {...messages.rtDashboard} />,
  'https://intercom.help/new-story-charity/en/': (
    <FormattedMessage {...messages.needHelp} />
  ),
  '/surveys': <FormattedMessage {...messages.rtSurveys} />,
  '/surveys/templates': <FormattedMessage {...messages.rtTemplates} />,
  '/surveys/templates/survey': <FormattedMessage {...messages.survey} />,
  '/surveys/survey-templates': (
    <FormattedMessage {...messages.rtSurveyTemplates} />
  ),
  '/surveys/submissions': <FormattedMessage {...messages.rtSubmissions} />,
  // '/surveys/requests': <FormattedMessage {...messages.rtRequests} />,
  '/reports': <FormattedMessage {...messages.rtReports} />,
  '/recipients': <FormattedMessage {...messages.rtRecipients} />,
  '/recipients/add/recipient': 'Add Recipient',
  '/settings': <FormattedMessage {...messages.rtSettings} />,
  '/org': <FormattedMessage {...messages.rtOrg} />,
  '/account': <FormattedMessage {...messages.rtAccount} />,
  '/account/account-settings': <FormattedMessage {...messages.rtAccSettings} />,
  '/account/password-settings': (
    <FormattedMessage {...messages.rtPwdSettings} />
  ),
  '/login': <FormattedMessage {...messages.rtLogout} />,
};

// TODO: Enable Disabled Routes

export const ROUTES = {
  account: {
    path: '/account',
    children: [
      {
        name: 'account-settings',
        path: '/account/account-settings',
      },
      {
        name: 'password-settings',
        path: '/account/password-settings',
      },
    ],
  },
  dashboard: {
    path: '/dashboard',
  },
  help: {
    path: 'https://intercom.help/new-story-charity/en/',
    options: {
      es: 'https://intercom.help/new-story-charity/es/',
    },
    active: true,
  },
  login: {
    path: '/login',
  },
  forgotPassword: {
    path: '/forgot-password',
  },
  surveys: {
    path: '/surveys',
    children: [
      {
        name: 'templates',
        path: '/surveys/templates',
      },
      {
        name: 'survey-templates',
        path: '/surveys/survey-templates/:id',
        parentActive: true,
        hideRoute: true,
      },
      {
        name: 'submissions',
        path: '/surveys/submissions',
      },
      // {
      //   name: 'requests',
      //   path: '/surveys/requests',
      // },
    ],
  },
  recipients: {
    path: '/recipients',
    children: [
      {
        name: 'add-recipient',
        path: '/recipients/add/recipient',
        hideRoute: true,
      },
    ],
  },
  reports: {
    path: '/reports',
  },
  settings: {
    path: '/settings',
  },
  org: {
    path: '/org',
  },
};

export const PARENT_ROUTES = {
  top: [
    // { display: 'dashboard' },
    { display: 'surveys', hasChildren: true },
    { display: 'recipients', hasChildren: true },
    // { display: 'reports' },
    // { display: 'settings' },
  ],
  bottom: [
    { display: 'org' },
    { display: 'account', hasChildren: true },
    { display: 'help' },
    { display: 'login' },
  ],
};

export const LOCAL_STORAGE = {
  userToken: 'NS_User_Token',
  lastAppVersionUsed: 'NS_Last_App_Version_Used',
  user: 'NS_User',
  org: 'NS_User_Org',
  language: 'NS_User_Lang',
  recipientDefinitionsLoaded: 'NS_RD_Loaded',
};

export const DATA_TYPES = {
  shortText: 'short_text',
  paragraphText: 'paragraph_text',
  number: 'number',
  date: 'date',
  time: 'time',
  singleSelect: 'single_select',
  multiSelect: 'multi_select',
  likert: 'likert',
  photo: 'photo',
  audio: 'audio',
  video: 'video',
  coordinates: 'coordinates',
};

export default {
  DEV_URI: 'https://api-dev.newstory.io/graphql',
  PROD_URI: 'https://api.newstory.io/graphql',
  DEV_X_Api_Key: '0123456789abcdef0123456789abcdef',
  PROD_X_Api_Key: 'f45be18e6cd739d516ef406cbcbc3262',
};
