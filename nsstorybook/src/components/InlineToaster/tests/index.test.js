/**
 *
 * Tests for InlineToaser
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { DEFAULT_LOCALE } from '../../../../i18n';
import InlineToaser from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('<InlineToaser />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InlineToaser clearToaster={() => {}} variant="success" />
      </IntlProvider>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should hover over toaster then hover out', () => {
    const spy = jest.spyOn(global.console, 'error');

    const wrapper = mount(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InlineToaser
          clearToaster={() => {}}
          variant="success"
          timer={0}
          message="test"
        />
      </IntlProvider>
    );

    const toaster = wrapper.find('.inline-toaster').first();

    toaster.simulate('mouseenter');
    toaster.simulate('mouseleave');

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <InlineToaser clearToaster={() => {}} variant="success" />
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
