/**
 *
 * CoreSettings
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/Add';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ViewAgenda from '@material-ui/icons/ViewAgenda';
import ViewStream from '@material-ui/icons/ViewStream';
import ViewHeadline from '@material-ui/icons/ViewHeadline';
import ToggleButton from '@material-ui/lab/ToggleButton';

import NSButton from 'components/shared/NSButton';
import NSSelect from 'components/shared/NSSelect';
import CheckBoxGroup from '../checkboxGroup';
import messages from '../messages';
import { styles, tsSelectStyle } from '../styles';

function CoreSettings({
  intl,
  rowChange,
  columnChange,
  columns,
  handleReorderMode,
  density,
  densityChange,
  addingFieldProps: { addingField, setAddingField },
}) {
  const classes = styles();
  const tsSelectStyleClasses = tsSelectStyle();
  const [itemsPerPage, setItemsPerPage] = useState({ item: 15 });
  const [selectedField, setSelectedField] = useState({ item: 'Address' });

  const handleItemsPerPage = e => {
    setItemsPerPage({
      item: e.target.value,
    });
    rowChange(e.target.value);
  };

  const handleFieldChange = e => {
    setSelectedField({
      item: e.target.value,
    });
  };

  const handleFieldBtn = () => {
    setAddingField(!addingField);
  };

  const toggleButtons = [
    { value: '72px', Icon: ViewAgenda },
    { value: '50px', Icon: ViewStream },
    { value: '30px', Icon: ViewHeadline },
  ].map(({ value, Icon }, idx) => (
    <ToggleButton key={idx} value={value} className={classes.tsDensityBtn}>
      <Icon />
    </ToggleButton>
  ));

  const columnsToShow = columns.filter(column => column.show);
  const disableFinalColumn = columnsToShow.length < 2;
  const defaultColumns = columns.map(({ label, show, id }, idx) => (
    <CheckBoxGroup
      key={idx}
      shouldDisable={{ disable: disableFinalColumn, id: columnsToShow[0].id }}
      label={label}
      show={show}
      id={id}
      checboxChange={columnChange}
    />
  ));

  return (
    <>
      <Grid
        item
        container
        xs={8}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.tsColumns}
      >
        <Typography variant="caption" gutterBottom className={classes.caption}>
          {intl.formatMessage(messages.columns)}
        </Typography>

        <Grid
          item
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          className={classes.tsColumnsContainer}
        >
          {defaultColumns}
        </Grid>

        <Grid
          item
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          className={classes.tsActionBtns}
        >
          {!addingField && (
            <>
              <NSButton
                componentClasses={classes.tsReorder}
                variant="contained"
                size="medium"
                onClick={handleReorderMode}
              >
                {intl.formatMessage(messages.reorder)}
              </NSButton>

              <NSButton
                componentClasses={classes.tsAddField}
                variant="contained"
                size="medium"
                onClick={handleFieldBtn}
              >
                <Add className={classes.tsAddIcon} />
                {intl.formatMessage(messages.field)}
              </NSButton>
            </>
          )}

          {addingField && (
            <>
              <div>
                <Typography
                  variant="caption"
                  gutterBottom
                  className={classes.caption}
                >
                  {intl.formatMessage(messages.customField)}
                </Typography>
              </div>

              <Grid
                item
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.tsCustomFieldActions}
              >
                <NSSelect
                  values={selectedField}
                  items={[
                    { value: 'Address' },
                    { value: 'Family' },
                    { value: 'Survey' },
                  ]}
                  update={handleFieldChange}
                  selectOverride={tsSelectStyleClasses}
                  disableLabel
                  label="Field"
                  code="value"
                  value="value"
                  width="153px"
                  padding="5px 10px"
                />

                <NSButton
                  componentClasses={classes.tsAdd}
                  variant="contained"
                  size="medium"
                  onClick={() => {}}
                >
                  {intl.formatMessage(messages.add)}
                </NSButton>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Grid item xs={4} className={classes.tsDensity}>
        <Typography variant="caption" gutterBottom className={classes.caption}>
          {intl.formatMessage(messages.density)}
        </Typography>

        <ToggleButtonGroup
          size="small"
          value={density}
          exclusive
          onChange={densityChange}
          className={classes.tsButtonGroup}
        >
          {toggleButtons}
        </ToggleButtonGroup>

        <div className={classes.tsResultsPerPage}>
          <Typography
            variant="caption"
            gutterBottom
            className={classes.caption}
          >
            {intl.formatMessage(messages.resultsPerPage)}
          </Typography>
        </div>

        <Grid
          item
          container
          className={classes.tsSelectContainer}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <NSSelect
            values={itemsPerPage}
            items={[
              { value: 5 },
              { value: 10 },
              { value: 15 },
              { value: 20 },
              { value: 50 },
              { value: 100 },
            ]}
            update={handleItemsPerPage}
            selectOverride={tsSelectStyleClasses}
            disableLabel
            label="Results per page"
            code="value"
            value="value"
            width="50px"
            padding="5px 10px"
          />
        </Grid>
      </Grid>
    </>
  );
}

CoreSettings.propTypes = {
  intl: intlShape.isRequired,
  rowChange: PropTypes.func.isRequired,
  columnChange: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  handleReorderMode: PropTypes.func.isRequired,
  density: PropTypes.string.isRequired,
  densityChange: PropTypes.func.isRequired,
  addingFieldProps: PropTypes.object.isRequired,
};

const IntlCoreSettings = injectIntl(CoreSettings);
export default IntlCoreSettings;
