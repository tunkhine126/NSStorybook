import React from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom'
import Horiz from '../components/Horiz/index'
import { styles } from '../components/NSTable/styles';
import Search from '@material-ui/icons/Search';

export default {
  title: 'Horiz',
  component: Horiz,
};


export function HorizContainer(){

  const classes = styles();
  const horizActions = [
    {
      route: '/survey-requests',
      icon: Search,
      text: 'Get Surveys',
    },
    {
      route: '/survey-requests/edit',
      icon: Search,
      text: 'Edit Surveys',
    },
    {
      route: '/update-status',
      icon: Search,
      text: 'Update Status',
    },
  ];

  return (
    <BrowserRouter>
      <h4> A horizontal dropdown container that activates when clicked.</h4>
        <p onClick={action('Horizontal container clicked')}> 
          <Horiz
            parentClasses={classes}
            id='4'
            actions={horizActions}
            
          />
        </p>
    </BrowserRouter>
  )
}