import { makeStyles } from '@material-ui/core/styles';
import { createGlobalStyle } from 'styled-components';
import { amber, green } from '@material-ui/core/colors';
import colors from 'global-styles';

export const ComponentStyle = createGlobalStyle`
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    backgroundColor: colors.STATE.active,
    color: colors.INTERFACE.ui1,
  },

  link: {
    margin: theme.spacing(1),
    color: 'gray',
    fontSize: '12px',
  },
  bottomMargin: {
    marginBottom: '20px',
  },
  topMargin: {
    marginTop: '10px',
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
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '40px',
      marginRight: '40px',
    },
  },
  progress: {
    color: colors.INTERFACE.ui1,
    padding: '8px',
  },
}));
