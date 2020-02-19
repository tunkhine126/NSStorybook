/**
 *
 * Tests for PaginationControls
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
import PaginationControls from '../paginationControls';

Enzyme.configure({ adapter: new Adapter() });

describe('<PaginationControls />', () => {
  const wrapper = mount(
    <TestingComponent>
      <PaginationControls
        count={20}
        page={1}
        rowsPerPage={5}
        resultCount={50}
        currentPage={1}
        totalPages={1}
        onChangePage={() => {}}
      />
    </TestingComponent>
  );

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <PaginationControls
          count={100}
          page={0}
          currentPage={1}
          totalPages={1}
          rowsPerPage={15}
          resultCount={50}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Click the next arrow without errors', () => {
    const spy = jest.spyOn(global.console, 'error');
    const nextBtn = wrapper.find('button#next-btn').first();
    nextBtn.simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });

  it('Click the prev arrow without errors', () => {
    const spy = jest.spyOn(global.console, 'error');
    const prevBtn = wrapper.find('button#prev-btn').first();
    prevBtn.simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });

  it('Manually change the page from input without errors', () => {
    const spy = jest.spyOn(global.console, 'error');
    const inputBox = wrapper.find('input#page-input').first();

    inputBox.simulate('change', { target: { value: 2 } });
    inputBox.simulate('change', { target: { value: -1 } });

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <PaginationControls
          count={100}
          page={0}
          currentPage={1}
          totalPages={1}
          rowsPerPage={15}
          resultCount={50}
        />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
