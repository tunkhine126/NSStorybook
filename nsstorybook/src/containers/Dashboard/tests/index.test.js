import React from 'react';
import { render } from '@testing-library/react';
import TestingComponent from 'components/shared/Testing';

import Dashboard from '../index';
import DashboardLoadable from '../Loadable';

describe('<Dashboard />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Dashboard />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should render and match the snapshot for dashboard lazyload', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <DashboardLoadable />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
