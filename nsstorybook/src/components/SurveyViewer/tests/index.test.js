/**
 *
 * Tests for SurveyViewer
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import TestingComponent from 'components/shared/Testing';
import SurveyViewer from '../index';

describe('<SurveyViewer />', () => {
  const props = {
    name: 'Test Survey',
    completeDate: '10/11/2000',
    surveyor: 'John Doe',
    sections: [{ body: 'Test Identification', surveyQuestions: [] }],
    responses: [{ sourceValue: '36' }],
    context: 'us_en',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <SurveyViewer {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <SurveyViewer {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
