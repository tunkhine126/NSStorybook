import { makeStyles } from '@material-ui/core/styles';
import styled, { createGlobalStyle } from 'styled-components';
import colors from 'global-styles';

export const styles = makeStyles(theme => ({
  addFiltersContainer: {
    marginTop: 10,
  },
  caption: {
    color: colors.INTERFACE.ui5,
    fontSize: 11,
    fontWeight: 500,
  },
  checkboxHeight: {
    height: 48,
  },
  checkBoxBg: {
    backgroundColor: '#fff',
    padding: 0,
    marginRight: 18,
    marginLeft: 12,
  },
  chip: { marginTop: 10, marginRight: 13 },
  chipLabelContainer: {
    fontSize: 12,
  },
  chipTitle: {
    letterSpacing: 1.2,
  },
  chipItems: {
    fontWeight: 500,
    marginLeft: 5,
    fontSize: 12,
  },
  chipClearBtn: {
    marginTop: 2,
    marginLeft: 1,
    marginRight: 10,
    minWidth: 12,
  },
  dataResults: {
    marginRight: 3,
  },
  familyCommunity: {
    marginTop: '-3px',
  },
  filterItem: {
    padding: 0,
    minHeight: 0,
    lineHeight: 'normal',
    whiteSpace: 'normal',
    color: colors.INTERFACE.ui7,
  },
  filterMenuHeaderText: {
    display: 'inline-block',
    color: colors.INTERFACE.ui7,
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 10,
    marginTop: 3,
  },
  filterMenuHeaderReset: {
    float: 'right',
  },
  inputFormat: {
    height: 36,
  },
  menuTitle: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.INTERFACE.ui7,
    marginBottom: 10,
  },
  notFoundContainer: {
    height: 300,
  },
  nonSortableText: {
    fontSize: 12,
    fontWeight: 700,
    paddingRight: 5,
    paddingLeft: 5,
  },
  nsCardContent: {
    border: `1px solid ${colors.INTERFACE.ui3}`,
    padding: '0.3rem 0 0.3rem 0.5rem',
    marginBottom: '.3rem',
    cursor: 'grab',
    '&:hover': {
      backgroundColor: colors.LINKS.subtle,
      borderColor: colors.LINKS.link,
      '& svg': {
        color: colors.LINKS.link,
      },
    },
  },
  nsCardIndex: { fontSize: 13, color: colors.TEXT.light },
  nsCardLabel: { fontSize: 12, color: colors.INTERFACE.ui7 },
  nsCardDragIndicator: {
    fontSize: 20,
    color: colors.INTERFACE.ui4,
  },
  numbeOfRequests: {
    marginRight: 100,
    display: 'inline-flex',
  },
  paginationLeftArrow: {
    marginTop: 1,
    width: 10,
    marginRight: 5,
  },
  paginationRightArrow: {
    marginTop: 1,
    width: 10,
    marginLeft: 5,
  },
  paper: {
    width: '100%',
    borderRadius: 0,
    boxShadow: 'none',
  },
  paginationContainer: {
    backgroundColor: colors.INTERFACE.window,
  },
  listItemText: {
    margin: 0,
  },
  listItemChkbox: {
    marginLeft: '-9px',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  resetBtn: {
    fontSize: 10,
  },
  selectMargins: {
    marginTop: 16,
    marginRight: 13,
  },
  table: {
    minWidth: 750,
    overflowX: 'auto',
  },
  tableCell: {
    borderBottomColor: colors.INTERFACE.ui2,
    paddingTop: 0,
    paddingBottom: 0,
  },
  tableHead: {
    backgroundColor: colors.TEXT.normal,
  },
  tableHeadText: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
    border: 'none',
    color: colors.TEXT.medium,
    backgroundColor: colors.TEXT.normal,
    top: 41,
  },
  resultsCaption: {
    color: colors.TEXT.light,
  },
  stickyHeader: {
    position: 'sticky',
    zIndex: 1,
  },
  skeletonGrid: {
    paddingRight: 5,
  },
  toolBarSticky: {
    top: 85,
  },
  tableHeadRow: {
    height: 38,
  },
  toolWheel: {
    color: colors.TEXT.medium,
    fontSize: 20,
  },
  tsColumns: {
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 12,
    borderRight: `1px solid ${colors.INTERFACE.ui3}`,
  },
  tsDragNDropSettings: {
    padding: 12,
  },
  tsDragNDropIndex: { width: 20 },
  tsDensity: { paddingLeft: 12, paddingTop: 8 },
  upArrow: {
    transform: 'rotate(180deg)',
  },
  upArrowBtn: {
    padding: 7,
    '&:hover.MuiIconButton-colorPrimary:hover svg path': {
      fill: colors.LINKS.link,
    },
  },
  tsAddIcon: {
    fontSize: 18,
  },
  tsActionBtns: {
    marginTop: 20,
  },
  tsColumnsContainer: {
    maxHeight: 150,
    overflow: 'auto',
    paddingLeft: 4,
    marginLeft: -4,
  },
  tsAddField: {
    marginLeft: 12,
    padding: '7px 8px 7px 6px',
    fontSize: 11,
  },
  tsAdd: {
    marginLeft: 5,
    padding: '6px 12px',
    fontSize: 11,
  },
  tsButtonGroup: {
    marginTop: 7,
  },
  tsDensityBtn: {
    color: colors.INTERFACE.ui3,
    border: `1px solid ${colors.INTERFACE.ui4}`,
    '&:hover': {
      backgroundColor: colors.LINKS.link,
      borderColor: colors.LINKS.link,
      color: '#fff',
    },
    '&.Mui-selected': {
      '&:hover': {
        backgroundColor: colors.LINKS.link,
      },
    },
  },
  tsResultsPerPage: {
    marginTop: 25,
    marginBottom: 8,
  },
  tsCustomFieldActions: {
    marginTop: 10,
  },
  tsDragNDropHeader: {
    marginBottom: 12,
  },
  tsSelectContainer: {
    marginBottom: 15,
  },
  tsDragNDropAction: {
    marginTop: 12,
  },
  tsDragNDropCancelBtn: {
    marginBottom: 6,
    marginRight: 20,
    '&:hover p': {
      color: colors.STATUS.negative,
      transition: 'color 0.2s',
    },
  },
  tsDragNDropCancel: {
    color: colors.TEXT.cancel,
    fontWeight: 700,
    fontSize: 10,
  },
  tsDragNDropSave: {
    fontSize: 10,
    fontWeight: 700,
  },
  tsDragNDropSaveBtn: {
    padding: '7px 11px',
  },
  tsReorder: {
    padding: '7px 8px 7px 13px',
    fontSize: 11,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export const tsSelectStyle = makeStyles(() => ({
  selectMenu: {
    color: '#4E4F54',
    fontSize: 12,
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

export const TableViewStyle = makeStyles(() => ({
  menuTitle: {
    marginLeft: '16px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: colors.INTERFACE.ui7,
    marginBottom: '10px',
  },
  newViewNotice: {
    marginLeft: '16px',
    marginTop: '10px',
    paddingRight: '30px',
    display: 'block',
    fontSize: '11px',
  },
  newViewInput: {
    width: '100%',
    padding: '10px 16px 16px 16px',
  },
  actionBtns: {
    paddingRight: '16px',
    paddingBottom: '8px',
  },
  actionBtnText: {
    fontSize: '10px',
    fontWeight: 'bold',
  },
  cancelBtn: {
    color: colors.INTERFACE.ui5,
    '&:hover': {
      backgroundColor: 'transparent',
      color: colors.STATUS.negative,
    },
  },
  menuOptionText: {
    fontSize: '12px',
    fontWeight: 'normal',
    marginLeft: '5px',
  },
  deleteView: {
    width: '18px',
    color: colors.STATUS.negative,
    marginRight: '12px',
    opacity: 0,
    '&:hover': {
      color: colors.LINKS.hoverNegative,
    },
  },
  saveNewView: {
    padding: '10px 30px 0 16px',
  },
  saveNewViewDesc: {
    color: colors.INTERFACE.ui5,
    fontSize: '11px',
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

export const helperClasses = {
  survyReqBtn: {
    padding: '6px 18px 6px 5px',
  },
  lookUpBtn: {
    padding: '10px 0',
  },
  exportBtn: {
    padding: '6px 11px',
  },
  newFamilyBtn: {
    padding: '6px 15px 6px 5px',
  },
  selectorDimension: {
    width: 'auto',
    outterWidth: '120px',
  },
  searchInput: {
    width: '135px',
  },
  columnTools: {
    width: '1%',
  },
};

export const tableViewHelperClasses = {
  actionBtns: {
    padding: '7px 13px',
  },
  createBtn: {
    bg: colors.LINKS.link,
  },
  cancelBtn: {
    bg: 'transparent',
  },
};

export const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: '#fff',
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  optionToolBarText: {
    color: '#fff',
    fontSize: '12px',
    padding: 0,
    marginLeft: '20px',
  },
  selectAllText: {
    color: '#fff',
    fontSize: '12px',
    padding: 0,
    margin: '0 0 3px 5px',
    textTransform: 'none',
  },
}));

export const listItemTextStyles = (multi = false) =>
  makeStyles(() => ({
    primary: {
      color: colors.INTERFACE.ui7,
      fontSize: 12,
      fontWeight: 'normal',
    },
    root: {
      marginTop: 2,
      maxWidth: !multi ? 'auto' : 149,
    },
  }));

export const tableSettingBtnStyle = makeStyles(() => ({
  root: {
    marginRight: 5,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },
}));

export const listItemStyles = makeStyles(() => ({
  primary: {
    fontSize: 12,
    fontWeight: 'normal',
    paddingBottom: 2,
    display: 'block',
  },
}));

export const headerRowStyles = makeStyles(() => ({
  root: {
    padding: '4px 0 4px 16px',
    lineHeight: 1.2,
  },
}));

export const tableCellStyles = makeStyles(() => ({
  root: {
    borderBottom: 'none',
    backgroundColor: '#fff',
  },
}));

export const SelectStyles = makeStyles(() => ({
  select: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
}));

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

export const NewViewContainerStyle = styled.div`
  .newViewInput .MuiInputBase-root {
    height: 36px;
    border-radius: 2px;
  }

  .newViewInput .MuiInputBase-input {
    padding: 8px 10px 10px 10px;
    font-size: 14px;
  }

  .newViewInput .MuiInputBase-input:hover::placeholder {
    color: ${colors.LINKS.link};
    opacity: 1;
  }
`;

export const MenuStyle = styled.div`
  .MuiListItem-root.Mui-selected {
    background-color: inherit;
  }

  .MuiCheckbox-root .MuiIconButton-label:hover {
    box-shadow: none;
    transition: none;
    border: none;
  }

  .MuiListItem-root:hover,
  .MuiListItem-root.Mui-selected:hover {
    background-color: ${colors.STATE.subtle};
  }

  .MuiListItem-root:hover .deleteViewBtn {
    transition: opacity 0.3s;
    opacity: 1;
  }

  .MuiButtonBase-root {
    padding: 0 0 0 6px;
    white-space: normal;
  }

  max-height: 215px;
  overflow: auto;
`;

export const SearchInputStyle = styled.div`
  .MuiFilledInput-input {
    padding: 12px 5px 10px 0;
  }
  .MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel) {
    margin-top: unset;
  }
  .MuiInputAdornment-filled.MuiInputAdornment-positionStart {
    margin-top: 2px;
    margin-right: 5px;
  }
  .MuiInputAdornment-filled.MuiInputAdornment-positionStart svg {
    width: 20px;
    fill: ${colors.TEXT.light};
  }
  .MuiFilledInput-adornedStart {
    padding-left: 8px;
  }
`;

export const UpArrowStyle = styled.span`
  svg path {
    fill: ${colors.TEXT.light};
  }
  margin-right: 10px;
`;

export const CheckBoxWrapper = styled.span`
  .MuiCheckbox-root {
    height: 22px;
  }
  .MuiCheckbox-root .MuiIconButton-label:hover {
    width: auto;
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
    margin-right: 13px;
  }
  .MuiChip-root,
  .MuiChip-label {
    white-space: inherit;
  }
`;

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

export const TableStyleWrapper = styled.div`
  .MuiTableSortLabel-root:hover,
  .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon {
    color: #d5d6da;
  }
  .MuiTableSortLabel-root.MuiTableSortLabel-active {
    color: #fff;
  }
  .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active
    .MuiTableSortLabel-icon {
    color: #fff;
  }
  .MuiTableRow-root.Mui-selected {
    background-color: inherit;
  }
  .MuiTableRow-root.MuiTableRow-hover:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
  .select-all-checkBox.MuiCheckbox-colorSecondary.Mui-checked:hover {
    background-color: #fff;
    padding: 0;
  }

  td {
    max-width: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  td .MuiGrid-item {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 600px) {
    .MuiToolbar-regular {
      min-height: 40px;
    }
  }

  .optionToolBar {
    background-color: ${colors.LINKS.link};
    min-height: 40px;
  }

  .optionToolBar:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    left: 15px;
    bottom: -5px;
    transform: rotate(50deg) skew(10deg);
    background: inherit;
  }

  .optionToolBarText .MuiButton-label,
  .select-all-link .MuiButton-label {
    border-bottom: 1px solid #fff;
    height: 16px;
    width: auto;
  }
  .optionToolBarText .MuiButton-label:hover,
  .select-all-link .MuiButton-label:hover {
    border-bottom-color: ${colors.LINKS.hover};
    transition: border-bottom-color 0.1s;
  }

  .select-all-link .MuiButton-label {
    font-size: 13px;
    letter-spacing: 0;
    font-weight: 500;
    height: 17px;
  }

  .recipientColumn .MuiButton-label {
    text-transform: none;
    letter-spacing: normal;
    font-size: 14px;
    font-weight: 600;
  }

  .paginationPageInput {
    margin-top: 8px;
    margin-right: 8px;
  }

  .paginationPageInput input {
    padding: 8px 0 8px 8px;
    max-width: 36px;
    background-color: #fff;
    text-align: center;
    border-radius: 2px;
    height: 14px;
  }

  .MuiInputBase-root.MuiTablePagination-input.MuiTablePagination-selectRoot {
    display: none;
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
