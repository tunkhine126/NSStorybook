import { makeStyles } from '@material-ui/core/styles';
import colors from '../../global-styles';
import { darken } from 'polished';

export const NSButtonStyles = makeStyles(theme => ({
  btn: {
    fontSize: '12px',
    boxShadow: 'none',
    color: colors.INTERFACE.ui1,
  },
  primary: {
    backgroundColor: colors.TEXT.medium,
    '&:hover': {
      backgroundColor: darken(0.1, colors.TEXT.medium),
    },
  },
  secondary: {
    backgroundColor: colors.LINKS.link,
    '&:hover': {
      backgroundColor: darken(0.1, colors.LINKS.link),
    },
  },
  negative: {
    backgroundColor: colors.STATUS.negative,
    '&:hover': {
      backgroundColor: darken(0.2, colors.STATUS.negative),
    },
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
  },
}));

export const btnLinkStyles = deleteLink =>
  makeStyles(() => ({
    root: {
      padding: 0,
      background: 'transparent',
      color: !deleteLink ? colors.LINKS.link : colors.STATUS.negative,
      '&:hover': {
        background: 'transparent',
        boxShadow: 'none',
        color: darken(
          0.1,
          !deleteLink ? colors.LINKS.link : colors.STATUS.negative
        ),
        textDecoration: deleteLink ? 'underline' : 'normal',
        transition: 'color 0.3s',
      },
    },
    label: {
      fontWeight: '700',
    },
  }));