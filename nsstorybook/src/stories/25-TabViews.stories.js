import React from 'react'
import TabViews from '../components/TabViews/index'

export default {
  title: 'Tab Views',
  component: TabViews
}

export function TabViewsContainer() {

  const props = {
    currentTabValue: 0,
    tabChange: () => {},
    data: {},
    tabValues: [],
    indexChange: () => {},
    tabViews: [<>An example Tab</>],
  };

  return (
    <div> 
      <h3>Example Tab</h3>
      <TabViews {...props}/>
    </div>
  )
}