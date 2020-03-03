/**
 *
 * Tests for RecipientList
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import RecipientList from '../index';

describe('<RecipientList />', () => {
  const props = {
    name: 'Test Survey',
    primaryRecipientDetails: {
      ChildRoutes: [{ path: '/recipients/family-list/family/:id' }],
    },
    surveyId: '24234-32423-4234234',
    localOrg: {
      value: 'New Story',
      uuid: '5d6d254c-5641-11e9-9966-22000bd4493b',
    },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <RecipientList {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <RecipientList {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
