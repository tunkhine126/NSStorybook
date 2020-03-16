/**
 *
 * CheckBoxGroup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import CustomCheckBox from '../Icons copy/customCheckbox';
import CheckboxChecked from '../Icons copy/checkboxChecked';
import IntermediateCheckbox from '../Icons copy/intermediateCheckbox';

import { styles, listItemTextStyles, CheckBoxWrapper } from './styles';

// eslint-disable-next-line react/display-name
const CheckBoxGroup = React.forwardRef(
  (
    {
      label,
      show,
      id,
      checboxChange,
      shouldDisable,
      resultCount,
      intermediate,
      multi = false,
    },
    ref
  ) => {
    const classes = styles();
    const disable = shouldDisable.disable && shouldDisable.id === id;

    return (
      <Grid
        ref={ref}
        item
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <CheckBoxWrapper>
          <Checkbox
            checked={show}
            disabled={disable}
            indeterminate={intermediate}
            onChange={e => (checboxChange ? checboxChange(e, id) : null)}
            className={classes.listItemChkbox}
            icon={<CustomCheckBox />}
            checkedIcon={<CheckboxChecked disabled={disable} />}
            indeterminateIcon={<IntermediateCheckbox />}
          />
        </CheckBoxWrapper>
        <ListItemText
          primary={<p className={classes.listItemText}>{label}</p>}
          classes={listItemTextStyles(multi)()}
        />
        {resultCount > 0 && (
          <Typography
            variant="caption"
            gutterBottom
            className={clsx(classes.caption, classes.resultsCaption)}
          >
            {resultCount}
          </Typography>
        )}
      </Grid>
    );
  }
);

CheckBoxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  shouldDisable: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checboxChange: PropTypes.func,
  intermediate: PropTypes.bool,
  resultCount: PropTypes.number,
  multi: PropTypes.bool,
};

export default CheckBoxGroup;
