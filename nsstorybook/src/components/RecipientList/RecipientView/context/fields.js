import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FieldsContext = createContext();

export const FieldsProvider = ({ children, ...rest }) => {
  const [activePhotoField, setActivePhotoField] = useState(null);
  const [recipientPhoto, setRecipientPhoto] = useState({});

  return (
    <FieldsContext.Provider
      value={{
        activePhotoProps: { activePhotoField, setActivePhotoField },
        recipientPhotoProps: { recipientPhoto, setRecipientPhoto },
        rest,
      }}
    >
      {children}
    </FieldsContext.Provider>
  );
};

FieldsProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
