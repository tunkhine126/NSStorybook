/**
 *
 * Tests for AccountSettings
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';

import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';

import LangSettings from '../languageSettings';

describe('<LangSettings />', () => {
  const data = {
    viewer: {
      language: 'en',
      defaultContextPermalink: 'us_en',
    },
  };

  const state = {
    survlangState: {
      item: 'us_en',
    },
    handleSurvLangChange: () => {},
    langState: { item: 'en' },
    handleLangChange: () => {},
    setSurvLangState: () => {},
    setLangState: () => {},
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <LangSettings data={data} state={state} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <LangSettings data={data} state={state} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
