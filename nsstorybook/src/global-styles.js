import styled, { createGlobalStyle } from 'styled-components';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

export const colors = {
  TEXT: {
    light: '#ABABB6',
    medium: '#9B9EA6',
    cancel: '#6F6F74',
    normal: '#585858',
    dark: '#2D2D2D',
  },
  STATUS: {
    negative: '#F26932',
    positive: '#44BE70',
    notice: '#FFC60A',
    neutral: '#BFBFBF',
  },
  STATE: {
    active: '#00BAE0',
    subtle: '#D4F8FF',
    inactive: '#CDCDD2',
    disabled: '#C0C0C4',
  },
  LINKS: {
    link: '#00BAE0',
    hover: '#0089A5',
    subtle: '#D4F8FF',
    active: '#075767',
    hoverNegative: '#C0571D',
  },
  INTERFACE: {
    ui1: '#FFFFFF',
    ui2: '#F0F0F0',
    ui3: '#E4E4E5',
    ui4: '#DADAE0',
    ui5: '#93939A',
    ui6: '#585858',
    ui7: '#4E4E56',
    ui8: '#2D2D2D',
    ui9: '#111111',
    window: '#EFEFEF',
  },
};

export const FieldWrapper = styled.div`
  .MuiFormControl-root {
    max-width: 400px;
  }
`;

export const inputStyles = error =>
  makeStyles(() => ({
    input: {
      width: '100%',
      maxWidth: '400px',
    },
    error: {
      color: colors.STATUS.negative,
      display: 'flex',
      marginBottom: 10,
    },
    marginTop: {
      marginTop: 10,
    },
    root: {
      '& .MuiInputBase-root.Mui-focused': {
        border: `2px solid ${
          !error ? colors.LINKS.link : colors.STATUS.negative
        }`,
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: !error ? colors.LINKS.link : colors.STATUS.negative,
      },
      '& .MuiFilledInput-root': {
        borderRadius: 2,
        backgroundColor: '#fff',
        border: `1px solid ${
          !error ? colors.INTERFACE.ui4 : colors.STATUS.negative
        }`,
      },
      '&:hover .MuiFilledInput-root': {
        borderColor: !error ? colors.LINKS.link : colors.STATUS.negative,
        transition: 'border 0.3s',
      },
    },
  }));

export const DatePickerStyle = error =>
  makeStyles(() => ({
    root: {
      '& .MuiInputBase-root.Mui-focused': {
        border: `2px solid ${
          !error ? colors.LINKS.link : colors.STATUS.negative
        }`,
      },
      '& .MuiFormLabel-root': {
        fontWeight: `normal`,
        color: colors.TEXT.light,
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: !error ? colors.LINKS.link : colors.STATUS.negative,
      },
      '& .MuiFilledInput-root': {
        borderRadius: 2,
        backgroundColor: '#fff',
        border: `1px solid ${
          !error ? colors.INTERFACE.ui4 : colors.STATUS.negative
        }`,
      },
      '& .MuiFilledInput-underline:before, .MuiFilledInput-underline:after': {
        border: 'none',
      },
      '& .MuiFormHelperText-contained': {
        margin: '10px 0 8px 0',
      },
      '&:hover .MuiFilledInput-root': {
        borderColor: !error ? colors.LINKS.link : colors.STATUS.negative,
        transition: 'border 0.3s',
      },
    },
  }));

