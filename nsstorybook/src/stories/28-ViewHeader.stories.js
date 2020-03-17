import React from 'react';
import ViewHeader from '../components/ViewHeader/index'


export default {
  title: 'View Header',
  component: ViewHeader
}

export function ViewHeaderContainer() {

  return (
    <div>
      <h3>View Header example</h3>
      <ViewHeader component="Example" body={<div>A Header Component</div>} />
    </div>
  )
}