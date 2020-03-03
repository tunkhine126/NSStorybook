/**
 *
 * AccountSettings
 *
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Form } from 'informed';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';

import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Loading from 'components/shared/Loading';
import ViewHeader from 'components/shared/ViewHeader';
import Content from 'components/shared/Content';
import ActionPanel, { loadingAction } from 'components/shared/ActionPanel';
import Notification from 'components/shared/Notification';

import { UPDATE_PROFILE } from 'graphql/mutations/user-mutation';
import { GET_USER } from 'graphql/queries/user-queries';
import { GET_USER_ORGANIZATIONS } from 'graphql/queries/organization-queries';
import { generalErrorHandler } from 'utils/error-handler';
import globalMessages from 'messages';
import messages from '../messages';

import General from './general';
import LangSettings from './languageSettings';
import Password from './password';
import { commonStyles, InputWrapper } from '../styles';
import { accSettingsStyles } from './styles';

export function AccountSettings({ intl, onLocaleToggle, locale, ...rest }) {
  const formApiRef = useRef();
  const classes = commonStyles();
  const accSetClasses = accSettingsStyles();

  const [messageState, setmessageState] = useState({
    message: '',
    open: false,
    type: 'success',
  });

  const [langState, setLangState] = useState({ item: '' });
  const [loadingState, setloadingState] = useState(false);
  const [survlangState, setSurvLangState] = useState({
    item: 'us_en',
  });

  const {
    loading: queryLoading,
    error: queryError,
    data: userData,
    client,
  } = useQuery(GET_USER);

  const { loading: orgsLoading, error: orgsError, data: orgsData } = useQuery(
    GET_USER_ORGANIZATIONS
  );

  const [orgsState, setOrgsState] = useState([]);

  const [updateProfile, { error: mutationError }] = useMutation(UPDATE_PROFILE);

  const messageHandler = (event, reason) => {
    if (reason === 'clickaway') return;
    setmessageState({ open: false });
  };

  function handleLangChange(e) {
    onLocaleToggle(e.target.value);
    setLangState({
      item: e.target.value,
    });
  }
  function handleSurvLangChange(e) {
    setSurvLangState({
      item: e.target.value,
    });
  }
  const sections = [
    {
      Component: General,
      formatedMsg: 'general',
      containerClass: classes.generalContainer,
      props: {
        orgsState,
      },
    },
    {
      Component: LangSettings,
      formatedMsg: 'langSettings',
      containerClass: accSetClasses.langSetContainer,
      props: {
        survlangState,
        langState,
        handleSurvLangChange,
        handleLangChange,
        setSurvLangState,
      },
    },
    {
      Component: Password,
      formatedMsg: 'password',
      containerClass: accSetClasses.passwordContainer,
    },
  ];
  const content = data =>
    sections.map(({ formatedMsg, Component, containerClass, props }, idx) => (
      <Content
        key={idx}
        subHeader={intl.formatMessage(messages[formatedMsg])}
        body={<Component data={data} state={props} />}
        containerClass={containerClass}
        headerClass={classes.sectionHeader}
      />
    ));

  const handleSave = async (data, callBack) => {
    data.defaultContextPermalink = survlangState.item;
    data.language = langState.item;
    delete data.organization;

    try {
      setloadingState(true);

      const response = await callBack({
        variables: { ...data },
      });
      if (response.data) {
        const {
          firstName,
          lastName,
          defaultContext: { permalink },
          language,
        } = {
          ...response.data.updateProfile.viewer,
        };

        // Upon successful save, update apollo cache
        client.writeData({
          data: {
            viewer: {
              firstName,
              lastName,
              defaultContextPermalink: permalink,
              language,
              __typename: 'User',
            },
          },
        });

        setmessageState(state => ({
          ...state,
          open: true,
          message: intl.formatMessage(messages.accountUpdated),
        }));
        const timeOut = loadingAction(setmessageState, setloadingState);

        // Needed to prevent memory leak when component unmounts
        clearTimeout(timeOut);
      }
    } catch (error) {
      const { graphQLErrors, networkError } = error;

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

  const handleFormReset = () => {
    formApiRef.current.reset();
  };

  useEffect(() => {
    setLangState({
      item: locale,
    });

    if (!orgsLoading && orgsData) {
      setOrgsState(orgsData.organizations);
    }
  }, [locale, orgsData, orgsLoading]);

  if (queryLoading || orgsLoading || orgsState.length === 0) return <Loading />;

  if (queryError || orgsError || mutationError) {
    return generalErrorHandler(queryError || orgsError || mutationError, {
      ...rest,
    });
  }

  return (
    <>
      <ViewHeader
        component="Account Settings"
        body={intl.formatMessage(messages.accSettingsHeader)}
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
                id="update-account"
                onSubmit={formData => handleSave(formData, updateProfile)}
              >
                {content(userData)}
              </Form>
            </InputWrapper>
          </Grid>
          <ActionPanel
            action="save"
            type="submit"
            formId="update-account"
            resetForm={handleFormReset}
            loading={loadingState}
            disabled={loadingState}
          />
        </Grid>
      </div>
    </>
  );
}

AccountSettings.propTypes = {
  intl: intlShape.isRequired,
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  })
);

const intlAccountSettings = injectIntl(AccountSettings);

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: value => dispatch(changeLocale(value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(intlAccountSettings);
