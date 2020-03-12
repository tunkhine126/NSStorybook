import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import LinkRouter from '../components/LinkRouter'
import { action } from '@storybook/addon-actions';

export default {
  title: 'Link Router',
  component: LinkRouter
}

export function Links() {

  const newstory = 'https://newstorycharity.org/'

  return (
      <BrowserRouter>
        <div>
          <h3>Links</h3>
            <p>
              <LinkRouter color="primary" onClick={action('Link Clicked')}>
                Click this primary link to somewhere...
              </LinkRouter>
            </p>
            <p>
              <LinkRouter color="secondary" onClick={action('Link Clicked')} to={newstory}>
                Click this secondary link to somewhere...
              </LinkRouter>
            </p>
            <p>
              <LinkRouter color="inherit" onClick={action('Link Clicked')}>
                Click this inherited link to somewhere...
              </LinkRouter>
            </p>
          </div>
      </BrowserRouter>
  )
}