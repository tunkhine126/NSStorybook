/**
 *
 * RecipientView
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import qs from 'query-string';
import { createStructuredSelector } from 'reselect';

// Queries
import { GET_RECIPIENT } from 'graphql/queries/recipients';
import { GET_RECIPIENT_DEFINITION_BY_PARENT } from 'graphql/queries/all-queries';

// Components
import { makeSelectApp } from 'containers/App/selectors';
import { hideToaster as toast } from 'containers/App/actions';
import { generalErrorHandler } from 'utils/error-handler';
import Loading from 'components/shared/Loading';
import Notification from 'components/shared/Notification';
import Header from '../header';
import TabContent from './tabContent';
import { RecipientViewProvider } from './context';
import { ComponentStyle, recipientListStyles } from '../styles';

function RecipientView({
  match,
  hideToaster,
  app,
  profileDetails,
  primaryRecipient,
  ...rest
}) {
  const { location } = rest;
  const index = parseInt(qs.parse(location.search).tab || 0);
  const initialTab = index >= 0 && index < 3 ? index : 0;
  const { loading, error, data } = useQuery(GET_RECIPIENT, {
    variables: {
      uuid: match.params.id,
    },
    fetchPolicy: 'network-only',
  });

  const [
    getRecipientDefinition,
    { loading: rdLoading, error: rdError, data: rdData },
  ] = useLazyQuery(GET_RECIPIENT_DEFINITION_BY_PARENT);

  const [messageState, setMessageState] = useState({
    message: 'Recipient Created!',
    open: false,
    type: 'success',
  });

  useEffect(() => {
    if (data && data.recipient) {
      getRecipientDefinition({
        variables: {
          parentUuid: data.recipient.recipientDefinitionUuid,
          organizationUuid: app.org.uuid,
        },
      });
      if (!messageState.open && app.showToaster) {
        setMessageState(mState => ({ ...mState, open: true }));
        hideToaster();
      }
    }
  }, [
    app.org.uuid,
    app.showToaster,
    data,
    getRecipientDefinition,
    hideToaster,
    messageState.open,
  ]);

  const classes = recipientListStyles();
  const [value, setValue] = useState(initialTab);

  const messageHandler = (event, reason) => {
    if (reason === 'clickaway') return;
    setMessageState({ open: false });
  };

  if (error || rdError) {
    return generalErrorHandler(error || rdError, {
      ...rest,
    });
  }

  if (loading || rdLoading) {
    return <Loading />;
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(idx) {
    setValue(idx);
  }

  return (
    <div>
      <Helmet>
        <title>New Story - {profileDetails.recipientName} </title>
        <meta name="description" content={profileDetails.recipientName} />
      </Helmet>
      <Notification
        status={messageState.open}
        message={messageState.message}
        classes={classes}
        messageHandler={messageHandler}
        duration={3000}
        position={{ vertical: 'top', horizontal: 'right' }}
        type={messageState.type}
      />
      <RecipientViewProvider
        data={data.recipient}
        rdData={(rdData && rdData.recipientDefinitions[0]) || {}}
        tabChange={handleChange}
        profileDetails={profileDetails}
        primaryRecipient={primaryRecipient}
        match={match}
        {...rest}
      >
        <ComponentStyle>
          <Header value={value} />
          <TabContent
            value={value}
            indexChange={handleChangeIndex}
            name={data && data.recipient && data.recipient.name}
            {...rest}
          />
        </ComponentStyle>
      </RecipientViewProvider>
    </div>
  );
}

RecipientView.propTypes = {
  match: PropTypes.object.isRequired,
  profileDetails: PropTypes.object.isRequired,
  primaryRecipient: PropTypes.bool.isRequired,
  hideToaster: PropTypes.func,
  app: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

export function mapDispatchToProps(dispatch) {
  return {
    hideToaster: () => dispatch(toast()),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipientView);
