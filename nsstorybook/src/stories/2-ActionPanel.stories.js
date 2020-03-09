import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom'
import ActionPanel from '../components/ActionPanel/index'
// import { actionPanelStyles } from '../components/ActionPanel/styles';



export default {
  title: 'ActionPanel',
  component: ActionPanel,
};

export function ActionPanelContainer() {

  // const classes = actionPanelStyles();
  const [loadingState, setloadingState] = useState(true);
  const [messageState, setmessageState] = useState({
    message: '',
    open: false,
    type: 'success',
  });

  return (
    <BrowserRouter>
    <h3>Action Panel Loading</h3>
      <ActionPanel
            action=""
            type=""
            formId=""
            resetForm={action("I've been clicked")}
            loading={loadingState}
            disabled={loadingState}>
            Button
      </ActionPanel>
    <p>An Action Panel usually consists of a button(s) and when clicked will have some loading state before delivering a message</p>
    </BrowserRouter>
  );
}