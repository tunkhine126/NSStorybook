/**
 *
 * PasswordSettings
 *
 */

import React, { useRef, useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Form } from 'informed';
import { useMutation } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';

import Content from 'components/shared/Content';
import ActionPanel, { loadingAction } from 'components/shared/ActionPanel';
import ViewHeader from 'components/shared/ViewHeader';
import Notification from 'components/shared/Notification';
import Loading from 'components/shared/Loading';

import { UPDATE_PASSWORD } from 'graphql/mutations/user-mutation';
import { generalErrorHandler } from 'utils/error-handler';
import globalMessages from 'messages';
import NewPassword from './newPassword';
import ConfirmChanges from './confirmChanges';
import messages from '../messages';

import { commonStyles, InputWrapper } from '../styles';
import { pwdSettingsStyles } from './styles';

export function PasswordSettings({ intl, ...rest }) {
  const formApiRef = useRef();
  const classes = commonStyles();
  const pwdSettingsClasses = pwdSettingsStyles();

  const [loadingState, setloadingState] = useState(false);
  const [messageState, setmessageState] = useState({
    message: '',
    open: false,
    type: 'success',
  });

  const [updatePassword, { loading, error }] = useMutation(UPDATE_PASSWORD);

  const messageHandler = (event, reason) => {
    if (reason === 'clickaway') return;
    setmessageState({ open: false });
  };

  const handleFormReset = () => {
    formApiRef.current.reset();
    formApiRef.current.setError('password', '');
  };

  const handleSubmit = async (data, callBack) => {
    try {
      setloadingState(true);

      const response = await callBack({
        variables: { ...data },
      });
      if (response.data) {
        setmessageState({
          message: intl.formatMessage(messages.passwordUpdated),
          open: true,
          type: 'success',
        });
        const timeOut = loadingAction(setmessageState, setloadingState);

        // Needed to prevent memory leak when component unmounts
        clearTimeout(timeOut);
        handleFormReset();
      }
    } catch (error) {
      const { graphQLErrors, networkError } = error;
      setloadingState(false);

      if (graphQLErrors.length > 0) {
        const [{ message }] = graphQLErrors;
        const invalidPassword = message.includes('Not authorized');

        setmessageState({
          message: invalidPassword
            ? intl.formatMessage(messages.invalidPassword)
            : message,
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

  if (loading) return <Loading />;
  if (error) {
    return generalErrorHandler(error, { ...rest });
  }

  return (
    <>
      <ViewHeader
        component="Password Settings"
        body={intl.formatMessage(messages.pwdSettingsHeader)}
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
          <Grid item xs={9} xl={10} className={classes.settingsContainer}>
            <InputWrapper>
              <Form
                getApi={formApi => {
                  formApiRef.current = formApi;
                }}
                id="change-password"
                onSubmit={formData => handleSubmit(formData, updatePassword)}
              >
                <Content
                  subHeader={intl.formatMessage(messages.newPassword)}
                  body={<NewPassword />}
                  containerClass={pwdSettingsClasses.newPassword}
                  headerClass={classes.sectionHeader}
                />
                <Content
                  subHeader={intl.formatMessage(messages.confirmChanges)}
                  body={<ConfirmChanges />}
                  containerClass={pwdSettingsClasses.confirmContainer}
                  headerClass={classes.sectionHeader}
                />
              </Form>
            </InputWrapper>
          </Grid>
          <ActionPanel
            action="update"
            type="submit"
            formId="change-password"
            resetForm={handleFormReset}
            loading={loadingState}
            disabled={loadingState}
          />
        </Grid>
      </div>
    </>
  );
}

PasswordSettings.propTypes = {
  intl: intlShape.isRequired,
};

const intlPasswordSettings = injectIntl(PasswordSettings);

export default intlPasswordSettings;
