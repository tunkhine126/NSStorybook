/**
 *
 * NSFilters
 *
 */

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { resetNestedLevels } from '../../utils/helpers';
import SelectFilter from './selectFilters';
import { NSFiltersContext } from './context/filters';
import PillClose from '../Icons copy/pillClose';
import { styles, InputFormatStyle, SelectFormatStyle } from './styles';

function NSFilters({ intl, messages, filterQueryTriggers }) {
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
    .map(filter => ({ filter: filter.id, caption: filter.caption }));
  defaultFilters.unshift('');

  const [filters] = useState(defaultFilters);

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

  const filterList = filters.map(({ filter, caption }, idx) => {
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
            <Grid container item direction="column">
              <Typography className={classes.caption} variant="caption">
                {caption}
              </Typography>
              <SelectFilter
                label={intl.formatMessage(messages[filter])}
                id={id}
                btnWidth={width}
                type={type}
                data={columnData || {}}
                noData={noData}
                filterQueryTriggers={filterQueryTriggers}
              />
            </Grid>
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
            {filterList}
          </Grid>
        </Grid>
        {chipList.map(
          ({ chips, label, id, type, resetLocal, localData, clear }, idx) => {
            if (chips.length > 0) {
              return (
                <Chip
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
  messages: PropTypes.object.isRequired,
  filterQueryTriggers: PropTypes.object,
};

const IntlNSFilters = injectIntl(NSFilters);

export default IntlNSFilters;
