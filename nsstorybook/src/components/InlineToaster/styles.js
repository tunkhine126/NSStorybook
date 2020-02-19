import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import colors from 'global-styles';

export const inlineToasterStyle = makeStyles(theme => ({
  success: {
    backgroundColor: colors.STATUS.positive,
    minWidth: 'auto',
    width: 87,
    height: 57,
    padding: '0 5px',
    boxShadow: '0px 2px 5px -1px rgba(138,138,138,1)',
    borderRadius: 2,
    fontWeight: '700',
    fontSize: 15,
    '& svg': {
      fontSize: 20,
    },
  },
  error: {
    backgroundColor: colors.STATUS.negative,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: colors.STATUS.notice,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  undoBtn: {
    '.MuiButton-root&:hover': {
      color: '#fff',
      opacity: 1,
      transition: 'opacity 0.3s',
    },
  },
}));

export const InlineToasterWrapper = styled.span`
  button {
    color: #fff;
    opacity: 0.7;
    margin-left: 16px;
    font-size: 11px;
  }
  .MuiSnackbarContent-action {
    margin: -10px 0 0px 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .MuiSnackbarContent-message {
    padding: 0;
  }
`;
