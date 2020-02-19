import { makeStyles } from '@material-ui/core/styles';

export const styles = maxWidth =>
  makeStyles(() => ({
    input: {
      width: '100%',
      maxWidth,
    },
  }));