export const SelectStyle = error =>
  makeStyles(() => ({
    root: {
      '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${
          !error ? colors.INTERFACE.ui4 : colors.STATUS.negative
        }`,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${
          !error ? colors.INTERFACE.ui4 : colors.STATUS.negative
        }`,
      },
    },
  }));

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  
  #app {
    background-color: ${colors.INTERFACE.window};
    height:100%; 
    display: flex;
    overflow: auto;
  }
  #menu-addFilters .MuiListItem-root.Mui-selected {
    background-color: inherit
  }
  .Mui-checked.MuiCheckbox-colorSecondary.Mui-checked:hover{
    background-color: inherit;
  }
  .MuiCheckbox-root .MuiIconButton-label:hover {
    border: 1px solid ${colors.LINKS.link};
    border-radius: 2px;
    transition: border-color 0.2s;
    width: 40px;
  }
  .MuiCheckbox-root.Mui-checked .MuiIconButton-label:hover, .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:hover {
    border: none;
  }
  thead .MuiCheckbox-root {
    width: 16px;
    height: 15px;
  }
  ::-webkit-scrollbar {
    width: 0.5em;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,.1);
    outline: 1px solid slategrey;
    border-radius: 20px;
  }
  @keyframes bounceInDown {
    from,
    60%,
    75%,
    90%,
    to {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -3000px, 0);
        transform: translate3d(0, -3000px, 0);
    }
    60% {
        opacity: 1;
        -webkit-transform: translate3d(0, 25px, 0);
        transform: translate3d(0, 25px, 0);
    }
    75% {
        -webkit-transform: translate3d(0, -10px, 0);
        transform: translate3d(0, -10px, 0);
    }
    90% {
        -webkit-transform: translate3d(0, 5px, 0);
        transform: translate3d(0, 5px, 0);
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}
.bounceInDown {
    -webkit-animation-name: bounceInDown;
    animation-name: bounceInDown;
}
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.animated.fast {
    -webkit-animation-duration: 800ms;
    animation-duration: 800ms;
}
.animated.faster {
    -webkit-animation-duration: 500ms;
    animation-duration: 500ms;
}
`;

export const globalTheme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#00BAE0',
      contrastText: '#fff',
      // dark: will be calculated from palette.primary.main,
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    error: {
      main: '#F26932',
    },
  },
  typography: {
    fontFamily: ['Barlow', 'Roboto', 'Arial', 'sans-serif'].join(','),
    body1: {
      fontWeight: '500',
    },
    h1: {
      fontFamily: ['Barlow', 'Roboto', 'Arial', 'sans-serif'].join(','),
      fontWeight: 500,
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiRadio: {
      root: {
        padding: 5,
        marginLeft: 16,
        '&~.MuiTypography-root': {
          fontWeight: 400,
          fontSize: 12,
        },
        color: colors.INTERFACE.ui4,
        '& .MuiSvgIcon-root': {
          fontSize: '1.2rem',
          transition: 'color 0.2s',
        },
        '&$checked': {
          color: colors.LINKS.link,
        },
        '&:hover': {
          backgroundColor: 'inherit',
        },
        '&:hover .MuiSvgIcon-root': {
          color: colors.LINKS.link,
        },
        '&.MuiRadio-colorSecondary.Mui-checked:hover': {
          backgroundColor: 'inherit',
        },
      },
      colorSecondary: {
        '&.Mui-checked': {
          color: colors.LINKS.link,
        },
        '&.Mui-checked:hover': {
          backgroundColor: 'inherit',
        },
      },
      checked: {},
    },
    MuiInputBase: {
      input: {
        fontWeight: 400,
      },
    },
    MuiButtonGroup: {
      grouped: {
        minWidth: 30,
      },
    },
    MuiChip: {
      deleteIcon: {
        width: 'auto',
        height: 'auto',
        margin: '2px 5px 0 -6px',
      },
    },
    MuiToggleButton: {
      root: {
        '&:last-child': {
          paddingLeft: 5,
          padding: '0 5px',
        },
        '&.Mui-selected': {
          backgroundColor: colors.LINKS.link,
          borderColor: colors.LINKS.link,
          color: '#fff',
        },
      },
      sizeSmall: {
        padding: '0 5px',
        height: 30,
      },
    },
    PrivateNotchedOutline: {
      root: {
        borderRadius: 2,
      },
    },
    MuiSelect: {
      outlined: {
        borderRadius: 2,
      },
    },
    MuiCheckbox: {
      root: {
        width: 34,
        height: 34,
        '&:hover': {
          backgroundColor: 'inherit',
        },
      },
      colorSecondary: {
        '&.Mui-checked': {
          color: 'inherit',
        },
      },
      indeterminate: {
        '&:hover': {
          backgroundColor: '#fff',
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 34,
      },
    },
    MuiListItem: {
      root: {
        '&.Mui-selected, &.Mui-selected:hover': {
          backgroundColor: colors.STATE.subtle,
        },
      },
      button: {
        '&:hover': {
          backgroundColor: colors.STATE.subtle,
        },
      },
    },
    MuiButton: {
      label: {
        fontWeight: '600',
        letterSpacing: '1px',
      },
      root: {
        minWidth: 0,
        borderRadius: 2,
      },
      sizeSmall: {
        padding: '4px 5px',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 2,
      },
    },
    MuiMenuItem: {
      root: {
        minHeight: 36,
        fontWeight: 400,
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: colors.STATE.active,
        },
      },
      asterisk: {
        color: colors.STATUS.negative,
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: `2px solid ${colors.STATE.active}`,
        },
      },
    },
    MuiFormControl: {
      root: {
        borderRadius: 2,
      },
    },
    MuiTab: {
      root: {
        fontWeight: 700,
      },
    },
    MuiTableCell: {
      root: {
        '&:last-child': {
          padding: '0',
          paddingRight: '0',
          minWidth: 35,
        },
      },
    },
  },
});

export default colors;