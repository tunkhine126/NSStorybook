/*
 * SurveyViewer Messages
 *
 * This contains all the text for the SurveyViewer Component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.component.SurveyViewer';

export default defineMessages({
  bySurveyor: {
    id: `${scope}.bySurveyor`,
    defaultMessage: 'by Surveyor',
  },
  completed: {
    id: `${scope}.completed`,
    defaultMessage: 'Completed',
  },
  conditionalDisplay: {
    id: `${scope}.conditionalDisplay`,
    defaultMessage: 'Display this question if',
  },
  field: {
    id: `${scope}.field`,
    defaultMessage: 'Field',
  },
  noResponse: {
    id: `${scope}.noResponse`,
    defaultMessage: 'No Response',
  },
  questions: {
    id: `${scope}.questions`,
    defaultMessage: 'Questions',
  },
  question: {
    id: `${scope}.question`,
    defaultMessage: 'Question',
  },
});
