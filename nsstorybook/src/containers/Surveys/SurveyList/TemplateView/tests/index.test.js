/**
 *
 * Tests for TemplateView
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import TemplateView from '../Loadable';

describe('<TemplateView />', () => {
  const props = {
    primaryRecipientDetails: {
      ChildRoutes: [{ path: '/recipients/family-list/family/:id' }],
    },
    match: {
      isExact: true,
      params: { id: '9f11cc4a-0baa-11ea-b9a3-22000acba051' },
      path: '/surveys/survey-templates/:id',
      url: '/surveys/survey-templates/9f11cc4a-0baa-11ea-b9a3-22000acba051',
    },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <TemplateView {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <TemplateView {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
