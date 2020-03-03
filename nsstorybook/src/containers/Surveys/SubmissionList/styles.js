import { makeStyles } from '@material-ui/core/styles';
import colors from 'global-styles';
import styled from 'styled-components';
import { green } from '@material-ui/core/colors';

export const submissionListStyles = makeStyles(() => ({
  actionBtns: {
    paddingRight: '16px',
    paddingBottom: '8px',
  },
  activityContainer: {
    marginRight: '40px',
    flexBasis: '21%',
  },
  avatar: {
    '&.MuiChip-avatar': {
      width: 17,
      height: 17,
    },
  },
  addBtn: {
    padding: 0,
    margin: '15px 0 15px 15px',
    fontSize: 12,
  },
  appBar: {
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${colors.INTERFACE.ui4}`,
    boxShadow: 'none',
  },
  chip: {
    height: 26,
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    color: colors.TEXT.normal,
    fontWeight: 400,
  },
  container: {
    marginTop: '30px',
  },
  colContainer: {
    overflowWrap: 'break-word',
  },
  columnPaper: {
    outline: 'none',
    borderRadius: 2,
    width: 300,
  },
  columnActionBtns: {
    '& svg': {
      fontSize: 16,
    },
    '& .edit-recipient button, .access-time button': {
      display: 'none',
      padding: 4,
    },
  },
  editBtn: {
    marginBottom: 10,
  },
  columnHeight: {
    height: '35px',
  },
  caption: {
    fontSize: '12px',
    letterSpacing: '0.5px',
    color: colors.TEXT.light,
    fontWeight: 500,
  },
  cardContainer: {
    maxWidth: '215px',
  },
  contentBody: {
    color: colors.INTERFACE.ui7,
  },
  captionSpacing: {
    marginBottom: '5px',
  },
  column1: {
    flexBasis: '31.05%',
  },
  column2: {
    flexBasis: '39.5%',
  },
  columnAction: {
    padding: 0,
    fontSize: '12px',
    textAlign: 'inherit',
  },
  divider: {
    marginLeft: '15px',
  },
  exportBtn: {
    width: '.7em',
    marginRight: '5px',
  },
  expand: {
    color: '#fff',
  },
  modal: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginTop: 200,
  },
  tab: {
    color: `${colors.TEXT.medium}`,
    letterSpacing: '1px',
    marginRight: '20px',
  },
  recipientLink: {
    padding: 0,
    fontWeight: 600,
  },
  fieldHistory: {
    maxHeight: 437,
    overflow: 'auto',
  },
  familyText: {
    textTransform: 'none',
    letterSpacing: '0',
    padding: 0,
    margin: 0,
    fontSize: '14px',
  },
  recipientName: {
    fontSize: '28px',
    letterSpacing: '1px',
    fontWeight: '600',
    fontFamily: 'Barlow, Roboto, Arial',
    color: colors.TEXT.normal,
    marginBottom: '8px',
  },
  recipientId: {
    fontSize: '10px',
    letterSpacing: '.75px',
    textTransform: 'uppercase',
    color: colors.TEXT.light,
  },
  submissionListHeader: {
    marginBottom: '23px',
  },
  recipientInfo: {
    marginTop: '15px',
  },
  fullWidth: {
    width: '100%',
  },
  familyCommunity: {
    marginTop: '-3px',
  },
  headerImg: {
    height: '153px',
    marginRight: '20px',
    borderRadius: 0,
    boxShadow: 'none',
  },
  recipientChildImg: {
    height: 91,
    '&.MuiCardActionArea-root': {
      width: 135,
    },
    '&:hover .img-action-text': {
      visibility: 'visible',
      opacity: 1,
    },
    '&.MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight': {
      opacity: 0.5,
    },
  },
  imgActionText: {
    position: 'absolute',
    top: 10,
    bottom: 0,
    left: 0,
    right: 0,
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    textAlign: 'center',
    visibility: 'hidden',
    opacity: 0,
    zIndex: 1,
  },
  navContainer: {
    flex: 1,
    marginRight: '40px',
  },
  moreBtn: {
    marginLeft: '15px',
  },
  moveComplete: {
    backgroundColor: '#EAFFEC',
  },
  moveInProgress: {
    backgroundColor: '#fff7dd',
  },
  moveInContainer: {
    padding: '15px',
  },
  movedInDetails: {
    color: colors.TEXT.normal,
    marginTop: '15px',
    fontSize: '13px',
  },
  newFamilyBtn: {
    marginRight: '3px',
  },
  statusProgress: {
    backgroundColor: colors.INTERFACE.ui1,
    borderRadius: 2,
  },
  paper: {
    borderRadius: 2,
    boxShadow: 'none',
    marginBottom: 20,
  },
  photoContainer: {
    fontSize: 12,
    color: colors.TEXT.light,
  },
  checkbox: {
    color: '#fff',
    margin: 'auto',
  },
  recipientChildPhoto: {
    marginLeft: 15,
    marginBottom: 15,
    maxWidth: 200,
  },
  recipientDeleteBtnText: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: 700,
    color: colors.STATUS.negative,
  },
  progressTip: {
    marginTop: '-1px',
  },
  twoColumns: {
    padding: '15px 0 15px 15px',
  },
  threeRowTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: colors.TEXT.normal,
  },
  success: {
    backgroundColor: green[600],
  },
  survyReqBtn: {
    padding: '6px 18px 6px 5px',
  },
  selectedItemsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    width: '100%',
    backgroundColor: colors.LINKS.link,
    boxShadow: '0px 2px 4px -3px rgba(88, 88, 88, 1)',
  },
  widgetHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginBottom: '15px',
    color: colors.TEXT.normal,
  },
  widgetPadding: {
    padding: '15px 15px 0 15px',
  },
  upArrow: {
    transform: 'rotate(180deg)',
    width: 10,
  },
  upArrowBtn: {
    padding: 7,
    marginRight: 5,
    '&:hover.MuiIconButton-colorPrimary:hover svg path': {
      fill: colors.LINKS.link,
    },
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
    outterWidth: '107px',
    outterHeight: '0',
  },
  surveysCompleted: {
    outterWidth: '122px',
  },
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

export const SelectWrapper = styled.div`
  margin-bottom: 8px;
  .MuiFormLabel-root {
    font-weight: normal;
  }
`;

export const SearchIconStyle = styled.span`
  svg {
    fill: ${colors.TEXT.light};
  }
`;

export const UpArrowStyle = styled.span`
  svg path {
    fill: ${colors.TEXT.light};
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
`;

export const SubmissionListStyle = styled.div`
  h2 {
    font-weight: 600;
    font-family: Barlow, Roboto, Helvetica, Arial, sans-serif;
  }
  margin-right: 40px;
  margin-top: 12px;
`;

export const ExpansionPanelDetailsStyle = styled.div`
  .MuiExpansionPanelDetails-root {
    padding: 0;
  }

  .MuiSvgIcon-root {
    transition: none;
  }

  .recipient-delete-btn:hover svg.MuiSvgIcon-root {
    fill: #7d340c;
    transition: fill 0.2s;
  }

  .recipient-delete-btn:hover p {
    color: #7d340c;
    transition: color 0.2s;
  }
  .recipient-delete-btn.MuiButton-contained:active {
    box-shadow: none;
  }
`;

export const ComponentStyle = styled.div`
  .MuiTab-root {
    min-width: 100px;
  }
`;

export const ThreeRowsStyle = styled.span`
  .MuiButton-root {
    text-transform: none;
    font-size: 14px;
  }
`;

export const TabContentStyle = styled.div`
  .field-container.photo,
  .field-container .recipient-column {
    padding: 10px 10px 10px 15px;
    overflow: inherit;
    word-break: break-all;
    min-height: 78px;
  }

  .field-container .recipient-column:hover,
  .field-container.photo:hover {
    transition: background-color 0.3s;
    background-color: ${colors.STATE.subtle};
    justify-content: center;
  }

  .field-container .photo-edit-mode {
    background-color: ${colors.STATE.subtle};
  }

  .field-container .recipient-column:hover .MuiGrid-item {
    width: fit-content;
  }

  .field-container .recipient-column:hover .column-action-btns button {
    display: flex;
  }
  .field-container .edit-cancel-btn {
    font-size: 12px;
    color: ${colors.TEXT.cancel};
  }
  .field-container .edit-cancel-btn:hover {
    color: ${colors.STATUS.negative};
  }
  .field-container .edit-save-btn {
    padding: 6px 12px;
  }
`;

export const ExpansionPanelStyle = styled.div`
  .MuiExpansionPanelSummary-expandIcon.Mui-expanded {
    transform: rotate(90deg);
  }
  .MuiExpansionPanelSummary-root {
    padding: 0 12px 0 15px;
    min-height: 73px;
  }
  .MuiExpansionPanel-root.Mui-expanded,
  .MuiExpansionPanelSummary-content.Mui-expanded {
    margin: 0;
  }
  .MuiPaper-elevation1 {
    box-shadow: none;
  }
  .MuiExpansionPanel-root:before {
    opacity: 0;
  }
  .MuiFormControl-marginNormal {
    margin-top: 0;
    height: 60px;
  }
  .paragraph-text .MuiFormControl-marginNormal {
    height: auto;
  }
  .MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error {
    display: none;
  }
`;
