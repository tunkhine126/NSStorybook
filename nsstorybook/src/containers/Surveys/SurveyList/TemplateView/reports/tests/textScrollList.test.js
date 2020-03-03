/**
 *
 * Tests for TextScrollList
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import TextScrollList from '../textScrollList';

describe('<TextScrollList />', () => {
  const props = {
    responses: [],
    primaryRecipientIdPath: '/recipients/family-list/family/:id',
    surveyName: 'Test Survey',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <TextScrollList {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <TextScrollList {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
