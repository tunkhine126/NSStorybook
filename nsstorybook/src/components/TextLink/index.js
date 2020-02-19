/**
 *
 * TextLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import { textLinkStyles, btnStyles } from './styles';

function TextLink({ content, className, disable, bold = true, ...rest }) {
  const classes = textLinkStyles();
  return (
    <Button
      classes={btnStyles(bold)()}
      disabled={disable}
      color="primary"
      className={className || classes.btn}
      {...rest}
    >
      {content}
    </Button>
  );
}

TextLink.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  bold: PropTypes.bool,
  disable: PropTypes.bool,
  className: PropTypes.any,
};

export default TextLink;
