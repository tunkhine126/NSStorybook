import { makeStyles } from '@material-ui/core/styles';
import colors from 'global-styles';

export const actionPanelStyles = makeStyles(theme => ({
  cancelBtn: {
    color: colors.TEXT.cancel,
    marginTop: 10,
    '&:hover': {
      color: colors.STATUS.negative,
      backgroundColor: 'transparent',
    },
  },
  panel: {
    background: '#D7D7D7',
    padding: '25px 40px',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      padding: '25px 35px',
    },
  },
  confirmBtn: {
    minHeight: 48,
    width: '100%',
    maxWidth: 225,
    boxShadow: 'none',
    borderRadius: 2,
    fontFamily: 'Barlow',
  },
  progress: {
    color: colors.INTERFACE.ui1,
    padding: 8,
    marginTop: -3,
  },
}));
