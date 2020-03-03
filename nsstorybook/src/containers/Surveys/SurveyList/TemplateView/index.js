/**
 *
 * TemplateView
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import { injectIntl, intlShape } from 'react-intl';

import Edit from '@material-ui/icons/Edit';
import Launch from '@material-ui/icons/Launch';
import FileCopy from '@material-ui/icons/FileCopy';
import Delete from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

// Queries
import { GET_SURVEY } from 'graphql/queries/surveys/survey-queries';
import { GET_USER } from 'graphql/queries/user-queries';

// Components
import NSMenuItem from 'components/shared/NSMenuItem';
import NSButton from 'components/shared/NSButton';
import TextLink from 'components/shared/TextLink';
import { generalErrorHandler } from 'utils/error-handler';
import Loading from 'components/shared/Loading';
import TabViews from 'components/shared/TabViews';
import globalMessages from 'messages';
import RecipientList from './RecipientList/index';
import Overview from './overview';
import Reports from './reports';
import { styles } from './styles';

function TemplateView({ intl, match, primaryRecipientDetails, ...rest }) {
  const classes = styles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    ChildRoutes: [{ path: primaryRecipientIdPath }],
  } = primaryRecipientDetails;

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const PaperProps = {
    style: {
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
      width: 200,
    },
  };

  function handleTabChange(_, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  const { loading: loadingUser, error: userError, data: userData } = useQuery(
    GET_USER,
    {
      fetchPolicy: 'network-only',
    }
  );

  const { loading, error, data } = useQuery(GET_SURVEY, {
    variables: {
      uuid: match.params.id,
    },
  });

  if (error || userError) {
    return generalErrorHandler(error || userError, {
      ...rest,
    });
  }

  if (loading || loadingUser) {
    return <Loading />;
  }

  const {
    survey: { name, surveySections, submissions },
  } = data;

  return (
    <div>
      <Helmet>
        <title>New Story - Survey Templates</title>
        <meta name="description" content="Survey Templates" />
      </Helmet>
      <TabViews
        data={{ name }}
        tabValues={[
          intl.formatMessage(globalMessages.overview),
          intl.formatMessage(globalMessages.reports),
          intl.formatMessage(globalMessages.submissions),
          intl.formatMessage(globalMessages.translations),
          intl.formatMessage(globalMessages.preview),
        ]}
        btns={
          <>
            <NSButton version={2}>
              <>
                <Edit fontSize="small" className={classes.editBtn} />
                <Typography className={classes.editText}>
                  {intl.formatMessage(globalMessages.edit)}
                </Typography>
              </>
            </NSButton>
            <TextLink
              content={intl.formatMessage(globalMessages.moreBtn)}
              onClick={handleMenuClick}
              className={classes.moreBtn}
            />
            {/* TODO: Revisit Actions */}
            <Menu
              id="survey-template-options"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              elevation={8}
              getContentAnchorEl={null}
              PaperProps={PaperProps}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {[
                {
                  action: () => {},
                  icon: Launch,
                  text: 'Export All Submissions',
                },
                {
                  action: () => {},
                  icon: Launch,
                  text: 'Export Template',
                },
                {
                  action: () => {},
                  icon: FileCopy,
                  text: 'Duplicate Template',
                },
                {
                  action: () => {},
                  icon: Delete,
                  text: 'Delete Template',
                },
              ].map(({ icon, text, action }, idx) => (
                <NSMenuItem
                  key={idx}
                  icon={icon}
                  text={text}
                  handleItemClick={action}
                />
              ))}
            </Menu>
          </>
        }
        tabViews={[
          <Overview
            data={surveySections}
            submissionData={submissions}
            userContext={userData.viewer.defaultContextPermalink}
            {...rest}
          />,
          <Reports
            surveyUuid={match.params.id}
            surveySections={surveySections}
            userContext={userData.viewer.defaultContextPermalink}
            totalPossibleResponses={submissions.length}
            surveyName={name}
            primaryRecipientIdPath={primaryRecipientIdPath}
            {...rest}
          />,
          <RecipientList
            {...rest}
            name={name}
            surveyId={match.params.id}
            primaryRecipientDetails={primaryRecipientDetails}
          />,
          <>Translations</>,
          <>Preview</>,
        ]}
        currentTabValue={value}
        tabChange={handleTabChange}
        indexChange={handleChangeIndex}
      />
    </div>
  );
}

TemplateView.propTypes = {
  intl: intlShape.isRequired,
  match: PropTypes.object.isRequired,
  primaryRecipientDetails: PropTypes.object.isRequired,
};

const intlRecipientView = injectIntl(TemplateView);

export default intlRecipientView;
