/**
 *
 * Tests for TableViews
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import TableViews from '../tableViews';
import messages from '../messages';

describe('<TableViews />', () => {
  const options = [
    { name: 'Default', id: 0 },
    { name: 'Ahuachapan Quarterly Audit', id: 1 },
    { name: 'Year-End Report', id: 2 },
  ];
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <TableViews options={options} messages={messages} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <TableViews options={options} messages={messages} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
