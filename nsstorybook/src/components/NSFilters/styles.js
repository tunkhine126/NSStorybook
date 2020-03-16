import { makeStyles } from '@material-ui/core/styles';
import styled, { createGlobalStyle } from 'styled-components';
import colors from '../../global-styles';

export const styles = makeStyles(() => ({
  caption: {
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.TEXT.light,
    fontWeight: 500,
    marginBottom: 5,
  },
  chip: { marginTop: 10, marginRight: 13 },
  chipClearBtn: {
    marginTop: 2,
    marginLeft: 1,
    marginRight: 10,
  },
  chipItems: {
    fontWeight: 500,
    marginLeft: 5,
    fontSize: 12,
  },
  chipLabelContainer: {
    fontSize: 12,
  },
  chipTitle: {
    letterSpacing: 1.2,
  },
  inputFormat: {
    height: 36,
  },
  selectMargins: {
    marginTop: 16,
    marginLeft: 13,
  },
  searchInput: {
    width: 135,
  },
}));

export const SelectFilterStyles = makeStyles(() => ({
  dateInputArrow: {
    transform: 'rotate(180deg)',
    color: colors.INTERFACE.ui4,
    fontSize: 14,
    marginTop: 7,
    marginRight: 10,
    marginLeft: 5,
  },
  downArrow: {
    fill: colors.TEXT.light,
    transition: 'all 0.4s ease',
  },
  rotate: {
    transform: 'rotate(180deg)',
    marginTop: 10,
  },
  mainRadioBtns: {
    overflow: 'auto',
    maxHeight: 200,
  },
  multiSelectContainer: {
    padding: '0 12px',
  },
  optionsContainer: {
    maxHeight: 200,
    overflow: 'auto',
    paddingRight: 5,
    paddingLeft: 1,
  },
}));

export const AccordianTreeStyles = makeStyles(() => ({
  root: {
    height: 30,
    padding: '4px 12px 0 12px',
    width: '100%',
    display: 'inline-flex',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: colors.LINKS.subtle,
    },
  },
  icon: {
    marginLeft: 15,
    marginTop: 7,
  },
  open: {
    transform: 'rotate(180deg)',
  },
  active: {
    backgroundColor: colors.INTERFACE.ui2,
  },
  reset: {
    marginTop: 5,
    fontSize: 12,
    padding: 0,
  },
}));

export const multiSelectSearchClasses = makeStyles(() => ({
  root: {
    '& svg': {
      color: colors.TEXT.light,
      fontSize: 18,
    },
    '& .MuiInput-underline:before': {
      borderBottom: `1px solid ${colors.INTERFACE.ui4}`,
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: colors.LINKS.link,
    },
    marginBottom: 15,
  },
}));

export const SelectFilterBtn = menuOpen =>
  makeStyles(() => ({
    root: {
      fontSize: 13,
      textTransform: 'capitalize',
      padding: '5px 10px',
      minWidth: 135,
      height: 36,
      color: menuOpen ? colors.INTERFACE.ui7 : colors.TEXT.light,
      backgroundColor: '#fff',
      boxShadow: menuOpen ? '0px 2px 4px -1px rgba(0, 0, 0, 0.25)' : 'none',
      border: menuOpen ? 'none' : `1px solid ${colors.INTERFACE.ui4}`,
      borderRadius: menuOpen ? '2px 2px 0 0' : 2,
      '&:hover': {
        backgroundColor: '#fff',
        borderColor: colors.LINKS.link,
      },
    },
    label: {
      letterSpacing: 'normal',
      fontWeight: menuOpen ? 'bold' : 'normal',
    },
  }));

export const InputFormatStyle = styled.div`
  .MuiInputLabel-filled {
    transform: translate(8px, 9px) scale(1);
  }
  .MuiInputLabel-filled.MuiInputLabel-shrink {
    transform: translate(12px, 5px) scale(0.75);
  }
  .MuiFormLabel-root {
    display: inherit;
  }
  label {
    font-size: 12px;
    letter-spacing: 0;
  }
  input {
    font-size: 13px;
  }
`;

