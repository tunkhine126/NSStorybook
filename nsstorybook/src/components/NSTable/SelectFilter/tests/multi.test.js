/**
 *
 * Tests for MultiSelect
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mountWithIntl, loadTranslation } from 'enzyme-react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import MultiSelect from '../multi';
import { NSFiltersProviderTest } from '../../tests/index.test';

Enzyme.configure({ adapter: new Adapter() });
loadTranslation('/app/translations/langs.json');

describe('<MultiSelect />', () => {
  const label = 'Completed Surveys';
  const data = [
    {
      id: 'fef3f-2r223-vrb423',
      label: 'Test Filter',
      count: 1,
      selected: false,
    },
  ];

  const filterQueryTriggers = {
    completedSurveys: () => {},
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <MultiSelect
            label={label}
            id="completedSurveys"
            data={data}
            filterQueryTriggers={filterQueryTriggers}
          />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Click the first checkbox without errors', () => {
    const spy = jest.spyOn(global.console, 'error');
    const wrapper = mountWithIntl(
      <NSFiltersProviderTest>
        <MultiSelect
          label={label}
          id="completedSurveys"
          data={data}
          filterQueryTriggers={filterQueryTriggers}
        />
      </NSFiltersProviderTest>
    );
    const firstCheckbox = wrapper
      .find('.multi-checkbox .MuiCheckbox-root [type="checkbox"]')
      .first();

    firstCheckbox.simulate('change', { target: { checked: true } });
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <MultiSelect
            label={label}
            id="completedSurveys"
            data={data}
            filterQueryTriggers={filterQueryTriggers}
          />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
