/**
 *
 * Tests for Map
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import Map from '../map';

describe('<Map />', () => {
  const props = {
    responses: [],
    surveyName: 'Test Survey',
    primaryRecipientIdPath: '/recipients/family-list/family/:id',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Map {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Map {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
