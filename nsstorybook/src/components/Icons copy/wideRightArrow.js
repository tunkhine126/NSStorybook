import React from 'react';
import PropTypes from 'prop-types';
import colors from 'global-styles';

const WideRightArrow = ({ classes, childRoute }) => (
  <svg
    width="22"
    height="60"
    viewBox="0 0 22 39"
    fill="none"
    className={childRoute ? classes.arrowSpacing : null}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 0L17 20.5128L1 40" stroke={colors.INTERFACE.ui4} />
  </svg>
);

WideRightArrow.propTypes = {
  classes: PropTypes.object,
  childRoute: PropTypes.bool,
};

export default WideRightArrow;
