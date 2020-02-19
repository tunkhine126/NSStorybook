/**
 *
 * RecipientPanel
 *
 */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { useMutation } from '@apollo/react-hooks';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';

import { generalErrorHandler } from 'utils/error-handler';
import { UPDATE_RECIPIENT } from 'graphql/mutations/families/families-mutation';
import {
  GET_FAMILY_RECIEPIENT_CACHE,
  GET_FAMILY_CHILD_RECIEPIENT_CACHE,
} from 'graphql/queries/families/family-queries';
import SmallRightArrow from 'components/shared/Icons/smallRightArrow';
import NSButton from 'components/shared/NSButton';
import placeHolderImg from 'assets/images/familyPlaceholder.png';
import { generateImg } from 'utils/helpers';
import globalMessages from 'messages';
import TwoColumns from './twoColumns';
import { ftSwitch } from './helper';
import { RecipientViewContext } from '../context';
import {
  recipientListStyles,
  ExpansionPanelDetailsStyle,
  RecipientPanelStyles,
} from '../../styles';

function RecipientPanel({
  intl,
  name,
  type,
  data,
  customFields,
  enableDelete,
  parent = false,
  lastChild = true,
  twoColumn = false,
}) {
  let allOptions = [];
  const singleFields = [];
  let twoColfields = [];
  const allFieldsCurrentValue = {};
  const allPhotoFields = {};
  const allDateFields = {};
  const allTimeFields = {};
  const { rest, match } = useContext(RecipientViewContext);
  const classes = recipientListStyles();
  const rsClasses = RecipientPanelStyles();

  const [updateRecipientChild, { error: childError }] = useMutation(
    UPDATE_RECIPIENT,
    {
      update(
        cache,
        {
          data: {
            updateRecipient: {
              recipient: {
                parent: { children: updatedChildren },
              },
            },
          },
        }
      ) {
        // Update apollo cache after successful db update
        cache.writeQuery({
          query: GET_FAMILY_CHILD_RECIEPIENT_CACHE,
          data: {
            recipient: { children: updatedChildren, __typename: 'Recipient' },
          },
          variables: {
            uuid: match.params.id,
          },
        });
      },
    }
  );

  const [updateRecipient, { error }] = useMutation(UPDATE_RECIPIENT, {
    update(
      cache,
      {
        data: {
          updateRecipient: { recipient },
        },
      }
    ) {
      cache.writeQuery({
        query: GET_FAMILY_RECIEPIENT_CACHE,
        data: {
          recipient,
          __typename: 'Recipient',
        },
        variables: {
          uuid: match.params.id,
        },
      });
    },
  });

  const [recipientData, setRecipientData] = useState({
    currentValue: allFieldsCurrentValue,
    items: [...allOptions],
    photos: allPhotoFields,
    dates: allDateFields,
    times: allTimeFields,
  });

  const [expanded, setExpanded] = useState(false);

  const reArrangeFields = function(arr) {
    const from = arr.indexOf(arr.find(a => a.props.type === 'photo'));
    const to = arr.length - 1;
    arr.splice(to, 0, arr.splice(from, 1)[0]);
  };

  const handleOptionChange = (value, field) => {
    setRecipientData(state => ({
      ...state,
      currentValue: { ...state.currentValue, [field]: { item: value } },
    }));
  };

  const handleDateTimeChange = (value, field, types) => {
    setRecipientData(state => ({
      ...state,
      [types]: { ...state[types], [field]: value },
    }));
  };

  if (customFields) {
    customFields
      .filter((f, i) => {
        if (f.option_values) {
          if (f.field_type === 'multi_select') {
            allFieldsCurrentValue[f.name] = {
              item: !data.customFields[f.name] ? [] : data.customFields[f.name],
            };
          } else {
            allFieldsCurrentValue[f.name] = {
              item: !data.customFields[f.name]
                ? f.option_values[0]
                : data.customFields[f.name],
            };
          }
        }
        if (f.field_type === 'photo') {
          allPhotoFields[f.name] = data.customFields[f.name];
        }

        if (f.field_type === 'date') {
          allDateFields[f.name] = data.customFields[f.name];
        }

        if (f.field_type === 'time') {
          allTimeFields[f.name] = data.customFields[f.name];
        }

        singleFields.push(
          ftSwitch(
            f,
            data,
            i,
            recipientData,
            handleOptionChange,
            handleDateTimeChange,
            parent ? updateRecipient : updateRecipientChild
          )
        );
        return f.option_values;
      })
      .map(o => o.option_values)
      .forEach(group => {
        group.forEach(o => {
          allOptions = [...allOptions, { value: o }];
        });
      });

    reArrangeFields(singleFields);

    if (twoColumn && customFields.length > 0) {
      for (let i = 0; i < singleFields.length; i += 2) {
        const current = singleFields[i];
        const next = singleFields[i + 1];

        twoColfields = [
          ...twoColfields,
          <TwoColumns
            key={i + 5 * 10}
            col1={current || <></>}
            col2={next || <></>}
          />,
        ];
      }
    }
  }

  if (error || childError) {
    return generalErrorHandler(error || childError, { ...rest });
  }

  return (
    <>
      <ExpansionPanel onChange={(event, open) => setExpanded(open)}>
        <ExpansionPanelSummary
          expandIcon={<SmallRightArrow />}
          aria-controls="family-member"
          id={name.toLowerCase().replace(/ /g, '')}
        >
          <Grid container direction="column" justify="flex-start">
            <Typography variant="body2" className={classes.contentBody}>
              {name}
            </Typography>
            {type && (
              <Typography variant="caption" className={classes.caption}>
                {type}
              </Typography>
            )}
          </Grid>
        </ExpansionPanelSummary>

        <ExpansionPanelDetailsStyle>
          <ExpansionPanelDetails>
            <Grid container direction="row">
              <Grid item xs={6}>
                <CardMedia
                  className={classes.recipientChildPhoto}
                  component="img"
                  alt={data.name}
                  width="100%"
                  image={
                    data.base64Avatar
                      ? generateImg(data.base64Avatar)
                      : placeHolderImg
                  }
                  title={data.name}
                />
              </Grid>
              <Grid item xs={12}>
                {twoColumn ? twoColfields : singleFields}

                <Divider light />

                {enableDelete && (
                  <Grid
                    item
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                    className={rsClasses.deleteRecipientContainer}
                  >
                    <NSButton
                      textBtn
                      variant="contained"
                      size="small"
                      onClick={() => console.log('DELETING MEMBER')}
                      componentClasses="recipient-delete-btn"
                    >
                      <DeleteIcon className={rsClasses.deleteIcon} />

                      <Typography
                        variant="body1"
                        className={classes.recipientDeleteBtnText}
                      >
                        {intl.formatMessage(globalMessages.deleteRecipient)}
                      </Typography>
                    </NSButton>
                  </Grid>
                )}

                {!lastChild && <Divider className={rsClasses.divider} />}
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanelDetailsStyle>
      </ExpansionPanel>
      {!lastChild && !expanded && <Divider light className={classes.divider} />}
    </>
  );
}

RecipientPanel.propTypes = {
  intl: intlShape.isRequired,
  name: PropTypes.string.isRequired,
  customFields: PropTypes.array,
  data: PropTypes.object.isRequired,
  lastChild: PropTypes.bool,
  parent: PropTypes.bool,
  twoColumn: PropTypes.bool,
  enableDelete: PropTypes.bool,
  type: PropTypes.string,
};

const intlRecipientPanel = injectIntl(RecipientPanel);

export default intlRecipientPanel;
