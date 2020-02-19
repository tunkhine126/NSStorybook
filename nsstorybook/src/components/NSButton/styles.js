import { makeStyles } from '@material-ui/core/styles';
import colors from '../../global-styles';
import { darken } from 'polished';

export const NSButtonStyles = makeStyles(() => ({
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