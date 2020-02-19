/**
 *
 * Tests for NSMultiSelect
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import NSMultiSelect from '../index';

describe('<NSMultiSelect />', () => {
  const colors = ['red', 'green', 'blue'];

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <NSMultiSelect
        values={{ item: [] }}
        items={colors}
        update={() => {}}
        label="message"
      />
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <NSMultiSelect
        values={{ item: [] }}
        items={colors}
        update={() => {}}
        label="Message"
      />
    );
    expect(firstChild).toMatchSnapshot();
  });
});
