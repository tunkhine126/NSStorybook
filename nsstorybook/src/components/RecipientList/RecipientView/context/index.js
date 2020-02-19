import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipientViewContext = createContext();

export const RecipientViewProvider = ({
  children,
  tabChange,
  rdData,
  data,
  profileDetails,
  primaryRecipient,
  match,
  ...rest
}) => {
  const [toaster, setToaster] = useState({
    show: false,
    recipientUuid: null,
    field: null,
    undoHandler: null,
  });
  const [saveState, setSaveState] = useState({});

  return (
    <RecipientViewContext.Provider
      value={{
        data,
        rdData,
        tabChange,
        profileDetails,
        primaryRecipient,
        match,
        toasterProps: { toaster, setToaster },
        saveProps: { saveState, setSaveState },
        rest,
      }}
    >
      {children}
    </RecipientViewContext.Provider>
  );
};

RecipientViewProvider.propTypes = {
  children: PropTypes.any.isRequired,
  tabChange: PropTypes.func.isRequired,
  profileDetails: PropTypes.object.isRequired,
  primaryRecipient: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  rdData: PropTypes.any.isRequired,
  match: PropTypes.any.isRequired,
};
