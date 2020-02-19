/**
 *
 * Tab Content
 *
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import Box from '@material-ui/core/Box';

import Overview from './overview';
import Profile from './profile';
import Surveys from './surveys';
import { TabContentStyle, TabContentStyles } from '../styles';
import { RecipientViewContext } from './context/index';
import RecipientList from '../index';

function TabContent({ value, indexChange, details = {}, name, ...rest }) {
  const { profileDetails, primaryRecipient, match } = useContext(
    RecipientViewContext
  );

  const classes = TabContentStyles();
  const applySurveysAndChildRecipients =
    primaryRecipient && profileDetails.childRecipients;

  let filesHiddenCheck;
  let impactHiddenCheck;

  if (applySurveysAndChildRecipients) {
    filesHiddenCheck = value !== 4;
    impactHiddenCheck = value !== 5;
  } else if (primaryRecipient || profileDetails.childRecipients) {
    filesHiddenCheck = value !== 3;
    impactHiddenCheck = value !== 4;
  } else {
    filesHiddenCheck = value !== 2;
    impactHiddenCheck = value !== 3;
  }

  const TabViews = [
    <Overview />,
    <Profile />,
    primaryRecipient ? <Surveys location={rest.location} /> : null,
    profileDetails.childRecipients ? (
      <Box
        hidden={primaryRecipient ? value !== 3 : value !== 2}
        p={3}
        className={classes.recipientListContainer}
      >
        <RecipientList
          disableHeader
          details={details}
          preSetFilterId={match.params.id}
          preSetFilterName={name}
        />
      </Box>
    ) : null,
    <Box hidden={filesHiddenCheck} p={3}>
      Files
    </Box>,
    <Box hidden={impactHiddenCheck} p={3}>
      Impact
    </Box>,
  ].filter(m => m);

  return (
    <TabContentStyle>
      <SwipeableViews onChangeIndex={indexChange}>
        {TabViews[value]}
      </SwipeableViews>
    </TabContentStyle>
  );
}

TabContent.propTypes = {
  value: PropTypes.number.isRequired,
  indexChange: PropTypes.func.isRequired,
  details: PropTypes.object,
  name: PropTypes.string,
};

export default TabContent;
