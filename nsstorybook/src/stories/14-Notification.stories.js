import React from 'react';
import Notification from '../components/Notification/index'
import { withStyles } from '@material-ui/core/styles';

export default {
  title: 'Notification',
  component: Notification
}

export function NotificationContainer({
  classes
}) {
  
  const style = {
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: '2px',
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  };
  
  const state = {
    open: true,
    message: 'Successful log out',
    type: 'success',
  };

  const Composer = ({ classes }) => (
    <Notification
      status={state.open}
      message={state.message}
      classes={classes}
      messageHandler={() => {}}
      duration={10000}
      position={{ vertical: 'top', horizontal: 'center' }}
      type={state.type}
    />
  );

  const NotificationComposition = withStyles(style)(Composer);

  return (
    <div> 
      <h3>Notification window</h3>
        <NotificationComposition />
    </div>
  )
}