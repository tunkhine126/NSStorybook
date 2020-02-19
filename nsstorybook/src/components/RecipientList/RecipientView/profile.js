/**
 *
 * Profile
 *
 */

import React, { useContext, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';

import Grid from '@material-ui/core/Grid';

import globalMessages from 'messages';
import Widget from './Widget/widget';
import RecipientPanel from './Widget/recipientPanel';
import { RecipientViewContext } from './context/index';
import { recipientListStyles } from '../styles';

function Profile({ intl }) {
  let recipientCustomFields = [];
  let childCustomFields = null;
  const classes = recipientListStyles();
  const { data, rest, rdData, profileDetails } = useContext(
    RecipientViewContext
  );
  const { history, location } = rest;

  if (data.children.length > 0) {
    const {
      children: [
        {
          recipientDefinition: { customFields: CF },
        },
      ],
    } = data;
    childCustomFields = CF;
  }

  const {
    recipientDefinition: { customFields: PCF },
  } = data;

  recipientCustomFields = PCF;

  const recipientChildPanels = data.children.map((c, idx) => (
    <Fragment key={idx}>
      <RecipientPanel
        name={c.name}
        customFields={childCustomFields}
        data={c}
        twoColumn
        enableDelete
        lastChild={data.children.length === idx + 1}
      />
    </Fragment>
  ));

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      className={classes.container}
    >
      <Grid item xs={9}>
        <Widget
          header={profileDetails.recipientName}
          body={
            <RecipientPanel
              name={intl.formatMessage(globalMessages.generalInfo)}
              customFields={recipientCustomFields}
              data={data}
              twoColumn
              parent
            />
          }
        />
      </Grid>
      {profileDetails.childRecipients && (
        <Grid item xs={9}>
          <Widget
            header={profileDetails.childRecipients}
            body={recipientChildPanels}
            disableBtn={!rdData.customFields}
            message="addRecipientChild"
            btnHandler={() => {
              history.push(
                `/recipients/add/recipient?pId=${data.uuid}&rdId=${
                  rdData.uuid
                }&name=${profileDetails.addRecipientName}&path=${
                  location.pathname
                }`
              );
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}

Profile.propTypes = {
  intl: intlShape.isRequired,
};

const intlProfile = injectIntl(Profile);

export default intlProfile;
