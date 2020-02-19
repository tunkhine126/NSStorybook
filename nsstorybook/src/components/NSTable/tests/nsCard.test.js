/**
 *
 * Tests for NSCard
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import NSCard from '../nsCard';

describe('<NSCard />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <DndProvider backend={HTML5Backend}>
          <NSCard
            moveCard={() => {}}
            findCard={() => 0}
            id="6"
            index={0}
            label="Test Card"
          />
        </DndProvider>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <DndProvider backend={HTML5Backend}>
          <NSCard
            moveCard={() => {}}
            findCard={() => 0}
            id="6"
            index={0}
            label="Test Card"
          />
        </DndProvider>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
