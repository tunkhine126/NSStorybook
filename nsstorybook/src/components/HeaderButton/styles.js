import { makeStyles } from '@material-ui/core/styles';
import colors from '../../global-styles';
import styled from 'styled-components';
import { darken } from 'polished';

export const headerButtonStyles = (bgColor = colors.TEXT.medium, padding) =>
  makeStyles(() => ({
    btn: {
      padding,
      marginLeft: '15px',
      fontSize: '12px',
      boxShadow: 'none',
      backgroundColor: bgColor,
      color: colors.INTERFACE.ui1,
      '&:hover': {
        backgroundColor: darken(0.1, bgColor),
      },
    },
    customInput: {
      color: colors.LINKS.link,
      textTransform: 'uppercase',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '1px',
      padding: 0,
      float: 'right',
      borderRadius: 2,
      '&:hover': {
        backgroundColor: 'transparent',
        color: colors.LINKS.hover,
      },
    },
    dropDown: {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    downArrow: {
      marginLeft: '4px',
      marginBottom: '2px',
    },
    moreBtn: {
      marginLeft: '15px',
      fontSize: '12px',
    },
  }));

export const SelectBtnStyle = styled.span`
  .header-button .MuiSelect-root {
    padding: 8px;
  }
  .header-button:hover {
    background-color: transparent;
  }
  .header-button.Mui-focused {
    background-color: none;
    color: ${colors.LINKS.active};
    border-radius: 2px;
  }
`;
