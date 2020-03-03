/**
 *
 * Tests for Overview
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import TestingComponent from 'components/shared/Testing';

import Overview from '../overview';

describe('<Overview />', () => {
  const props = {
    data: [],
    submissionData: [],
    userContext: 'us_en',
    match: {
      isExact: true,
      params: { id: '9f11cc4a-0baa-11ea-b9a3-22000acba051' },
      path: '/surveys/survey-templates/:id',
      url: '/surveys/survey-templates/9f11cc4a-0baa-11ea-b9a3-22000acba051',
    },
  };

  it('Expect no errors rending Overview', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Overview {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Overview {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
