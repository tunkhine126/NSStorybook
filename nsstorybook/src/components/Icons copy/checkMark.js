import React from 'react';

// eslint-disable-next-line react/display-name
const CheckMark = React.forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref}
    width="20"
    height="20"
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.06644 10.5751L2.21644 6.72506L0.933105 8.0084L6.06644 13.1417L17.0664 2.14173L15.7831 0.858398L6.06644 10.5751Z"
      fill="#00BAE0"
    />
  </svg>
));

export default CheckMark;
