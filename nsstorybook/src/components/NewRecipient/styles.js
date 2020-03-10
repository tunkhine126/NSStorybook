import { makeStyles } from '@material-ui/core/styles';
import { green, amber } from '@material-ui/core/colors';
import colors from '../../global-styles';
import styled from 'styled-components';

const separatorGray = '#BBBBBB';

export const commonStyles = makeStyles(theme => ({
  darkText: {
    color: colors.TEXT.dark,
    fontSize: '14px',
    fontWeight: 'normal',
  },
  generalContainer: {
    minHeight: '310px',
    borderBottom: `1px solid ${separatorGray}`,
  },
  header: {
    fontSize: '28px',
  },
  input: {
    width: '100%',
    maxWidth: '400px',
  },
  fieldsContainer: {
    padding: '25px 0',
    flexGrow: 0,
  },
  root: {
    flexGrow: 1,
    display: 'flex',
    marginTop: '1.5rem',
    borderTop: `1px solid ${separatorGray}`,
  },
  sectionHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: colors.INTERFACE.ui7,
  },
  spacing: {
    marginBottom: '5px',
  },
  selectSpacing: {
    marginBottom: '27px',
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  linkStyle: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: '12px',
    letterSpacing: '1px',
  },
  optionalFields: {
    paddingTop: '25px',
  },
  required: {
    minHeight: '202px',
    borderBottom: '1px solid #BBBBBB',
    [theme.breakpoints.down('md')]: {
      minHeight: '225px',
    },
  },
}));

export const InputWrapper = styled.div`
  .MuiInputBase-root {
    height: 58px;
  }
  .MuiFormControl-root {
    max-width: 66%;
  }
  .MuiFilledInput-multiline {
    height: 100px;
  }
`;
