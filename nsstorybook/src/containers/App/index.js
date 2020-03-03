/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar, layouts)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

// Routes
import { ROUTES, LOCAL_STORAGE } from 'utils/globalConstants';
import { loadPrivateRoutes } from 'routes/private';
import { loadPublicRoutes } from 'routes/public';

import { GET_ALL_RECIPIENT_DEFINITIONS } from 'graphql/queries/all-queries';
import { GET_USER_ORGANIZATIONS } from 'graphql/queries/organization-queries';

import NotFound from 'components/NotFound';
import RecipientList from 'components/shared/RecipientList/Loadable';
import Loading from 'components/shared/Loading';

import { setOrg as setOrganization } from 'containers/App/actions';
import { makeSelectOrg } from 'containers/App/selectors';

import { getLocalStorage } from 'utils/helpers';
import { generalErrorHandler } from 'utils/error-handler';
import { GlobalStyle, globalTheme } from 'global-styles';

function App({ store, org, location, ...rest }) {
  const publicRoute =
    location.pathname === '/login' ||
    location.pathname === '/logout' ||
    location.pathname === '/';

  const { loading, error, data } = useQuery(GET_ALL_RECIPIENT_DEFINITIONS, {
    variables: {
      organizationUuid: org.uuid,
    },
    skip: publicRoute,
  });

  if (error && !publicRoute) {
    return generalErrorHandler(error, {
      ...rest,
    });
  }

  if (loading && !publicRoute) {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: '100vh', backgroundColor: '#fafafa' }}
      >
        <Loading />
      </Grid>
    );
  }

  let primaryRecipient = 0;

  const userPrivateRoutes =
    data &&
    data.recipientDefinitions
      .sort((a, b) => b.hierarchyId - a.hierarchyId)
      .filter(
        (item, i, array) =>
          array.indexOf(array.find(a => a.name === item.name)) === i
      )
      .map(rd => {
        if (rd.primary) {
          primaryRecipient = rd.hierarchyId + 1;
        }
        return {
          Component: RecipientList,
          Path: rd.routes.path,
          Name: rd.routes.name,
          HierarchyId: rd.hierarchyId,
          HasParentRecipient: Boolean(rd.parentUuid),
          RecipientDefintionUuid: rd.uuid,
          NestedRecipientTree: rd.nestedRecipientTree,
          Table: rd.table,
          primary: rd.primary,
          ChildRoutes: rd.routes.children,
        };
      });

  const userRoutesWithIds =
    (userPrivateRoutes &&
      userPrivateRoutes
        .map(({ ChildRoutes }) => ChildRoutes.map(({ path }) => path))
        .flat()) ||
    [];

  return (
    <ThemeProvider theme={globalTheme}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to={ROUTES.dashboard.path} />}
        />
        <Route
          exact
          path={ROUTES.account.path}
          render={() => <Redirect to={ROUTES.account.children[0].path} />}
        />
        <Route
          exact
          path={ROUTES.recipients.path}
          render={() => (
            <Redirect
              to={
                (userPrivateRoutes[primaryRecipient] &&
                  userPrivateRoutes[primaryRecipient].Path) ||
                ROUTES.dashboard.path
              }
            />
          )}
        />
        <Route
          exact
          path={ROUTES.surveys.path}
          render={() => <Redirect to={ROUTES.surveys.children[0].path} />}
        />
        {loadPrivateRoutes(store, userPrivateRoutes, userRoutesWithIds)}
        {loadPublicRoutes}
        <Route render={props => <NotFound {...props} />} />
      </Switch>
    </ThemeProvider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  org: PropTypes.object,
};

function PreLoad({ store, setOrg, org, ...rest }) {
  const {
    history: { location },
  } = rest;

  const localOrg = getLocalStorage(LOCAL_STORAGE.org);

  const { loading, data: orgsData } = useQuery(GET_USER_ORGANIZATIONS);

  function initOrg() {
    if (!loading && orgsData && orgsData.organizations) {
      let initialOrg = null;
      if (localOrg) {
        initialOrg = JSON.parse(localOrg);
      } else {
        initialOrg = {
          value: orgsData.organizations[0].name,
          uuid: orgsData.organizations[0].uuid,
          primaryRecipientDefinitionUuid:
            orgsData.organizations[0].primaryRecipientDefinitionUuid,
        };
      }
      setOrg(initialOrg);
    }
  }

  if (!localOrg) {
    initOrg();
  }
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <App org={org} store={store} location={location} {...rest} />
    </>
  );
}

PreLoad.propTypes = {
  store: PropTypes.object.isRequired,
  setOrg: PropTypes.func.isRequired,
  org: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  org: makeSelectOrg(),
});

export function mapDispatchToProps(dispatch) {
  return {
    setOrg: org => dispatch(setOrganization(org)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreLoad);
