/**
 *
 * Tests for Card
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import { DATA_TYPES } from 'utils/globalConstants';
import Card from '../card';

describe('<Card />', () => {
  const props = {
    primaryRecipientIdPath: '/recipients/family-list/family/:id',
    name: 'Test Card',
    question: 'What is a test question?',
    version: 1,
    questionNumber: 1,
    totalPossibleResponses: 10,
    responses: [],
    surveyName: 'Test Survey',
  };

  const selectProps = {
    options: ['Test1', 'Test2', 'Test3'],
    optionLabels: {
      Test1: 'Test Options 1',
      Test2: 'Test Options 2',
      Test3: 'Test Options 3',
    },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Card {...props} type={DATA_TYPES.shortText} {...selectProps} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Number graph type', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Card {...props} type={DATA_TYPES.number} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Coordinates graph type', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Card {...props} type={DATA_TYPES.coordinates} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Photo graph type', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Card {...props} type={DATA_TYPES.photo} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Single Select graph type', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Card {...props} {...selectProps} type={DATA_TYPES.singleSelect} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Card {...props} {...selectProps} type={DATA_TYPES.multiSelect} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
