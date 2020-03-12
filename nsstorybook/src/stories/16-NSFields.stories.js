import React, { Component } from 'react'
import NSFields from '../components/NSFields/index'

export default {
  title: 'New Story Fields',
  component: NSFields
}

export function NSFieldsContainer() {

  const Prefix = () => <p style={{ minWidth: 50 }}>SLUG-LOCATION-FAMILY</p>;

  return (
    <div>
      <h3>New Story Field Input</h3>
      <p>
        <NSFields 
          fieldType="short_text"
          field="shortText"
          label="Identifying Text"
          position="start"
          showPrefix
          icon={Prefix}/>
      </p>
      <p>
        <NSFields
          fieldType="paragraph_text"
          field="paragraph"
          label="Paragraph Text"
        />
      </p>
      <p>
        <NSFields 
          fieldType="number" 
          field="number" 
          label="Numbers only with scroll" />
      </p>
      <p>
        <NSFields 
          fieldType="date" 
          field="date" 
          label="Date Field with picker" />
      </p>
    </div>
  )
}