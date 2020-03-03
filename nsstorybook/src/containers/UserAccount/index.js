/**
 *
 * UserAccount
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export function UserAccount() {
  return (
    <div>
      <Helmet>
        <title>New Story - Account</title>
        <meta name="description" content="User Account" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default UserAccount;
