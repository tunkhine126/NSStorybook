import { makeStyles } from '@material-ui/core/styles';
import colors from 'global-styles';
import styled from 'styled-components';

export const headerStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${colors.INTERFACE.ui4}`,
    boxShadow: 'none',
  },
  cardContainer: {
    maxWidth: 215,
  },
  headerImg: {
    height: 153,
    marginRight: 20,
    borderRadius: 0,
    boxShadow: 'none',
  },
  moreBtn: {
    marginLeft: 15,
  },
  navContainer: {
    flex: 1,
    marginRight: 40,
  },
  recipientInfo: {
    marginTop: 15,
  },
  recipientName: {
    fontSize: 28,
    letterSpacing: 1,
    fontWeight: '600',
    fontFamily: 'Barlow, Roboto, Arial',
    color: colors.TEXT.normal,
    marginBottom: 30,
  },
  tab: {
    color: `${colors.TEXT.medium}`,
    letterSpacing: 1,
    marginRight: 20,
  },
}));

export const ComponentStyle = styled.div`
  .MuiTab-root {
    min-width: 100px;
  }
`;

export const TabContentStyle = styled.div`
  .field-container.photo,
  .field-container .recipient-column {
    padding: 10px 10px 10px 15px;
    overflow: inherit;
    word-break: break-all;
    min-height: 78px;
  }

  .field-container .recipient-column:hover,
  .field-container.photo:hover {
    transition: background-color 0.3s;
    background-color: ${colors.STATE.subtle};
    justify-content: center;
  }

  .field-container .photo-edit-mode {
    background-color: ${colors.STATE.subtle};
  }

  .field-container .recipient-column:hover .MuiGrid-item {
    width: fit-content;
  }

  .field-container .recipient-column:hover .column-action-btns button {
    display: flex;
  }
  .field-container .edit-cancel-btn {
    font-size: 12px;
    color: ${colors.TEXT.cancel};
  }
  .field-container .edit-cancel-btn:hover {
    color: ${colors.STATUS.negative};
  }
  .field-container .edit-save-btn {
    padding: 6px 12px;
  }
`;
