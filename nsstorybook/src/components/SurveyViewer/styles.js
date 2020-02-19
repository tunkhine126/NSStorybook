import { makeStyles } from '@material-ui/core/styles';
import colors from 'global-styles';
import styled from 'styled-components';

export const styles = makeStyles(() => ({
  accordion: {
    marginBottom: 20,
  },
  bottomBorder: {
    borderBottom: `2px solid ${colors.INTERFACE.ui3}`,
  },
  chip: {
    height: 26,
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    color: colors.TEXT.normal,
    fontWeight: 400,
  },
  condition: {
    color: colors.STATE.active,
    fontSize: 14,
    fontStyle: 'italic',
  },
  avatar: {
    '&.MuiChip-avatar': {
      width: 17,
      height: 17,
    },
  },
  dividerContainer: {
    width: '100%',
    marginLeft: 40,
  },
  completed: {
    fontSize: 13,
    marginBottom: 15,
    padding: '15px 15px 0 0',
    color: colors.INTERFACE.ui5,
  },
  questionContainer: {
    marginTop: 10,
  },
  header: {
    fontSize: 16,
    letterSpacing: '0.5px',
    marginBottom: 15,
    padding: '15px 15px 0 0',
    color: colors.TEXT.normal,
  },
  headerQuestions: { marginLeft: 5, fontWeight: 500, fontSize: 10 },
  bold: {
    fontWeight: 'bold',
  },
  sectionHeaderBg: {
    backgroundColor: '#F9F9F9',
    borderTop: `1px solid ${colors.INTERFACE.ui3}`,
    borderBottom: `1px solid ${colors.INTERFACE.ui3}`,
    padding: '19px 19px 19px 15px',
  },
  text: {
    color: colors.TEXT.normal,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginRight: 12,
  },
  caption: {
    fontSize: 9,
    letterSpacing: 0.75,
    fontWeight: 400,
  },
  questionCount: {
    width: 24,
    height: 24,
    borderRadius: 30,
    marginTop: 2,
    marginRight: 15,
    border: `1px solid ${colors.INTERFACE.ui3}`,
    textAlign: 'center',
  },
  questionName: {
    fontWeight: 600,
    fontSize: 14,
  },
  questionSection: {
    padding: '15px 0 15px 15px',
  },
  questionText: {
    fontWeight: 400,
    fontSize: 14,
    marginTop: 13,
    marginBottom: 6,
  },
  questionChoices: {
    marginTop: 0,
    paddingLeft: 15,
    '& li span': {
      marginLeft: -5,
    },
    '& li': {
      listStyleType: 'none',
      position: 'relative',
      fontSize: 13,
      fontWeight: 500,
      color: colors.INTERFACE.ui5,
    },
    '& .selected': {
      color: colors.STATUS.positive,
    },
  },
  requiredQuestion: {
    color: colors.STATUS.negative,
  },
  questionDivider: {
    width: '100%',
  },
}));

export const ExpansionPanelDetailsStyle = styled.div`
  .question-choices li::before {
    font-size: 25px;
    content: '\u00b7';
    position: absolute;
    margin-left: -15px;
    margin-top: -10px;
    color: ${colors.INTERFACE.ui5};
  }
  .question-choices li.selected::before {
    font-size: 13px;
    margin-left: -16px;
    margin-top: -1px;
    content: '\u2713';
    color: ${colors.STATUS.positive};
  }
  .question-choices li.standard::before {
    content: none;
  }
  .question-choices.standard {
    padding-left: 6px;
  }

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

export const ExpansionPanelStyle = styled.div`
  .MuiExpansionPanelSummary-expandIcon.Mui-expanded {
    transform: rotate(90deg);
  }
  .MuiExpansionPanelSummary-root {
    padding: 0 12px 0 15px;
    min-height: 50px;
  }
  .MuiExpansionPanelSummary-content {
    margin: auto;
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

  .MuiExpansionPanel-rounded:last-child,
  .MuiExpansionPanel-rounded:first-child {
    border-radius: 2px;
  }
`;
