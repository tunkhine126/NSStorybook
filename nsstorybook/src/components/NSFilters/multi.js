/* eslint-disable react/prop-types */
/**
 *
 * MultiSelect
 *
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl } from 'react-intl';
import Fuse from 'fuse.js';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

import CheckBoxGroup from 'components/shared/CheckboxGroup';
import { NSFiltersContext } from './context/filters';
import { SelectFilterStyles, multiSelectSearchClasses } from './styles';

export function MultiSelect({
  label,
  id: filterId,
  data,
  filterQueryTriggers,
}) {
  const classes = SelectFilterStyles();
  const {
    multiSelect: {
      multiSelectOptions: options,
      setMultiSelectOptions: setOptions,
    },
    handleSelected,
  } = useContext(NSFiltersContext);

  if (options[filterId] && options[filterId].length === 0) {
    setOptions(currentState => ({ ...currentState, [filterId]: data }));
  }

  const searchClasses = multiSelectSearchClasses();
  const settings = {
    threshold: 0.0,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['label'],
  };
  const fuse = new Fuse(data, settings);

  const handleCheckboxChange = (status, id) => {
    handleSelected([]);
    setOptions(currentState => ({
      ...currentState,
      [filterId]: options[filterId].map(option => {
        if (option.id === id) {
          option.selected = status;
        }
        return option;
      }),
    }));

    if (filterQueryTriggers[filterId]) {
      filterQueryTriggers[filterId]({
        query: options[filterId]
          .filter(option => option.selected)
          .map(o => o.id),
        chips: options[filterId]
          .filter(option => option.selected)
          .map(o => o.label),
      });
    }
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className={clsx(classes.multiSelectContainer, 'multi-checkbox')}
    >
      <TextField
        classes={searchClasses}
        id={`${label}-search`}
        onChange={e => {
          const { value } = e.target;
          const newList =
            fuse.search(value).length > 0 ? fuse.search(value) : data;

          setOptions(currentState => ({
            ...currentState,
            [filterId]: newList,
          }));
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Grid container className={classes.optionsContainer}>
        {options[filterId].map(
          ({ label: optionLabel, count, id, selected }, idx) => (
            <CheckBoxGroup
              key={idx}
              shouldDisable={{
                disable: false,
                id: null,
              }}
              multi
              label={optionLabel}
              show={selected}
              id={id}
              resultCount={count}
              checboxChange={(e, chkBoxId) => {
                handleCheckboxChange(e.target.checked, chkBoxId);
              }}
            />
          )
        )}
      </Grid>
    </Grid>
  );
}

MultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  filterQueryTriggers: PropTypes.object.isRequired,
};

const IntlMultiSelect = injectIntl(MultiSelect);

export default IntlMultiSelect;
