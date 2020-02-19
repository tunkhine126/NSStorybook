/**
 *
 * Tests for Fields
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import TestingComponent from 'components/shared/Testing';
import Fields from '../fields';

describe('<Fields />', () => {
  const fields = [
    {
      contexts: { us_en: { label: 'Ocupación' } },
      field_type: 'single_select',
      grouping: 'Work',
      name: 'occupation',
      on_create: 'show',
      on_update: 'show',
      option_values: [
        'None',
        'Taxi Driver',
        'Farmer',
        'Construction Worker',
        'Cook',
        'Cleaner',
        'Other',
      ],
      position: 1,
    },
  ];

  const fields2 = [
    {
      contexts: { us_en: { label: 'Name' } },
      field_type: 'short_test',
      grouping: 'Person',
      name: 'name',
      on_create: 'show',
      on_update: 'show',
      option_values: null,
      position: 1,
    },
  ];

  it('Expect no errors rending Fields component', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Fields fields={fields} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render required field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Fields
          fields={fields}
          fieldsRequired
          showPreFixId
          preFixSeparator="-"
          parentInternalId="test-component"
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
        <Fields fields={fields2} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
