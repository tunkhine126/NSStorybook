/**
 *
 * Horiz
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

import NSMenuItem from '../NSMenuItem';
import { styles } from './styles';

export function Horiz({ actions, id }) {
  const classes = styles();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClick(_id, route) {
    // TODO: Revisit
    console.log(_id, route);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const PaperProps = {
    style: {
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
      width: 200,
    },
  };

  return (
    <Grid item className={classes.columnHeight}>
      <IconButton
        aria-label="more options"
        size="small"
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleMenuClick}
      >
        <MoreHoriz className={classes.horiz} />
      </IconButton>
      <Menu
        id={`horiz-menu-${id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        PaperProps={PaperProps}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {actions.map(({ icon, text, route }, idx) => (
          <NSMenuItem
            key={idx}
            icon={icon}
            text={text}
            handleItemClick={() => handleClick(id, route)}
          />
        ))}
      </Menu>
    </Grid>
  );
}

Horiz.propTypes = {
  actions: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default Horiz;
