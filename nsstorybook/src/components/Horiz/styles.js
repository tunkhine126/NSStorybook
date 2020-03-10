import { makeStyles } from '@material-ui/core/styles';
import colors from '../../global-styles';

export const styles = makeStyles(() => ({
  columnHeight: {
    height: 35,
  },
  horiz: {
    color: colors.TEXT.light,
    fontSize: 23,
    '&:hover': {
      color: colors.LINKS.link,
      transition: 'color 0.2s',
    },
  },
}));
