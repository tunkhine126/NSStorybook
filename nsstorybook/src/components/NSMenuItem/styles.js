import { makeStyles } from '@material-ui/core/styles';
import colors from '../../global-styles';

export const IconStyles = makeStyles(() => ({
  root: {
    fontSize: '20px',
    color: colors.INTERFACE.ui7,
  },
}));

export const MenuItemStyles = makeStyles(() => ({
  root: {
    height: '36px',
  },
}));

export const ListItemTextStyles = makeStyles(() => ({
  primary: {
    fontSize: '14px',
    fontWeight: '600',
    whiteSpace: 'normal',
    lineHeight: 0,
    color: colors.INTERFACE.ui7,
  },
  root: {
    lineHeight: 0.9,
  },
}));
