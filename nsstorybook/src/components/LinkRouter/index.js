/**
 *
 * LinkRouter
 *
 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

export default LinkRouter;
