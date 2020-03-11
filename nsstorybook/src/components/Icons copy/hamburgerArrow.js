import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import colors from '../../global-styles';

const HamburgerArrow = ({ classes, sideNavOpen }) => (
  <svg
    width="25"
    height="25"
    viewBox="4 0 22 10"
    fill="none"
    className={clsx({
      [classes.openMenu]: !sideNavOpen,
    })}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 9.5H18V8H7.5V9.5ZM7.5 5.75H18V4.25H7.5V5.75ZM7.5 0.5V2H18V0.5H7.5Z"
      fill={colors.TEXT.medium}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.62197 8.12803L0.365025 4.87109L3.62197 1.61415L3.62197 8.12803Z"
      fill={colors.TEXT.medium}
      style={{ transform: 'translate(22px,0)' }}
    />
  </svg>
);

HamburgerArrow.propTypes = {
  classes: PropTypes.object,
  sideNavOpen: PropTypes.bool,
};

export default HamburgerArrow;
