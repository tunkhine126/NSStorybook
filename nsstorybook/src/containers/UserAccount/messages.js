/*
 * UserAccount Messages
 *
 * This contains all the text for the UserAccount container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserAccount';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the UserAccount container!',
  },
  accSettingsHeader: {
    id: `${scope}.accSettingsHeader`,
    defaultMessage: 'Account Settings',
  },
  accountUpdated: {
    id: `${scope}.accountUpdated`,
    defaultMessage: 'Account Settings Updated.',
  },
  confirmChanges: {
    id: `${scope}.confirmChanges`,
    defaultMessage: 'Confirm Changes',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Confirm Your New Password',
  },
  currentPassword: {
    id: `${scope}.currentPassword`,
    defaultMessage: 'Current Password',
  },
  defaultSurveyLang: {
    id: `${scope}.defaultSurveyLang`,
    defaultMessage: 'Default Survey Language',
  },
  defaultLang: {
    id: `${scope}.defaultLang`,
    defaultMessage: 'Default Language',
  },
  emailChange: {
    id: `${scope}.emailChange`,
    defaultMessage: 'To change your email please contact us.',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'Your Email',
  },
  firstNameLabel: {
    id: `${scope}.firstNameLabel`,
    defaultMessage: 'First Name',
  },
  general: {
    id: `${scope}.general`,
    defaultMessage: 'General',
  },
  lastNameLabel: {
    id: `${scope}.lastNameLabel`,
    defaultMessage: 'Last Name',
  },
  langSettings: {
    id: `${scope}.langSettings`,
    defaultMessage: 'Your Language Settings',
  },
  minCharacters: {
    id: `${scope}.minCharacters`,
    defaultMessage: 'Field must be at least 6 characters',
  },
  invalidPassword: {
    id: `${scope}.invalidPassword`,
    defaultMessage: 'Invalid Password, Please Try Again.',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'New Password',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  pwdSettingsHeader: {
    id: `${scope}.pwdSettingsHeader`,
    defaultMessage: 'Change Your Password',
  },
  passwordReq: {
    id: `${scope}.passwordReq`,
    defaultMessage:
      'Please make sure your password is strong and 6 characters minimum.',
  },
  passwordChange: {
    id: `${scope}.passwordChange`,
    defaultMessage: 'To change your password please click the link below',
  },
  passwordUpdated: {
    id: `${scope}.passwordUpdated`,
    defaultMessage: 'Password Updated.',
  },
  passwordMatch: {
    id: `${scope}.passwordMatch`,
    defaultMessage: 'Passwords must match.',
  },
  passwordLink: {
    id: `${scope}.passwordLink`,
    defaultMessage: 'Change Your Password',
  },
  organization: {
    id: `${scope}.organization`,
    defaultMessage: 'Organization',
  },
});
