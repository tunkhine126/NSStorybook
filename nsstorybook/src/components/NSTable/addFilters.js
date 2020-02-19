/**
 *
 * NSFilters
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import CustomCheckBox from 'components/shared/Icons/customCheckbox';
import CheckboxChecked from 'components/shared/Icons/checkboxChecked';
import TextLink from 'components/shared/TextLink';
import globalMessages from 'messages';
import HeaderButton from 'components/shared/HeaderButton';
import messages from './messages';
import { styles, helperClasses, listItemStyles, SelectStyles } from './styles';

function AddFilters({ filterCategories, filters, handlechange, handleReset }) {
  const classes = styles();
  const selectClasses = SelectStyles();
  const listItemClasses = listItemStyles();
  const { lookUpBtn } = helperClasses;
  const MenuProps = {
    transitionDuration: 1,
    onEnter: e => {
      e.style.transition = 'opacity 292ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';
    },
    onEntered: e => {
      e.style.left = `${parseInt(e.style.left) - 38}px`;
    },
    PaperProps: {
      style: {
        maxHeight: '290px',
        boxShadow: '0px 3px 3px -1px rgba(138,138,138,1)',
        width: 150,
      },
    },
    MenuListProps: {
      style: {
        paddingTop: 0,
      },
      className: 'filter-items',
    },
  };

  return (
    <Grid item className={classes.addFiltersContainer}>
      <FormControl className={classes.formControl}>
        <Select
          multiple
          classes={selectClasses}
          name="addFilters"
          value={filters}
          onChange={handlechange}
          IconComponent={() => ''}
          input={
            <HeaderButton version={3} padding={lookUpBtn.padding}>
              <FormattedMessage {...globalMessages.addFilters} />
            </HeaderButton>
          }
          renderValue={() => (
            <FormattedMessage {...globalMessages.addFilters} />
          )}
          MenuProps={MenuProps}
        >
          <Grid
            className={classes.recipientListHeader}
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Typography
              variant="body1"
              className={clsx(classes.filterMenuHeaderText)}
              gutterBottom
            >
              <FormattedMessage {...messages.filters} />
            </Typography>

            <TextLink
              content={<FormattedMessage {...messages.reset} />}
              onClick={handleReset}
              className={classes.resetBtn}
            />
          </Grid>
          {filterCategories.map(
            category =>
              category.show &&
              category.filter && (
                <MenuItem
                  key={category.id}
                  value={category.id}
                  className={classes.filterItem}
                >
                  <Checkbox
                    checked={filters.indexOf(category.id) > -1}
                    icon={<CustomCheckBox />}
                    checkedIcon={<CheckboxChecked />}
                  />
                  <ListItemText
                    primary={category.label}
                    classes={listItemClasses}
                  />
                </MenuItem>
              )
          )}
        </Select>
      </FormControl>
    </Grid>
  );
}

AddFilters.propTypes = {
  filterCategories: PropTypes.array.isRequired,
  handlechange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
};

export default AddFilters;
