/**
 *
 * Tests for Section
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import TestingComponent from 'components/shared/Testing';
import Section from '../section';

describe('<Section />', () => {
  const props = {
    name: 'Test Survey',
    questions: [],
    responses: [{ sourceValue: '36' }],
    context: 'us_en',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Section {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Section {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
