/**
 *
 * Asynchronously loads the component for Content
 *
 */
import React from 'react';
import loadable from 'utils/loadable';
import Loading from 'components/shared/Loading';

export default loadable(() => import('./index'), {
  fallback: <Loading />,
});
