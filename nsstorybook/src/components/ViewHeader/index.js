/**
 *
 * ViewHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Typography from '@material-ui/core/Typography';
import { viewHeaderStyles } from './styles';

function ViewHeader({ component, body }) {
  const classes = viewHeaderStyles();

  return (
    <>
      <Helmet>
        <title>{`New Story - ${component}`}</title>
        <meta name="description" content={component} />
      </Helmet>
      <Typography
        variant="h1"
        className={classes.header}
        component="h2"
        gutterBottom
      >
        {body}
      </Typography>
    </>
  );
}

ViewHeader.propTypes = {
  component: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

export default ViewHeader;
