import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

export const required = value => {
  if (!value) {
    return <FormattedMessage {...messages.requiredField} />;
  }
  return undefined;
};
