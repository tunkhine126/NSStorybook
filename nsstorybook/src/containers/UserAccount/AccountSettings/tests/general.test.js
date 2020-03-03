/**
 *
 * Tests for General
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import TestingComponent from 'components/shared/Testing';
import General from '../general';

describe('<General />', () => {
  const props = {
    data: {
      viewer: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
      },
    },
    state: {
      orgsState: [
        { name: 'Test Org', uuid: '2214-4124-241-4124' },
        { name: 'Brandons Org', uuid: '4744-236-23555-2789' },
      ],
    },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <General {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <General {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
