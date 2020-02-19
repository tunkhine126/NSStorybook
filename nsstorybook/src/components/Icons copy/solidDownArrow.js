import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const SolidDownArrow = React.forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref}
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.48532 4.24264L4.24268 8.48528L3.51667e-05 4.24264H8.48532Z"
      fill={props['data-custom'] ? '' : 'white'}
    />
  </svg>
));

SolidDownArrow.propTypes = {
  'data-custom': PropTypes.bool,
};

export default SolidDownArrow;
