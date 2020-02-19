/**
 *
 * NSFilters
 *
 */

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl, intlShape } from 'react-intl';
import isEqual from 'fast-deep-equal';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';

import globalMessages from 'messages';
import InputValidation from 'components/shared/InputValidation';
import { resetNestedLevels } from 'utils/helpers';
import SelectFilter from './SelectFilter';
import AddFilters from './addFilters';
import { NSFiltersContext } from './context/filters';
import PillClose from '../Icons/pillClose';
import {
  styles,
  InputFormatStyle,
  SelectFormatStyle,
  SearchInputStyle,
} from './styles';

function NSFilters({
  intl,
  filterTitles,
  enableSearch,
  enableFilters,
  tableSearchProps: { tableSearch, setTableSearch },
  handlePageChange,
  filterQueryTriggers,
}) {
  const {
    multiSelect: { multiSelectOptions, setMultiSelectOptions },
    levelSelect: { levelSelectOptions, setLevelSelectOptions },
    localDateProps: { setlocalDateRange },
    calendarProps: { setShowCalendar },
    filterCategories,
    lastUpdateProps,
    dateRangeProps,
    handleSelected,
  } = useContext(NSFiltersContext);

  const classes = styles();
  const { setLastUpdate } = lastUpdateProps;
  const { setDateRange } = dateRangeProps;

  const defaultFilters = filterCategories
    .filter(filter => filter.defaultFilter)
    .map(filter => filter.id);
  defaultFilters.unshift('');

  const [filters, setFilters] = useState(defaultFilters);

  function handleChange(event) {
    const newList = event.target.value.filter(filter => filter !== undefined);
    if (!isEqual(filters, newList)) {
      setFilters(newList);
    }
  }

  function handleReset() {
    if (!isEqual(defaultFilters, filters)) {
      setFilters(defaultFilters);
    }
  }

  let timeout;

  function handleSearchSubmit(value) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handlePageChange(1);
      handleSelected([]);
      setTableSearch(value);
    }, 600);
  }

  const filterType = filterCategories
    .filter(filter => filter.filterWidth)
    .map(filter => ({
      id: filter.id,
      width: makeStyles(() => ({
        btnWidth: {
          width: filter.filterWidth,
        },
      }))().btnWidth,
      type: filter.type,
    }));

  filterType.unshift({ id: null });

  let chipList = [];

  const filterList = filters.map((filter, idx) => {
    const hasBtnWidth = filterCategories.filter(c => c.id === filter)[0];

    if (filter && hasBtnWidth) {
      const { width } =
        filterType.filter(c => c.id === hasBtnWidth.id)[0] || 150;
      const { type } = filterType.filter(c => c.id === hasBtnWidth.id)[0];

      if (type) {
        const { columnData, id, noData, label } = filterCategories.filter(
          i => i.id === filter
        )[0];
        let resetLocal = null;
        let localData = null;

        switch (type) {
          case 'multi':
            resetLocal = setMultiSelectOptions;
            localData = multiSelectOptions[id];
            break;
          case 'levels':
            resetLocal = setLevelSelectOptions;
            localData = levelSelectOptions[id];
            break;
          case 'date':
            resetLocal = setLastUpdate;
            break;
          default:
            resetLocal = null;
            localData = null;
        }

        chipList = [
          ...chipList,
          {
            label: label.toUpperCase(),
            id,
            chips: columnData ? columnData.chips.join(', ') : [],
            clear: columnData ? columnData.clear : () => {},
            localData,
            resetLocal,
            type,
          },
        ];

        return (
          <Grid item className={classes.selectMargins} key={idx}>
            <SelectFilter
              label={
                Object.entries(filterTitles).length < 10
                  ? filterTitles[filter]
                  : intl.formatMessage(filterTitles[filter])
              }
              id={id}
              btnWidth={width}
              type={type}
              data={columnData || {}}
              noData={noData}
              filterQueryTriggers={filterQueryTriggers}
            />
          </Grid>
        );
      }
    }
    return null;
  });

  return (
    <InputFormatStyle>
      <SelectFormatStyle>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid
            item
            xs={9}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {enableSearch && (
              <Grid item>
                <SearchInputStyle>
                  <InputValidation
                    field="tableSearch"
                    type="search"
                    initialValue={tableSearch}
                    value={tableSearch}
                    position="start"
                    onChange={handleSearchSubmit}
                    icon={Search}
                    customClass={clsx(
                      classes.inputFormat,
                      classes.searchInput,
                      'tableSearchInput'
                    )}
                    placeholder={intl.formatMessage(globalMessages.search)}
                  />
                </SearchInputStyle>
              </Grid>
            )}
            {filterList}
          </Grid>
          {enableFilters && (
            <AddFilters
              filterCategories={filterCategories}
              handlechange={handleChange}
              filters={filters}
              handleReset={handleReset}
            />
          )}
        </Grid>
        {chipList.map(
          ({ chips, label, id, type, resetLocal, localData, clear }, idx) => {
            if (chips.length > 0) {
              return (
                <Chip
                  style={{ height: 'auto', minHeight: '30px' }}
                  key={idx}
                  color="primary"
                  label={
                    <span className={classes.chipLabelContainer}>
                      <span className={classes.chipTitle}>{label}:</span>
                      <span className={classes.chipItems}>{`${chips}`}</span>
                    </span>
                  }
                  onDelete={() => {
                    handleSelected([]);
                    if (type === 'date') {
                      setDateRange({ before: null, after: null });
                      setlocalDateRange({ before: null, after: null });
                      resetLocal({ query: null, chips: [] });
                      setShowCalendar(false);
                    } else {
                      resetLocal(currentState => ({
                        ...currentState,
                        [id]: localData.map(option => {
                          // Reset Multi-Select
                          if (option.selected) {
                            option.selected = false;
                          }

                          // Reset Mulit-Level
                          if (option.children) {
                            resetNestedLevels(option);
                          }

                          return option;
                        }),
                      }));
                    }
                    clear();
                  }}
                  deleteIcon={<PillClose className={classes.chipClearBtn} />}
                  className={classes.chip}
                />
              );
            }
            return null;
          }
        )}
      </SelectFormatStyle>
    </InputFormatStyle>
  );
}

NSFilters.propTypes = {
  intl: intlShape.isRequired,
  filterTitles: PropTypes.object.isRequired,
  tableSearchProps: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  filterQueryTriggers: PropTypes.object,
  enableSearch: PropTypes.bool,
  enableFilters: PropTypes.bool,
};

const IntlNSFilters = injectIntl(NSFilters);

export default IntlNSFilters;
