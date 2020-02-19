/**
 *
 * Tests for Photo
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import TestingComponent from 'components/shared/Testing';
import Photo from '../photo';

describe('<Photo />', () => {
  it('Expect no errors rending Photo component', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <Photo field="photo" label="Photo Test" />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <Photo field="photo" label="Photo Test" />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
