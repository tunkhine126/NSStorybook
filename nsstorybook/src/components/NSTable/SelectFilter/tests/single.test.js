/**
 *
 * Tests for SingleSelect
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import SingleSelect from '../single';
import {
  NSFiltersProviderTest,
  NSFiltersProviderTestCalendar,
} from '../../tests/index.test';

describe('<SingleSelect />', () => {
  const label = 'Community';
  const selected = 'all-time';

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <SingleSelect
            label={label}
            selected={selected}
            handleChange={() => {}}
            singleOptions={[]}
          />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Select Date Options and not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFiltersProviderTestCalendar>
          <SingleSelect
            label={label}
            selected={selected}
            handleChange={() => {}}
            singleOptions={[]}
          />
        </NSFiltersProviderTestCalendar>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <NSFiltersProviderTest>
          <SingleSelect
            label={label}
            selected={selected}
            handleChange={() => {}}
            singleOptions={[]}
          />
        </NSFiltersProviderTest>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
