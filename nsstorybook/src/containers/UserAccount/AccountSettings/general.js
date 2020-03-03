/**
 *
 * General
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import InputValidation from 'components/shared/InputValidation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import Lock from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';

import { setOrg as setOrganization } from 'containers/App/actions';
import { makeSelectOrg } from 'containers/App/selectors';
import NSInput from 'components/shared/NSInput';
import NSFields from 'components/shared/NSFields';
import { required } from 'utils/validations';
import { FieldWrapper } from 'global-styles';
import messages from '../messages';
import { commonStyles } from '../styles';

export function General({ intl, data, setOrg, state, localOrg }) {
  const classes = commonStyles();

  const [orgOptions] = useState(
    state.orgsState.map(org => ({ value: org.name, uuid: org.uuid }))
  );

  const handleFieldChange = (field, value) => {
    if (field === 'organization') {
      setOrg(orgOptions.filter(org => org.value === value)[0]);
    }
  };

  return (
    <>
      <Grid item className={classes.spacing}>
        <Typography variant="body1" className={classes.darkText} gutterBottom>
          {intl.formatMessage(messages.emailChange)}
        </Typography>

        <NSInput
          id="user-email"
          label={intl.formatMessage(messages.emailLabel)}
          type="email"
          name="user-email"
          autoComplete="email"
          margin="normal"
          value={data.viewer.email}
          variant="filled"
          position="end"
          icon={Lock}
          className={classes.input}
          disabled
        />
      </Grid>
      <Grid item className={classes.spacing}>
        <InputValidation
          field="firstName"
          type="text"
          initialValue={data.viewer.firstName}
          label={intl.formatMessage(messages.firstNameLabel)}
          validate={required}
          validateOnChange
          validateOnBlur
        />
      </Grid>
      <Grid item>
        <InputValidation
          field="lastName"
          type="text"
          initialValue={data.viewer.lastName}
          label={intl.formatMessage(messages.lastNameLabel)}
          validate={required}
          validateOnChange
          validateOnBlur
        />
        <FieldWrapper>
          <NSFields
            fieldType="single_select"
            field="organization"
            label={intl.formatMessage(messages.organization)}
            initialValue={{ item: localOrg.value, uuid: localOrg.uuid }}
            options={orgOptions}
            onchange={v => handleFieldChange('organization', v)}
          />
        </FieldWrapper>
      </Grid>
    </>
  );
}

General.propTypes = {
  intl: intlShape.isRequired,
  data: PropTypes.any.isRequired,
  state: PropTypes.object.isRequired,
  localOrg: PropTypes.object.isRequired,
  setOrg: PropTypes.func,
};

const intlGeneral = injectIntl(General);

const mapStateToProps = createStructuredSelector({
  localOrg: makeSelectOrg(),
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
)(intlGeneral);
