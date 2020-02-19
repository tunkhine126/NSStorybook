/**
 *
 * Tests for Question
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import TestingComponent from 'components/shared/Testing';
import Question from '../question';

describe('<Question />', () => {
  const props = {
    responses: [{ sourceValue: 'Red' }],
    question: {
      isRequired: false,
      questionVersion: {
        versionNumber: 1,
        question: { name: 'Test' },
        questionContexts: [{ contextPermalink: 'us_en' }],
        optionValues: ['Red', 'Green', 'Blue'],
      },
    },
    number: 1,
    lastQuestion: false,
    context: 'us_en',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'short_text' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Paragraph Text Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'paragraph_text' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Number Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'number' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Date Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'date' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Time Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'time' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Single Select Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'single_select' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Multi Select Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'multi_select' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Likert Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'likert' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Photo Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'photo' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Audio Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'audio' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Video Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'video' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test for Coordinates Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'coordinates' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should test return Default Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Question
          {...props}
          question={{ ...props.question, fieldType: 'test' }}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Question {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
