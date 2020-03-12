import React from 'react'
import Loading from '../components/Loading copy/index'
import Grid from '@material-ui/core/Grid';

export default {
  title: 'Loading',
  component: Loading
}

export function FelixLoader() {

  return (
    <div> 
      <h3>Felix Loading Icon</h3>
        <Loading />
    </div>
  )
}