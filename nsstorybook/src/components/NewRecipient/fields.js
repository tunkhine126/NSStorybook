/**
 *
 * Fields
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import NSFields from '../NSFields';

import { required } from 'utils/validations';
import { commonStyles } from './styles';

export function Fields({
  fields,
  showPreFixId,
  preFixSeparator,
  parentInternalId,
  preSetValue,
  fieldsRequired = false,
}) {
  let requiredProps = {};
  const classes = commonStyles();

  if (fieldsRequired) {
    requiredProps = {
      validateOnChange: true,
      validateOnBlur: true,
      required: true,
      validate: required,
    };
  }

  const [fieldState, setFieldState] = useState(
    fields.reduce((o, key) => ({ ...o, [key.name]: { item: [] } }), {})
  );

  const handleFieldChange = (field, value) =>
    setFieldState(state => ({ ...state, [field]: { item: value } }));

  const Prefix = () => (
    <p style={{ width: 'max-content' }}>{parentInternalId + preFixSeparator}</p>
  );

  const fieldsToRender =
    fields.length > 0 &&
    fields.map((f, idx) => {
      const selectFields = ['single_select', 'multi_select', 'likert'];
      if (selectFields.includes(f.field_type)) {
        return (
          <NSFields
            key={idx}
            fieldType={f.field_type}
            field={`${f.name}_custom`}
            label={f.contexts.us_en.label}
            values={fieldState[f.name]}
            options={f.option_values.map(o => ({ value: o }))}
            onchange={v => handleFieldChange(f.name, v)}
            {...requiredProps}
          />
        );
      }
      return (
        <NSFields
          key={idx}
          fieldType={f.field_type}
          field={`${f.name}_custom`}
          label={f.contexts.us_en.label}
          {...requiredProps}
        />
      );
    });
  return (
    <Grid item className={classes.spacing}>
      {fieldsRequired && (
        <NSFields
          fieldType="short_text"
          field="name"
          label="Name"
          {...requiredProps}
        />
      )}

      {!fieldsRequired && (
        <>
          <NSFields
            fieldType="photo"
            field="base64Avatar"
            label="Avatar"
            {...requiredProps}
          />

          <NSFields
            fieldType="short_text"
            field="internalId"
            label="Internal Id"
            position="start"
            initialValue={preSetValue}
            showPrefix={showPreFixId}
            icon={Prefix}
            {...requiredProps}
          />

          <NSFields
            fieldType="paragraph_text"
            field="description"
            label="Description"
            {...requiredProps}
          />
        </>
      )}

      {fieldsToRender}
    </Grid>
  );
}

Fields.propTypes = {
  fields: PropTypes.array.isRequired,
  fieldsRequired: PropTypes.bool,
  showPreFixId: PropTypes.bool,
  preFixSeparator: PropTypes.string,
  parentInternalId: PropTypes.string,
  preSetValue: PropTypes.string,
};

export default Fields;
