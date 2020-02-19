/**
 *
 * ListItemLink
 *
 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { BREAD_CRUMB_NAME_MAP, ROUTES } from 'utils/globalConstants';

// eslint-disable-next-line no-unused-vars
function ListItemLink({ to, open, isNested, classes, label, icon, ...other }) {
  const primary = BREAD_CRUMB_NAME_MAP[to];
  const {
    router: {
      location: { pathname },
    },
    disabled,
  } = { ...other };
  const expand = open ? <ExpandLess /> : <ExpandMore />;
  let activeItem = pathname === to;

  const parentRoute = pathname.split('/')[1];

  if (
    parentRoute === 'recipients' &&
    ROUTES[parentRoute].children &&
    ROUTES[parentRoute].children.find(recipient => recipient.path === to) &&
    pathname.includes(to)
  ) {
    activeItem = true;
  } else if (
    ROUTES[parentRoute] &&
    ROUTES[parentRoute].children &&
    to.includes(ROUTES[parentRoute].children[0].path)
  ) {
    activeItem = pathname === to || pathname.includes(to);

    ROUTES[parentRoute].children.forEach(c => {
      if (c.parentActive && pathname.includes(c.name)) {
        activeItem = true;
      }
    });
  }

  return (
    <ListItem
      button
      className={clsx(classes.listItem, { [classes.nested]: isNested })}
      component={RouterLink}
      to={to}
      selected={activeItem}
      disabled={disabled}
    >
      <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      <ListItemText
        primary={primary || label}
        classes={{
          primary: clsx({ [classes.nestedText]: isNested }),
        }}
      />
      {open != null ? expand : null}
    </ListItem>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  isNested: PropTypes.bool,
  classes: PropTypes.object,
  icon: PropTypes.any,
  text: PropTypes.string,
  label: PropTypes.string,
  to: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  const { router } = state;
  return {
    router,
  };
};

export default connect(mapStateToProps)(ListItemLink);
