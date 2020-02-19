/**
 *
 * Tests for NSFields
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import TestingComponent from 'components/shared/Testing';
import NSFields from '../index';

describe('<NSFields />', () => {
  const Prefix = () => <p style={{ minWidth: 50 }}>TEST-FAMILY-</p>;
  const singleValues = { item: 'red' };
  const multiValues = { item: ['red'] };
  const items = [{ value: 'blue' }, { value: 'red' }, { value: 'green' }];

  it('Expect no errors rending NSButton', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields
          fieldType="short_text"
          field="shortText"
          label="Short Text"
          position="start"
          showPrefix
          icon={Prefix}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Paragraph Text Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields
          fieldType="paragraph_text"
          field="paragrapTest"
          label="Paragraph Text"
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Number Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields fieldType="number" field="number" label="Number Field" />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Date Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields fieldType="date" field="date" label="Date Field" />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Time Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields fieldType="time" field="time" label="Time Field" />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Single Select Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields
          fieldType="single_select"
          field="singleSelect"
          label="Single Select Field"
          values={singleValues}
          options={items}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Likert Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields
          fieldType="likert"
          field="likert"
          label="Likert Field"
          values={singleValues}
          options={items}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Multi Select Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields
          fieldType="multi_select"
          field="mulitSelect"
          label="Multi Select Field"
          values={multiValues}
          options={items}
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Photo Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields
          fieldType="photo"
          field="photo"
          initialValue="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
          label="Photo Field"
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Audio Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields fieldType="audio" field="audio" label="Audio Field" />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Video Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields fieldType="video" field="video" label="Video Field" />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render Coordinates Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields
          fieldType="coordinates"
          field="coordinates"
          label="Coordinates Field"
        />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render null', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NSFields fieldType="null" field="null" label="null" />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  // it('invoke onDrop when drop event occurs', () => {
  //   const spy = jest.spyOn(global.console, 'error');
  //   const ui = (
  //     <TestingComponent>
  //       <NSFields fieldType="photo" field="photo" label="Photo Field" />
  //     </TestingComponent>
  //   );
  //   const { container } = render(ui);
  //   const file = createFile('dogs.jpg', 500, 'image/jpeg');

  //   const data = mockData([file]);
  //   const dropzone = container.querySelector('.dropzone');

  //   function dispatchEvt(node, type, d) {
  //     const event = new Event(type, { bubbles: true });
  //     Object.assign(event, d);
  //     fireEvent(node, event);
  //   }

  //   function mockData(files) {
  //     return {
  //       dataTransfer: {
  //         files,
  //         items: files.map(f => ({
  //           kind: 'file',
  //           type: f.type,
  //           getAsFile: () => f,
  //         })),
  //         types: ['Files'],
  //       },
  //     };
  //   }

  //   function createFile(name, size, type) {
  //     const f = new File([], name, { type });
  //     Object.defineProperty(f, 'size', {
  //       get() {
  //         return size;
  //       },
  //     });
  //     return f;
  //   }

  //   act(() => {
  //     dispatchEvt(dropzone, 'drop', data);
  //   });

  //   expect(spy).not.toHaveBeenCalled();
  // });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <NSFields
          fieldType="short_text"
          field="shortText"
          label="Short Text"
          position="start"
          showPrefix
          icon={Prefix}
        />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
