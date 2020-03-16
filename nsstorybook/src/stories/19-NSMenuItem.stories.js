import React from 'react'
import NSMenuItem from '../components/NSMenuItem/index'
import Add from '@material-ui/icons/Add';
import { action } from '@storybook/addon-actions';

export default {
  title: 'New Story Menu Item',
  component: NSMenuItem
}

export function MenuItemContainer() {

  return (
    <div>
      <h3>Menu Item</h3>
        <p>
          <NSMenuItem icon={Add} text='Option 1' handleItemClick={action('clicked')} />
          <NSMenuItem icon={Add} text='Option 2' handleItemClick={action('clicked')} />
          <NSMenuItem icon={Add} text='Option 3' handleItemClick={action('clicked')} />
        </p>
      
    </div>
  )
}