/**
 *
 * Tests for Horiz
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import Search from '@material-ui/icons/Search';

import TestingComponent from 'components/shared/Testing';
import Horiz from '../Loadable';

describe('<Horiz />', () => {
  const horizActions = [
    {
      route: '/survey-requests',
      icon: Search,
      text: 'Get Surveys',
    },
    {
      route: '/survey-requests/edit',
      icon: Search,
      text: 'Edit Surveys',
    },
    {
      route: '/update-status',
      icon: Search,
      text: 'Update Status',
    },
  ];

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Horiz id="1" actions={horizActions} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Horiz id="2" actions={horizActions} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
