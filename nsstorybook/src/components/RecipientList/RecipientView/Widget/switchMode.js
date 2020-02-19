/**
 *
 * SwitchMode
 *
 */

import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'informed';
import moment from 'moment';
import { injectIntl, intlShape } from 'react-intl';

import Grid from '@material-ui/core/Grid';

import NSButton from 'components/shared/NSButton';
import TextLink from 'components/shared/TextLink';
import globalMessages from 'messages';
import { RecipientViewContext } from '../context';
import { SwithModeStyle } from '../../styles';
import ColumnContent from './columnContent';
import { FieldsContext } from '../context/fields';

function SwitchMode({
  intl,
  element,
  label,
  content,
  classes,
  currentField,
  fieldType,
  rData,
  field,
  uuid,
  handleDateTimeChange,
  handleOptionChange,
  updateRecipient,
}) {
  const localClasses = SwithModeStyle();
  const [editMode, setEditMode] = useState(false);
  const formApiRef = useRef();
  const formattedName = label.toLowerCase().replace(/ /g, '');
  const {
    toasterProps: { setToaster },
    saveProps: { setSaveState },
  } = useContext(RecipientViewContext);
  const {
    recipientPhotoProps: { recipientPhoto },
  } = useContext(FieldsContext);

  const [localChildData, setLocalChildData] = useState(rData);

  const localOptionChange = (value, fieldToChange) => {
    setLocalChildData(state => ({
      ...state,
      currentValue: {
        ...state.currentValue,
        [fieldToChange]: { item: value },
      },
    }));
  };

  const responseHandler = (response, fieldToSubmit) => {
    if (response.data) {
      let undoSettings;
      // Open Toaster
      if (field.field_type === 'photo') {
        undoSettings = () => handleSave({ ...rData.photos }, true);
      } else if (field.field_type === 'time') {
        undoSettings = () =>
          handleSave({
            [currentField]: rData.times[field.name],
          });
      } else if (field.field_type === 'multi_select') {
        undoSettings = () =>
          handleSave({
            [currentField]: rData.currentValue[currentField].item,
          });
      } else {
        undoSettings = () => handleSave({ [currentField]: content });
      }

      setToaster({
        show: true,
        recipientUuid: uuid,
        field: currentField,
        undoHandler: () => undoSettings(),
      });

      if (field.field_type === 'date') {
        if (moment(fieldToSubmit[currentField]).isValid()) {
          handleDateTimeChange(
            moment(fieldToSubmit[currentField]).format('YYYY-MM-DD'),
            field.name,
            'dates'
          );
        } else {
          handleDateTimeChange(null, field.name, 'dates');
        }
      }

      if (field.field_type === 'time') {
        if (fieldToSubmit[currentField]) {
          handleDateTimeChange(
            moment(new Date(fieldToSubmit[currentField])).toLocaleString(),
            field.name,
            'times'
          );
        } else {
          handleDateTimeChange(null, field.name, 'times');
        }
      }

      if (
        field.field_type === 'single_select' ||
        field.field_type === 'multi_select' ||
        field.field_type === 'likert'
      ) {
        handleOptionChange(fieldToSubmit[currentField], currentField);
      }
    }
  };

  const handleSave = async (data, undoPhoto) => {
    // convert empty strings to null
    let mergedData;
    const scrubbedData = { ...data };
    const entries = Object.entries(data);

    entries.forEach(e => {
      if (e[1] === '' || e[1] === 'Invalid date') {
        scrubbedData[e[0]] = null;
      } else if (fieldType === 'time' && !data[e[0]]) {
        scrubbedData[e[0]] = '';
      } else {
        scrubbedData[e[0]] = data[e[0]];
      }
    });

    if (!scrubbedData[currentField]) {
      scrubbedData[currentField] = null;
    }

    if (undoPhoto) {
      mergedData = { ...data };
    } else {
      mergedData = { ...scrubbedData, ...recipientPhoto };
    }

    const fieldToSubmit = { [currentField]: mergedData[currentField] };

    // START LOADING
    setSaveState({
      isLoading: true,
      recipientUuid: uuid,
      field: currentField,
    });

    try {
      const response = await updateRecipient({
        variables: {
          uuid,
          customFields: JSON.stringify(fieldToSubmit),
        },
      });

      responseHandler(response, fieldToSubmit);
    } catch (error) {
      console.log('ERROR', error);
    }
    // STOP LOADING
    setSaveState({ isLoading: false, recipientUuid: null, field: null });
  };

  return (
    <span className={classes}>
      {editMode ? (
        <Form
          getApi={formApi => {
            formApiRef.current = formApi;
          }}
          id={`${formattedName}-form`}
          onSubmit={d => {
            setEditMode(false);
            handleSave(d);
          }}
        >
          <div className={localClasses.formContent}>
            {field.field_type === 'single_select' ||
            field.field_type === 'multi_select' ||
            field.field_type === 'likert'
              ? element(localChildData, localOptionChange)
              : element}
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <TextLink
                className="edit-cancel-btn"
                content={intl.formatMessage(globalMessages.cancel)}
                onClick={() => setEditMode(false)}
              />
              <NSButton
                componentClasses="edit-save-btn"
                id="save-button"
                type="submit"
                version={2}
              >
                {intl.formatMessage(globalMessages.save)}
              </NSButton>
            </Grid>
          </div>
        </Form>
      ) : (
        <ColumnContent
          customClasses="recipient-column"
          header={label}
          handleEditMode={setEditMode}
          recipientUuid={uuid}
          field={currentField}
          data={content || ''}
          dynamic
        />
      )}
    </span>
  );
}

SwitchMode.propTypes = {
  intl: intlShape.isRequired,
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  label: PropTypes.string.isRequired,
  currentField: PropTypes.string.isRequired,
  rData: PropTypes.any.isRequired,
  field: PropTypes.object.isRequired,
  uuid: PropTypes.string,
  handleDateTimeChange: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  updateRecipient: PropTypes.func.isRequired,
  content: PropTypes.any,
  classes: PropTypes.string,
  fieldType: PropTypes.string,
};

const intlSwitchMode = injectIntl(SwitchMode);

export default intlSwitchMode;
