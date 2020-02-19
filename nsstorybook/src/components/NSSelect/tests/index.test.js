/**
 *
 * Tests for NSSelect
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import NSSelect from '../index';
import { DEFAULT_LOCALE } from '../../../../i18n';

describe('<NSSelect />', () => {
  const languages = [
    { code: 'ab', name: 'Abkhaz', nativeName: 'аҧсуа' },
    { code: 'aa', name: 'Afar', nativeName: 'Afaraf' },
    { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  ];

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <NSSelect
          values={{ item: 'us_en' }}
          items={languages}
          update={() => {}}
          label="Message"
          code="name"
          value="nativeName"
        />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <NSSelect
          values={{ item: 'us_en' }}
          items={languages}
          update={() => {}}
          label="Message"
          code="name"
          value="nativeName"
        />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
