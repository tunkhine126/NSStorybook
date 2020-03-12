import { makeStyles } from '@material-ui/core/styles';
import colors from '../../global-styles';
import styled from 'styled-components';

export const styles = makeStyles(() => ({
  caption: {
    fontSize: '1rem',
    fontWeight: 400,
    marginTop: 10,
    color: colors.TEXT.light,
  },
  dropzone: {
    marginTop: 30,
    padding: 25,
    border: `2px dashed ${colors.TEXT.medium}`,
    borderRadius: 2,
    '&:hover': {
      borderColor: colors.STATE.active,
    },
    outline: 'none',
    cursor: 'pointer',
    maxWidth: 300,
  },
  icon: {
    fontSize: 40,
    color: colors.TEXT.light,
  },
  img: {
    width: '100%',
  },
  overlay: {
    transition: '.5s ease',
    opacity: 0,
    position: 'absolute',
    top: '50%',
    left: ' 50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  imgContainer: {
    cursor: 'auto',
    position: 'relative',
    '&:hover img': {
      opacity: 0.3,
    },
    '&:hover .img-overlay': {
      opacity: 1,
    },
  },
  deleteBtn: {
    '&:hover': {
      color: colors.STATUS.negative,
    },
  },
  deleteText: {
    fontWeight: 600,
    color: colors.TEXT.normal,
  },
}));

export const SelectWrapper = styled.div`
  margin-bottom: 8px;
  .MuiFormLabel-root {
    font-weight: normal;
  }
  .MuiInputBase-root {
    height: auto;
  }
  .MuiFormControl-root {
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;
