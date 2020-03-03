import { makeStyles } from '@material-ui/core/styles';
import colors from '../../global-styles';

export const textLinkStyles = makeStyles(() => ({
  btn: {
    padding: 0,
    fontSize: '12px',
    textAlign: 'inherit',
  },
}));

export const btnStyles = fontWeight =>
  makeStyles(() => ({
    label: {
      fontWeight: fontWeight ? '700' : 'normal',
    },
    textPrimary: {
      '&:hover': {
        backgroundColor: 'transparent',
        color: `${colors.LINKS.hover}`,
        transition: 'color 0.2s',
      },
    },
  }));
