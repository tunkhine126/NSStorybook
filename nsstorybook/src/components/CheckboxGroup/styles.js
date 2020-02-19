import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import colors from 'global-styles';

export const styles = makeStyles(() => ({
  caption: {
    color: colors.INTERFACE.ui5,
    fontSize: 11,
    fontWeight: 500,
  },
  listItemChkbox: {
    marginLeft: -9,
  },
  listItemText: {
    margin: 0,
  },
  resultsCaption: {
    color: colors.TEXT.light,
  },
}));

export const listItemTextStyles = (multi = false) =>
  makeStyles(() => ({
    primary: {
      color: colors.INTERFACE.ui7,
      fontSize: 12,
      fontWeight: 'normal',
    },
    root: {
      marginTop: 2,
      maxWidth: !multi ? 'auto' : 149,
    },
  }));

export const CheckBoxWrapper = styled.span`
  .MuiCheckbox-root {
    height: 22px;
  }
  .MuiCheckbox-root .MuiIconButton-label:hover {
    width: auto;
  }
`;
