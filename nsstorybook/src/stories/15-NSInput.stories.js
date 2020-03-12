import React from 'react'
import NSInput from '../components/NSInput'
import { commonStyles } from '../containers/UserAccount/styles';

export default {
  title: 'New Story Input',
  component: NSInput
}

export function NSInputContainer() {

  const values = { item: ['red'] };
  const items = [{ value: 'Home' }, { value: 'Donation' }, { value: 'Family' }];
  const classes = commonStyles();

  return (
    <div>
      <h3> A New Story form input field</h3>
        <p>
        <NSInput 
          id="user-email"
          label="Plain input field disabled"
          type="email"
          name="user-email"
          autoComplete="email"
          margin="normal"
          variant="filled"
          className={classes.input}
          disabled
        />
        </p>
        <p>
        <NSInput 
        label="Plain with hover"
        margin="normal"
        variant="filled"
        />
        </p>
    </div>
  )
}