/**
 *
 * ActionLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TextLink from 'components/shared/TextLink';
import globalMessages from 'messages';
import { recipientListStyles } from '../../styles';

function ActionLink({ message, ...rest }) {
  const classes = recipientListStyles();

  return (
    <TextLink
      {...rest}
      className={classes.addBtn}
      content={<FormattedMessage {...globalMessages[message]} />}
    />
  );
}

ActionLink.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ActionLink;
