import React from 'react'
import TabViews from '../components/TabViews/index'
import globalMessages from '../messages';

export default {
  title: 'Tab Views',
  component: TabViews
}

export function TabViewsContainer() {

  const tabview1 = [
    globalMessages.overview,
    globalMessages.reports,
    globalMessages.submissions,
    globalMessages.translations,
    globalMessages.preview,
  ]

  const tabview2 = ['Overview', 'Reports', 'Submissions', 'Translations', 'Preview']

  const props = {
    currentTabValue: 0,
    tabChange: () => {},
    data: {},
    tabValues: tabview2,
    indexChange: () => {},
    tabViews: [],
  };

 

  return (
    <div> 
      <h3>Example Tab</h3>
        <TabViews {...props}/>
    </div>
  )
}