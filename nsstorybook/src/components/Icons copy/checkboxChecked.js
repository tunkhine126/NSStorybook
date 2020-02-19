import React from 'react';
import PropTypes from 'prop-types';
import colors from 'global-styles';

// eslint-disable-next-line react/display-name
const CheckboxChecked = React.forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.77778 0C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V1.77778C16 0.8 15.2 0 14.2222 0H1.77778ZM1.77778 8.17094L3.02222 6.97436L6.22222 10.0513L12.9778 3.55556L14.2222 4.75214L6.22222 12.4444L1.77778 8.17094Z"
      fill={props.disabled ? colors.INTERFACE.ui4 : colors.LINKS.link}
    />
  </svg>
));

CheckboxChecked.propTypes = {
  disabled: PropTypes.bool,
};
export default CheckboxChecked;
