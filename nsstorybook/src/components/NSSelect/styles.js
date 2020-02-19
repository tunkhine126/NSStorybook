import { makeStyles } from '@material-ui/core/styles';
import colors from 'global-styles';

export const styles = (width = '100%', maxWidth) =>
  makeStyles({
    size: {
      width,
      maxWidth,
    },
    infoKey: {
      marginLeft: '5px',
    },
  });

export const useNSSelectStyle = (
  width,
  height,
  padding = '27px 12px 10px 15px'
) =>
  makeStyles(theme => ({
    root: {
      backgroundColor: colors.INTERFACE.ui1,
      transition: theme.transitions.create(['border-color']),
      width,
      height,
      padding,
    },
  }));
