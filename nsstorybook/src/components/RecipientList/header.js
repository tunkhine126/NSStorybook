/**
 *
 * RecipientList Header
 *
 */

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import Edit from '@material-ui/icons/Edit';
import ImportExport from '@material-ui/icons/ImportExport';

import colors from 'global-styles';
import NSMenuItem from 'components/shared/NSMenuItem';
import TextLink from 'components/shared/TextLink';
import HeaderButton from 'components/shared/HeaderButton';
import placeHolderImg from 'assets/images/familyPlaceholder.png';
import { generateImg } from 'utils/helpers';
import globalMessages from 'messages';
import { RecipientViewContext } from './RecipientView/context/index';
import { recipientListStyles, helperClasses } from './styles';

function a11yProps(name) {
  return {
    id: `${name}-tab`,
    'aria-controls': `${name}-control-tab`,
  };
}

export function Header({ intl, value }) {
  const { data, tabChange, profileDetails, primaryRecipient } = useContext(
    RecipientViewContext
  );
  const classes = recipientListStyles();
  const { survyReqBtn } = helperClasses;

  const TabNavs = [
    intl.formatMessage(globalMessages.overview),
    intl.formatMessage(globalMessages.profile),
    primaryRecipient ? intl.formatMessage(globalMessages.rtSurveys) : '',
    profileDetails.childRecipients,
    intl.formatMessage(globalMessages.files),
    intl.formatMessage(globalMessages.impact),
  ]
    .filter(m => m)
    .map((tab, idx, array) => (
      <Tab
        key={tab}
        label={tab}
        disabled={array.length - 1 === idx || array.length - 2 === idx}
        {...a11yProps(tab)}
        className={classes.tab}
      />
    ));

  const [anchorEl, setAnchorEl] = useState(null);

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

  // TODO: Complete actions
  const actions = [
    {
      action: () => console.log('go to survey request'),
      icon: Add,
      text: profileDetails.recipientName,
    },
    {
      action: e => {
        tabChange(e, 1);
        handleClose();
      },
      icon: Edit,
      text: `Edit ${profileDetails.recipientName}`,
    },
    {
      action: () => console.log('go to update status'),
      icon: ImportExport,
      text: intl.formatMessage(globalMessages.updateStatus),
    },
  ];

  return (
    <Grid container>
      <Grid item xs={2} className={classes.cardContainer}>
        <Card className={classes.headerImg}>
          <img
            height="100%"
            alt={data.name}
            src={
              data.base64Avatar
                ? generateImg(data.base64Avatar)
                : placeHolderImg
            }
            title={data.name}
          />
        </Card>
      </Grid>
      <Grid container item className={classes.navContainer}>
        <Grid container item direction="row-reverse">
          <Grid
            item
            container
            xs={8}
            justify="flex-end"
            alignItems="flex-start"
          >
            <Grid item container justify="flex-end">
              <HeaderButton
                version={1}
                bgColor={colors.TEXT.medium}
                padding={survyReqBtn.padding}
              >
                <>
                  <Add />
                  {profileDetails.recipientName}
                </>
              </HeaderButton>
              <TextLink
                content={intl.formatMessage(globalMessages.moreBtn)}
                onClick={handleMenuClick}
                className={classes.moreBtn}
              />
              <Menu
                id={profileDetails.recipientName.replace(/ /g, '-')}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={0}
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
                {actions.map(({ icon, text, action }, idx) => (
                  <NSMenuItem
                    key={idx}
                    icon={icon}
                    text={text}
                    handleItemClick={action}
                  />
                ))}
              </Menu>
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.recipientInfo}>
            <Typography variant="h1" className={classes.recipientName}>
              {data.name}
            </Typography>
            <Typography variant="caption" className={classes.recipientId}>
              {data.internalId}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container alignItems="flex-end">
          <AppBar position="static" color="default" className={classes.appBar}>
            <Tabs
              value={value}
              onChange={tabChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="Recipient List Tabs"
            >
              {TabNavs}
            </Tabs>
          </AppBar>
        </Grid>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  intl: intlShape.isRequired,
  value: PropTypes.number.isRequired,
};

const intlHeader = injectIntl(Header);

export default intlHeader;
