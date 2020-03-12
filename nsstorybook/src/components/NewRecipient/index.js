/**
 *
 * NewRecipient
 *
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { injectIntl, intlShape } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'informed';
import queryString from 'query-string';

import Grid from '@material-ui/core/Grid';

// Queries
import {
  GET_RECIEPIENT_DEFINITION,
  GET_RECIEPIENT_INTERNAL_ID,
} from 'graphql/queries/recipients';

// Mutations
import { CREATE_RECIPIENT } from 'graphql/mutations/families/families-mutation';

// Components
import { showToaster as toast } from 'containers/App/actions';
import { generalErrorHandler } from 'utils/error-handler';
import Content from 'components/shared/Content';
import ActionPanel from 'components/shared/ActionPanel';
import Loading from 'components/shared/Loading';
import ViewHeader from 'components/shared/ViewHeader';
import Notification from 'components/shared/Notification';
import globalMessages from 'messages';
import { filterObj } from '../../utils/helpers';
import { commonStyles, InputWrapper } from './styles';
import Fields from './fields';

function NewRecipient({ intl, location, showToaster, ...rest }) {
  const formApiRef = useRef();
  const classes = commonStyles();
  const [fields, setFields] = useState({ required: [], optional: [] });
  const [loadingState, setloadingState] = useState(false);
  const [redirectState, setRedirectState] = useState(false);
  const [messageState, setmessageState] = useState({
    message: '',
    open: false,
    type: 'success',
  });

  const messageHandler = (event, reason) => {
    if (reason === 'clickaway') return;
    setmessageState({ open: false });
  };

  const handleFormReset = () => {
    formApiRef.current.reset();
  };

  const { loading, error, data } = useQuery(GET_RECIEPIENT_DEFINITION, {
    variables: {
      uuid: location.search.includes('&rdId=')
        ? queryString.parse(location.search).rdId
        : null,
    },
  });

  const {
    loading: internalIdLoading,
    error: internalIdError,
    data: internalIdData,
  } = useQuery(GET_RECIEPIENT_INTERNAL_ID, {
    variables: {
      uuid: location.search.includes('pId=')
        ? queryString.parse(location.search).pId
        : null,
    },
  });

  const [createRecipient] = useMutation(CREATE_RECIPIENT);

  useEffect(() => {
    const rd = data && data.recipientDefinition;
    const id = internalIdData && internalIdData.recipient;
    if (rd && id) {
      const customFields = rd.customFields ? [...rd.customFields] : [];

      setFields({
        showPreFixId: rd.prefixInternalIds,
        preFixSeparator: rd.prefixSeparator,
        preSetValue: id.children && (id.children.length + 1).toString(),
        parentInternalId: id.internalId,
        required: customFields.filter(
          f => f.on_create === 'require' || f.on_create === 'required'
        ),
        optional: customFields.filter(f => f.on_create === 'show'),
      });
    }
  }, [data, internalIdData]);

  const handleSubmit = async formData => {
    const custom = '_custom';
    const defaultFields = filterObj(formData, d => !d.includes(custom));
    let customFields = filterObj(formData, d => d.includes(custom));
    customFields = Object.keys(customFields)
      .map(key => key.replace(custom, ''))
      .reduce(
        (res, key) =>
          Object.assign(res, { [key]: customFields[`${key}${custom}`] }),
        {}
      );

    try {
      setloadingState(true);
      const response = await createRecipient({
        variables: {
          ...defaultFields,
          customFields: JSON.stringify(customFields),
          parentUuid: queryString.parse(location.search).pId,
          recipientDefinitionUuid: queryString.parse(location.search).rdId,
        },
      });
      if (response.data) {
        setRedirectState(true);
      }
    } catch (error) {
      const { graphQLErrors, networkError } = error;
      setloadingState(false);

      if (graphQLErrors.length > 0) {
        const [{ message }] = graphQLErrors;

        setmessageState({
          message,
          open: true,
          type: 'error',
        });
      }

      if (networkError) {
        const { message } = networkError;
        const failedConnection = message.includes('Failed to fetch');
        if (failedConnection) {
          setmessageState({
            message: intl.formatMessage(globalMessages.networkError),
            open: true,
            type: 'error',
          });
        }
      }
    }
  };

  if (error || internalIdError) {
    return generalErrorHandler(error || internalIdError, {
      ...rest,
    });
  }

  if (loading || internalIdLoading) {
    return <Loading />;
  }

  // Redirect user if query params are missing
  if (
    !location.search.includes('pId=') ||
    !location.search.includes('&rdId=') ||
    !location.search.includes('&name=') ||
    !location.search.includes('&path=')
  ) {
    return rest.history.go(-1);
  }

  if (redirectState) {
    showToaster();

    return (
      <Redirect
        to={{
          pathname: queryString.parse(location.search).path,
        }}
      />
    );
  }

  return (
    <>
      <ViewHeader
        component={queryString.parse(location.search).name}
        body={queryString.parse(location.search).name}
      />

      <div className={classes.root}>
        <Grid container>
          <Notification
            status={messageState.open}
            message={messageState.message}
            classes={classes}
            messageHandler={messageHandler}
            duration={3000}
            position={{ vertical: 'top', horizontal: 'right' }}
            type={messageState.type}
          />
          <Grid item xs={9} xl={10} className={classes.fieldsContainer}>
            <InputWrapper>
              <Form
                getApi={formApi => {
                  formApiRef.current = formApi;
                }}
                id="add-new-recipient"
                onSubmit={formData => handleSubmit(formData)}
              >
                {fields.required.length > 0 && (
                  <Content
                    subHeader={`1 ${intl.formatMessage(
                      globalMessages.required
                    )}`}
                    body={<Fields fields={fields.required} fieldsRequired />}
                    containerClass={classes.required}
                    headerClass={classes.sectionHeader}
                  />
                )}

                {fields.optional.length > 0 && (
                  <Content
                    subHeader={`2 ${intl.formatMessage(
                      globalMessages.optionalFields
                    )}`}
                    body={
                      <Fields
                        fields={fields.optional}
                        showPreFixId={fields.showPreFixId}
                        preFixSeparator={fields.preFixSeparator}
                        parentInternalId={fields.parentInternalId}
                        preSetValue={fields.preSetValue}
                      />
                    }
                    containerClass={classes.optionalFields}
                    headerClass={classes.sectionHeader}
                  />
                )}
              </Form>
            </InputWrapper>
          </Grid>
          <ActionPanel
            action="addRecipientChild"
            type="submit"
            formId="add-new-recipient"
            resetForm={handleFormReset}
            loading={loadingState}
            disabled={loadingState}
          />
        </Grid>
      </div>
    </>
  );
}

NewRecipient.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
  showToaster: PropTypes.func,
};

const intlNewRecipient = injectIntl(NewRecipient);

export function mapDispatchToProps(dispatch) {
  return {
    showToaster: () => dispatch(toast()),
    dispatch,
  };
}

export default connect(
  null,
  mapDispatchToProps
)(intlNewRecipient);
