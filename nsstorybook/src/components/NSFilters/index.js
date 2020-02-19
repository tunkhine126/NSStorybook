/* eslint-disable react/prop-types */
/**
 *
 * Wrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { NSFiltersProvider } from './context/filters';
import NSFilters from './nsFilters';

function Wrapper({
  filterCategories,
  dateRangeProps,
  lastUpdateProps,
  filterQueryTriggers,
  setSelected,
  messages,
}) {
  return (
    <NSFiltersProvider
      filterCategories={filterCategories}
      dateRangeProps={dateRangeProps}
      lastUpdateProps={lastUpdateProps}
      handleSelected={setSelected}
    >
      <NSFilters
        messages={messages}
        handleSelected={setSelected}
        filterQueryTriggers={filterQueryTriggers}
      />
    </NSFiltersProvider>
  );
}

Wrapper.propTypes = {
  filterCategories: PropTypes.array.isRequired,
  dateRangeProps: PropTypes.object.isRequired,
  filterQueryTriggers: PropTypes.object.isRequired,
  lastUpdateProps: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
};

export default Wrapper;