export const SelectFormatStyle = styled.div`
  .MuiInputLabel-outlined {
    transform: translate(10px, 13px) scale(1);
  }
  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(12px, 8px) scale(0.75);
  }
  .MuiInputLabel-outlined {
    color: ${colors.TEXT.light};
    font-weight: 400;
  }
  label {
    font-size: 12px;
    letter-spacing: 0;
  }
  input {
    font-size: 13px;
  }
  .tableSearchInput .MuiInputBase-root {
    width: 155px;
    height: 36px;
  }
`;

export const AccordianTreeWrapper = styled.div`
  ul {
    background-color: #fff;
  }
  .MuiTypography-caption {
    margin-top: 2px;
  }
  .MuiCheckbox-indeterminate:hover {
    background-color: inherit;
  }
`;

export const CalendarGlobalStyle = createGlobalStyle`
.DateRangePicker_picker.DateRangePicker_picker_1 {
  z-index: 1500;
  top: 43px !important;
  border-top: 1px solid ${colors.INTERFACE.ui4};
}
.DayPicker_transitionContainer.DayPicker_transitionContainer_1 {
  width: 220px !important;
  height: 240px !important;
  background-color: #fbfbfb;
  border-radius: 0 0 2px 2px;
}
.DateInput_fang.DateInput_fang_1 {
  display: none;
}
.DateRangePicker.DateRangePicker_1 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 9px
}
.DateRangePickerInput.DateRangePickerInput_1 {
  border: none;
}
.DateInput.DateInput_1 {
  width: 70px;
}
.DateInput_input.DateInput_input_1 {
  padding: 0;
  width: 70px;
  font-family: Barlow, Roboto, Arial, sans-serif;
  font-size: 12px
  border-bottom: 1px solid ${colors.INTERFACE.ui4};
}
.DateInput_input.DateInput_input_1.DateInput_input__focused {
  border-bottom: 1px solid ${colors.LINKS.link};
  color: ${colors.LINKS.link}
}
.DayPicker.DayPicker_1 {
  border-radius: 0 0 2px 2px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 4px -1px;
  width: 220px !important;
  height: 240px !important;
}
.CalendarMonth_caption.CalendarMonth_caption_1 {
  font-size: 12px
  font-family: Barlow, Roboto, Arial, sans-serif;
  padding-top: 14px;
}
.DayPicker_weekHeader.DayPicker_weekHeader_1 {
  top: 40px;
}
.CalendarMonthGrid_month__horizontal {
  width: 200px;
  background-color: #fbfbfb;
}
.CalendarMonthGrid__horizontal {
  width: 200px !important;
  height: 223px;
}
.CalendarMonth_table {
  font-family: Barlow, Roboto, Arial, sans-serif;
  border-collapse: inherit !important;
  border-spacing: 8px !important;
  position: absolute;
  height: 146px;
  left: 0;
  background-color: #fbfbfb;
}
.CalendarMonth.CalendarMonth_1 {
  background-color: #fbfbfb;
}
.CalendarDay.CalendarDay_1 {
  width: 20px !important;
  height: 20px !important;
  border-radius: 15px;
  border: none;
  font-size: 12px;
  background-color: #fbfbfb;
}
.CalendarDay__selected, .CalendarDay__selected:active, .CalendarDay__selected:hover {
  background: ${colors.LINKS.link} !important;
  border: none !important;
  color: #fff;
}
.CalendarDay__default.CalendarDay__selected:hover {
  background: ${colors.LINKS.link} !important;
}
.CalendarDay__default:hover {
  background: ${colors.LINKS.subtle} !important;
  border: none !important;
  color: inherit;
}
.DayPicker_weekHeader_li {
  width: 27px !important;
}
.DayPickerNavigation_button {
  width: 15px;
  position: absolute;
  top: 14px;
}
.DayPickerNavigation_button:first-child {
  left: 20px;
}
.DayPickerNavigation_button:last-child {
  right: 115px;
}
.DayPicker_weekHeader.DayPicker_weekHeader_1 {
  padding: 0 0 0 5px !important;
  color: ${colors.TEXT.medium};
}
.CalendarDay.CalendarDay_1.CalendarDay__selected_span {
  background: ${colors.LINKS.subtle};
  color: #00809a;
}
`;
