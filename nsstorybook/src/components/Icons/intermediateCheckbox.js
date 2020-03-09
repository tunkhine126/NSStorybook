import React from 'react';

// eslint-disable-next-line react/display-name
const IntermediateCheckbox = React.forwardRef((props, ref) => (
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
      d="M1.77778 0C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V1.77778C16 0.8 15.2 0 14.2222 0H1.77778ZM3.28209 7.0324L12.7179 7.0324V8.77779H3.28209L3.28209 7.0324Z"
      fill="#00BAE0"
    />
  </svg>
));

export default IntermediateCheckbox;
