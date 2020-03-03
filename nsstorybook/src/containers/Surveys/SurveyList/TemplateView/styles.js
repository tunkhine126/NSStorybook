import { makeStyles } from '@material-ui/core/styles';
import colors from 'global-styles';

export const styles = makeStyles(() => ({
  divider: {
    marginTop: 22,
    marginBottom: 47,
    marginRight: 40,
  },
  editBtn: { marginRight: 5 },
  editText: { marginRight: 5, fontSize: 13, fontWeight: 600 },
  moreBtn: {
    marginLeft: 15,
  },
}));

export const overviewStyles = makeStyles(() => ({
  table: {
    marginTop: 30,
    marginBottom: 30,
    boxShadow: 'none',
    '& .MuiTableCell-root': {
      fontSize: 14,
    },
    '& .MuiTableCell-head': {
      fontWeight: 900,
      color: colors.TEXT.normal,
    },
  },
  timeLaps: {
    fontSize: 12,
    color: colors.INTERFACE.ui5,
  },
  viewBtn: {
    textTransform: 'none',
  },
}));
