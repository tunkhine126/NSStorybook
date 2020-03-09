import React from 'react';

// eslint-disable-next-line react/display-name
const CustomCheckBox = React.forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="15"
      height="15"
      rx="1.5"
      fill="white"
      stroke="#DADAE0"
    />
  </svg>
));

export default CustomCheckBox;
