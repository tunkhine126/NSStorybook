import React from 'react'
import SurveyViewer from '../components/SurveyViewer/index'
import { IntlProvider } from 'react-intl';

export default {
  title: 'SurveyViewer',
  component: SurveyViewer
}

export function SurveyViewerComponent() {

  const props = {
    name: 'Some Survey',
    completeDate: '10/11/2000',
    surveyor: 'John Doe',
    sections: [{ body: 'Example Question Bank', surveyQuestions: [] }],
    responses: [{ sourceValue: '36' }],
    context: 'us_en',
  };

  return (
    <div>
      <h3>Example Survey Views</h3>
        <IntlProvider> 
          <SurveyViewer {...props} />
        </IntlProvider>
    </div>
  )
}