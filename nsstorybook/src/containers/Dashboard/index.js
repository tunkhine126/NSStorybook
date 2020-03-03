/*
 * Dashboard
 *
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import messages from './messages';

export default function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>New Story - Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}
