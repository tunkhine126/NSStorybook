import { makeStyles } from '@material-ui/core/styles';
import colors from '../../global-styles';

export const styles = (width = '100%', maxWidth) =>
  makeStyles({
    size: {
      width,
      maxWidth,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    chipLabelContainer: {
      fontSize: 12,
    },
    chipClearBtn: {
      marginTop: 1,
      marginLeft: 1,
      marginRight: 10,
    },
  });

export const useNSMultiSelectStyle = (
  width,
  height,
  padding = '27px 12px 10px 15px',
  minWidth
) =>
  makeStyles(theme => ({
    root: {
      backgroundColor: colors.INTERFACE.ui1,
      transition: theme.transitions.create(['border-color']),
      width,
      height,
      padding,
      minWidth,
    },
  }));
