import React from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom'
import Content from '../components/Content'
import Checkbox from '@material-ui/core/Checkbox';
import button from '@material-ui/core';
import NSButton from '../components/NSButton/index';
import { NSButtonStyles } from '../components/NSButton/styles'
import clsx from 'clsx';


export default {
  title: 'Content',
  component: Content,
};

export function ContentContainter({
  subHeader,
  body,
  headerClass,
  containerClass,
  screen,
}) {

const headerScreen = (screen && screen.header.xs) || 3;
const bodyScreen = (screen && screen.header.xs) || 9;
const classes = NSButtonStyles(); 

return (
  <BrowserRouter>
  <h3>Content Container </h3>
  <Content 
    key=''
    subHeader='This is where a message to the user is passed'
    body={
      <NSButton
          id="Forward"
          version={2}
          componentClasses={clsx(classes.btns, classes.margin)}
          onClick={action("I've been clicked")}>
          <span>
            <p>This is where a component can be passed in</p>
            <p><Checkbox />
            </p>
          </span>
        </NSButton>
      }
    containerClass=''
    headerClass='HEADER'
  />
  </BrowserRouter>
);

}