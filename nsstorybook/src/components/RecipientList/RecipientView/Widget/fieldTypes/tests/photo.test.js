/**
 *
 * Tests for Photo
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import Photo from '../photo';
import { FieldsProvider } from '../../../context/fields';

describe('<Photo />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <FieldsProvider>
          <Photo
            values={{ license_photo: '' }}
            field={{
              name: 'license_photo',
              contexts: {
                us_en: {
                  label: 'License Photo',
                },
              },
            }}
            label="License Photo"
            recipientData={{ photos: { license_photo: '' } }}
          />
        </FieldsProvider>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <FieldsProvider>
          <Photo
            values={{ license_photo: '' }}
            field={{
              name: 'license_photo',
              contexts: {
                us_en: {
                  label: 'License Photo',
                },
              },
            }}
            label="License Photo"
            editMode
            recipientData={{ photos: { license_photo: '' } }}
          />
        </FieldsProvider>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
