import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const ConfirmPwdStyle = styled.div`
  .MuiFormControl-marginNormal {
    margin-top: 0;
  }
`;

export const pwdSettingsStyles = makeStyles(theme => ({
  confirmContainer: {
    paddingTop: '25px',
  },
  newPassword: {
    minHeight: '202px',
    borderBottom: '1px solid #BBBBBB',
    [theme.breakpoints.down('md')]: {
      minHeight: '225px',
    },
  },
}));
