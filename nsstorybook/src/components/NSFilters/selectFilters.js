/* eslint-disable react/prop-types */
/**
 *
 * SelectFilters
 *
 */

import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SolidDownArrow from 'components/shared/Icons/solidDownArrow';
import { NSFiltersContext } from './context/filters';
import SingleSelect from './single';
import MultiSelect from './multi';
import LevelSelect from './levels';
import {
  SelectFilterStyles,
  SelectFilterBtn,
  CalendarGlobalStyle,
} from './styles';

function SelectFilters({
  label,
  id,
  btnWidth,
  type,
  data,
  filterQueryTriggers,
  noData,
}) {
  let filterDisplay;
  const classes = SelectFilterStyles();
  const [selected, setSelected] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    calendarProps: { setShowCalendar, showCalendar },
    lastUpdateProps: { setLastUpdate, lastUpdate },
    dateRangeProps: { setDateRange },
    handleSelected,
  } = useContext(NSFiltersContext);

  const menuOpen = Boolean(anchorEl);
  const btnClasses = SelectFilterBtn(menuOpen)();
  const PaperProps = {
    style: {
      borderRadius: '0px 2px 2px 2px',
      boxShadow: '0 3px 4px -1px rgba(0, 0, 0, 0.25)',
      width: type === 'levels' ? 393 : 220,
    },
  };

  function handleChange(event, chip) {
    handleSelected([]);
    const { value } = event.target;
    const selectedLabel = chip && chip.label ? chip.label : null;

    if (type === 'date') {
      setShowCalendar(value === 'custom');
      setDateRange({ before: null, after: null });

      if (value === '') {
        setLastUpdate({ query: null, chips: [selectedLabel] });
        return;
      }
      setLastUpdate({ query: value, chips: [selectedLabel] });
    } else {
      setSelected(value);
    }
  }

  function handleBtnClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  switch (type) {
    case 'single':
      filterDisplay = (
        <SingleSelect
          selected={selected}
          handleChange={handleChange}
          showCalendar={showCalendar}
          singleOptions={[]}
          data={data.list}
          type={type}
          label={label}
        />
      );
      break;
    case 'date':
      filterDisplay = (
        <SingleSelect
          selected={selected}
          handleChange={handleChange}
          showCalendar={showCalendar}
          singleOptions={[]}
          lastUpdate={lastUpdate.query === null ? '' : lastUpdate.query}
          data={data.list}
          type={type}
          label={label}
        />
      );
      break;
    case 'multi':
      filterDisplay = (
        <MultiSelect
          label={label}
          data={data.list}
          filterQueryTriggers={filterQueryTriggers}
          id={id}
        />
      );
      break;
    case 'levels':
      filterDisplay = (
        <LevelSelect
          label={label}
          filterData={data.list}
          filterQueryTriggers={filterQueryTriggers}
          id={id}
        />
      );
      break;
    default:
      filterDisplay = <p>No Filter Available.</p>;
  }

  return (
    <>
      <CalendarGlobalStyle />
      <Button
        variant="outlined"
        aria-controls={label}
        aria-haspopup="true"
        className={btnWidth || null}
        classes={btnClasses}
        onClick={handleBtnClick}
        disabled={data.loading}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>{label}</Grid>
          <Grid item>
            <SolidDownArrow
              className={clsx(classes.downArrow, {
                [classes.rotate]: menuOpen,
              })}
              data-custom
            />
          </Grid>
        </Grid>
      </Button>
      <Menu
        id={label.replace(' ', '-')}
        PaperProps={PaperProps}
        anchorEl={anchorEl}
        keepMounted
        open={menuOpen}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {((data.list && data.list.length > 0) || noData) && filterDisplay}
      </Menu>
    </>
  );
}

SelectFilters.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  noData: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  btnWidth: PropTypes.string,
  filterQueryTriggers: PropTypes.object,
  type: PropTypes.oneOf(['single', 'multi', 'date', 'levels']),
};

export default SelectFilters;
