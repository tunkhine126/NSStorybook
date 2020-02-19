/**
 *
 * Tests for LevelSelect
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import LevelSelect from '../levels';
import { NSFiltersProviderTest } from '../../tests/index.test';

Enzyme.configure({ adapter: new Adapter() });

const data = [
  {
    id: '60786f62-5641-11e9-9966-22000bd4493b',
    name: 'Bolivia',
    toggled: true,
    checked: false,
    children: [],
  },
];

const filterQueryTriggers = {
  parentRecipients: () => {},
};

describe('<LevelSelect />', () => {
  const wrapper = mount(
    <TestingComponent>
      <NSFiltersProviderTest>
        <LevelSelect
          id="parentRecipients"
          filterData={data}
          filterQueryTriggers={filterQueryTriggers}
        />
      </NSFiltersProviderTest>
    </TestingComponent>
  );

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <LevelSelect
            id="parentRecipients"
            filterData={data}
            filterQueryTriggers={filterQueryTriggers}
          />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Click the first checkbox without errors', () => {
    const spy = jest.spyOn(global.console, 'error');

    const firstCheckbox = wrapper
      .find('.levels-component-tree .MuiCheckbox-root [type="checkbox"]')
      .first();

    firstCheckbox.simulate('change', { target: { checked: true } });
    expect(spy).not.toHaveBeenCalled();
  });

  it('Click the first checkbox accorion without errors', () => {
    const spy = jest.spyOn(global.console, 'error');

    const firstAccordion = wrapper
      .find('.levels-component-tree .levels-accordion')
      .first();

    // First Click toggle on
    firstAccordion.simulate('click');
    // Second Click toggle off
    firstAccordion.simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });

  it('Clicks reset without errors', () => {
    const spy = jest.spyOn(global.console, 'error');

    const resetBtn = wrapper.find('button.levels-reset').first();
    resetBtn.simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <LevelSelect
            id="parentRecipients"
            filterData={data}
            filterQueryTriggers={filterQueryTriggers}
          />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
