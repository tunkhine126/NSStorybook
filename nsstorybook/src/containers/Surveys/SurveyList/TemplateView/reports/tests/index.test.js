/**
 *
 * Tests for Reports
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import Reports from '../index';

describe('<Reports />', () => {
  const props = {
    primaryRecipientIdPath: '/recipients/family-list/family/:id',
    localOrg: {
      value: 'New Story',
      uuid: '5d6d254c-5641-11e9-9966-22000bd4493b',
    },
    surveyUuid: '9f11cc4a-0baa-11ea-b9a3-22000acba051',
    surveySections: [],
    userContext: 'us_en',
    totalPossibleResponses: 10,
    surveyName: 'Test Survey',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Reports {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Reports {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
