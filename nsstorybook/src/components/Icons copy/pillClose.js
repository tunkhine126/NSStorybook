import React from 'react';

// eslint-disable-next-line react/display-name
const PillClose = React.forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref}
    width="13"
    height="13"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.5 3.205L8.795 2.5L6 5.295L3.205 2.5L2.5 3.205L5.295 6L2.5 8.795L3.205 9.5L6 6.705L8.795 9.5L9.5 8.795L6.705 6L9.5 3.205Z"
      fill="white"
    />
  </svg>
));

export default PillClose;
