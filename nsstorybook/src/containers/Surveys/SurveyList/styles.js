import { makeStyles } from '@material-ui/core/styles';
import colors from 'global-styles';
import styled from 'styled-components';

export const surveyListStyles = makeStyles(() => ({
  actionBtns: {
    paddingRight: '16px',
    paddingBottom: '8px',
  },
  appBar: {
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${colors.INTERFACE.ui4}`,
    boxShadow: 'none',
  },
  columnHeight: {
    height: '35px',
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
  surveyListHeader: {
    marginBottom: '23px',
  },

  // Will clean up after this line when Survey preview is done
  activityContainer: {
    marginRight: '40px',
    flexBasis: '21%',
  },
  addMemberBtn: {
    padding: 0,
    margin: '15px 0 15px 15px',
  },
  caption: {
    fontSize: '10px',
    letterSpacing: '0.5px',
    color: colors.TEXT.light,
    fontWeight: 500,
  },
  container: {
    marginTop: '30px',
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
  expand: {
    color: '#fff',
  },
  tab: {
    fontWeight: '700',
    color: `${colors.TEXT.medium}`,
    letterSpacing: '1px',
    marginRight: '20px',
  },
  surveyTemplate: {
    padding: 0,
    fontWeight: 600,
  },
  familyText: {
    textTransform: 'none',
    letterSpacing: '0',
    padding: 0,
    margin: 0,
    fontSize: '14px',
  },
  familiyName: {
    fontSize: '28px',
    letterSpacing: '1px',
    fontWeight: '600',
    fontFamily: 'Barlow, Roboto, Arial',
    color: colors.TEXT.normal,
    marginBottom: '8px',
  },
  familyId: {
    fontSize: '10px',
    letterSpacing: '.75px',
    textTransform: 'uppercase',
    color: colors.TEXT.light,
  },
  familyInfo: {
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
  newSurveyBtn: {
    marginRight: '3px',
  },
  statusProgress: {
    backgroundColor: colors.INTERFACE.ui1,
    borderRadius: 2,
  },
  paper: {
    borderRadius: 2,
    boxShadow: 'none',
    marginBottom: '20px',
  },
  photoContainer: {
    fontSize: 12,
    color: colors.TEXT.light,
  },
  checkbox: {
    color: '#fff',
    margin: 'auto',
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

export const DatePickerStyle = makeStyles(() => ({
  root: {
    maxWidth: 400,
    marginTop: 8,
    '& .MuiInputBase-root.Mui-focused': {
      border: `2px solid ${colors.LINKS.link}`,
    },
    '& .MuiFormLabel-root': {
      fontWeight: `normal`,
      color: colors.TEXT.light,
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: colors.LINKS.link,
    },
    '& .MuiFilledInput-root': {
      borderRadius: 2,
      backgroundColor: '#fff',
      border: `1px solid ${colors.INTERFACE.ui4}`,
    },
    '& .MuiFilledInput-underline:before, .MuiFilledInput-underline:after': {
      border: 'none',
    },
    '& .MuiFormHelperText-contained': {
      margin: '10px 0 8px 0',
    },
    '&:hover .MuiFilledInput-root': {
      borderColor: colors.LINKS.link,
      transition: 'border 0.3s',
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
  newSurveyBtn: {
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

export const progressBarStyles = color =>
  makeStyles(() => ({
    barColorPrimary: {
      backgroundColor: color,
    },
    root: {
      height: '20px',
    },
  }));

export const HeadOfHouseholdWrapper = styled.div`
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

export const SurveyListStyle = styled.div`
  h2 {
    font-weight: 600;
    font-family: Barlow, Roboto, Helvetica, Arial, sans-serif;
  }
  margin-right: 40px;
`;

export const ExpansionPanelDetailsStyle = styled.div`
  .MuiExpansionPanelDetails-root {
    padding: 0 15px 24px;
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
  .MuiButton-root:hover {
    background-color: inherit;
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
    height: 58px;
  }
`;
