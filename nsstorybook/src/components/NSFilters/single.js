/* eslint-disable react/prop-types */
/**
 *
 * SingleSelect
 *
 */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import ActiveRightArrow from 'components/shared/Icons/activeRightArrow';
import ActiveLeftArrow from 'components/shared/Icons/activeLeftArrow';
import { generateISODate } from 'utils/helpers';
import { NSFiltersContext } from './context/filters';
import { SelectFilterStyles } from './styles';

function SingleSelect({
  selected,
  handleChange,
  type,
  label,
  singleOptions,
  lastUpdate,
}) {
  const {
    dateRangeProps: { setDateRange },
    localDateProps: { localDateRange, setlocalDateRange },
    calendarProps: { showCalendar },
  } = useContext(NSFiltersContext);

  const [currentDateFocus, setCurrentDateFocus] = useState(null);
  const classes = SelectFilterStyles();

  if (!showCalendar && localDateRange.before !== null) {
    setlocalDateRange({ after: null, before: null });
  }

  const dateOptions = [
    { value: '', label: 'All time' },
    {
      value: generateISODate(7),
      label: 'Past 7 days',
    },
    {
      value: generateISODate(30),
      label: 'Past 30 days',
    },
    {
      value: generateISODate(365),
      label: 'Past Year',
    },
  ];

  const options = type === 'date' ? dateOptions : singleOptions;
  const dateValue = type === 'date' && showCalendar ? 'custom' : lastUpdate;
  const radioValue = type === 'date' ? dateValue : selected;

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label={label}
              name={type === 'date' ? 'date' : label}
              value={radioValue}
              onChange={e =>
                handleChange(
                  e,
                  dateOptions.find(d => d.value === e.target.value)
                )
              }
            >
              <Grid
                className={classes.mainRadioBtns}
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={8}>
                  {options.map(({ value, label: optionLabel }, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={value}
                      control={
                        <Radio
                          inputProps={{
                            'aria-label': optionLabel,
                          }}
                        />
                      }
                      label={optionLabel}
                    />
                  ))}
                </Grid>
              </Grid>
              {type === 'date' && (
                <FormControlLabel
                  value="custom"
                  control={
                    <Radio
                      inputProps={{
                        'aria-label': 'Custom Date',
                      }}
                    />
                  }
                  label="Custom..."
                />
              )}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      {showCalendar && (
        <DateRangePicker
          startDatePlaceholderText="Start"
          endDatePlaceholderText="End"
          displayFormat="MMM D, YYYY"
          startDate={localDateRange.after} // momentPropTypes.momentObj or null,
          startDateId="start-date" // PropTypes.string.isRequired,
          endDate={localDateRange.before} // momentPropTypes.momentObj or null,
          endDateId="end-date" // PropTypes.string.isRequired,
          focusedInput={currentDateFocus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onDatesChange={({ startDate, endDate }) => {
            setlocalDateRange({ after: startDate, before: endDate });
            if (startDate && endDate) {
              setDateRange({ after: startDate, before: endDate });
            }
          }}
          isOutsideRange={() => {}}
          onFocusChange={focusedInput => {
            setCurrentDateFocus(focusedInput);
          }}
          renderCalendarInfo={() => {
            const currentDaysinView = document.querySelectorAll(
              '.CalendarDay[aria-label]'
            );
            const currentDaysOfWeek = document.querySelectorAll(
              '.DayPicker_weekHeader_li small'
            );

            const daysOfWeekChar = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

            for (let i = 0; i < currentDaysinView.length; i += 1) {
              if (
                currentDaysinView[i]
                  .getAttribute('aria-label')
                  .toString()
                  .includes(moment().format('MMMM D, YYYY'))
              ) {
                currentDaysinView[i].setAttribute(
                  'style',
                  'font-weight: bold; text-decoration: underline'
                );
              }
            }
            for (let i = 0; i < currentDaysOfWeek.length; i += 1) {
              currentDaysOfWeek[i].textContent = daysOfWeekChar[i];
            }
          }}
          navPrev={<ActiveLeftArrow />}
          navNext={<ActiveRightArrow />}
          numberOfMonths={1}
          verticalSpacing={0}
          appendToBody
          keepOpenOnDateSelect
          hideKeyboardShortcutsPanel
          customArrowIcon={
            <KeyboardBackspaceIcon
              fontSize="small"
              className={classes.dateInputArrow}
            />
          }
        />
      )}
    </>
  );
}

SingleSelect.propTypes = {
  selected: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string,
  singleOptions: PropTypes.array,
  type: PropTypes.oneOf(['single', 'date']),
};

const IntlSingleSelect = injectIntl(SingleSelect);

export default IntlSingleSelect;
