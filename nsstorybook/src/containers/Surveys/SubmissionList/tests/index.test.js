/**
 *
 * Tests for SubmissionList
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import SubmissionList from '../index';

describe('<SubmissionList />', () => {
  const props = {
    name: 'Test Survey',
    surveyId: '24234-32423-4234234',
    primaryRecipientDetails: {
      ChildRoutes: [{ path: '/recipients/family-list/family/:id' }],
    },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <SubmissionList {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <SubmissionList {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
