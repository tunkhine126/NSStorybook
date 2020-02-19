import { makeStyles } from '@material-ui/core/styles';
import colors from 'global-styles';
import styled from 'styled-components';

export const ComponentStyle = styled.div`
  .MuiFormLabel-root {
    color: ${colors.TEXT.light};
    font-weight: normal;
  }
  .MuiFormLabel-root.Mui-disabled {
    color: ${colors.STATE.disabled};
  }
  .MuiSvgIcon-root {
    color: ${colors.INTERFACE.ui6};
  }
`;

export const useNSInput = makeStyles(theme => ({
  root: {
    border: `1px solid ${colors.INTERFACE.ui4}`,
    overflow: 'hidden',
    borderRadius: 2,
    backgroundColor: colors.INTERFACE.ui1,
    transition: theme.transitions.create(['border-color']),
    '&:hover': {
      backgroundColor: colors.INTERFACE.ui1,
      borderColor: theme.palette.primary.main,
    },
    '&$focused': {
      backgroundColor: colors.INTERFACE.ui1,
      border: `2px solid ${theme.palette.primary.main}`,
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
    },
  },
  disabled: {
    color: colors.STATE.disabled,
    '&:hover': {
      borderColor: colors.INTERFACE.ui4,
    },
  },
  focused: {},
}));
