import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const NSFiltersContext = createContext();

export const NSFiltersProvider = ({
  children,
  filterCategories,
  lastUpdateProps,
  dateRangeProps,
  handleSelected,
}) => {
  const types = {
    multi: {},
    levels: {},
    single: {},
    date: {},
  };

  const { lastUpdate } = lastUpdateProps;

  ['multi', 'levels', 'single', 'date'].forEach(type => {
    filterCategories
      .filter(c => c.type === type)
      .forEach(({ id }) => {
        types[type][id] = [];
      });
  });

  const [singleSelectOptions, setSingleSelectOptions] = useState(types.single);
  const [multiSelectOptions, setMultiSelectOptions] = useState(types.multi);
  const [levelSelectOptions, setLevelSelectOptions] = useState(types.levels);
  const [showCalendar, setShowCalendar] = useState(
    lastUpdate.query === 'custom'
  );
  const [localDateRange, setlocalDateRange] = useState({
    before: null,
    after: null,
  });

  return (
    <NSFiltersContext.Provider
      value={{
        multiSelect: { multiSelectOptions, setMultiSelectOptions },
        levelSelect: { levelSelectOptions, setLevelSelectOptions },
        singleSelect: { singleSelectOptions, setSingleSelectOptions },
        calendarProps: { showCalendar, setShowCalendar },
        localDateProps: { localDateRange, setlocalDateRange },
        lastUpdateProps,
        dateRangeProps,
        filterCategories,
        handleSelected,
      }}
    >
      {children}
    </NSFiltersContext.Provider>
  );
};

NSFiltersProvider.propTypes = {
  children: PropTypes.any.isRequired,
  dateRangeProps: PropTypes.object.isRequired,
  lastUpdateProps: PropTypes.object.isRequired,
  filterCategories: PropTypes.array.isRequired,
  handleSelected: PropTypes.func.isRequired,
};
