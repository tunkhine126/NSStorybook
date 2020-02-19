/**
 *
 * NSMenuItem
 *
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

import { ListItemTextStyles, IconStyles, MenuItemStyles } from './styles';

// eslint-disable-next-line react/display-name
const NSMenuItem = forwardRef((props, ref) => {
  const { icon: Icon, text, handleItemClick } = props;
  return (
    <MenuItem
      {...ref}
      classes={MenuItemStyles()}
      onClick={() => handleItemClick()}
    >
      <ListItemIcon>
        <Icon classes={IconStyles()} />
      </ListItemIcon>
      <ListItemText primary={text} classes={ListItemTextStyles()} />
    </MenuItem>
  );
});

NSMenuItem.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  handleItemClick: PropTypes.func.isRequired,
};

export default NSMenuItem;
