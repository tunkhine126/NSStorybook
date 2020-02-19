/**
 *
 * Tests for Helper
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { ftSwitch } from '../helper';
import { RecipientViewProvider } from '../../context';
import { FieldsProvider } from '../../context/fields';

describe('ftSwitch()', () => {
  const field = {
    contexts: { us_en: { label: 'Wake Up Time' } },
    field_type: 'time',
    name: 'wake_up_time',
    option_values: null,
  };
  const paragraphField = {
    contexts: { us_en: { label: 'Name' } },
    field_type: 'paragraph_text',
    name: 'paragraph_text',
    option_values: null,
  };
  const shortTextField = {
    contexts: { us_en: { label: 'Last' } },
    field_type: 'short_text',
    name: 'short_text',
    option_values: null,
  };
  const numberField = {
    contexts: { us_en: { label: 'Age' } },
    field_type: 'number',
    name: 'number',
    option_values: null,
  };

  const rData = {
    currentValue: {
      wake_up_time: {
        item: '',
      },
    },
    dates: {},
    times: {},
  };

  const data = {
    name: 'Test',
    avatarUrl: null,
    internalId: '3erf23-r323d-gewf3-233',
    children: [],
    customFields: {
      uuid: '1c91d190-f5c8-11e9-a1ad-22000be1c01d',
      name: 'Jack Fresh',
      wake_up_time: null,
    },
  };

  const props = {
    data,
    profileDetails: {
      recipientName: 'Country',
      childRecipients: 'Communities',
    },
    match: {
      isExact: true,
      params: { id: '07c538ec-f5c8-11e9-a1ad-22000be1c01d' },
      path: '/families/family-list/family/:id',
      url: '/families/family-list/family/07c538ec-f5c8-11e9-a1ad-22000be1c01d',
    },
    rdData: {},
    tabChange: () => {},
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <RecipientViewProvider {...props} primaryRecipient>
          <FieldsProvider>
            {ftSwitch(field, data, 1, rData, () => {}, () => {}, () => {})}
          </FieldsProvider>
        </RecipientViewProvider>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should Render Short Text Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <RecipientViewProvider {...props} primaryRecipient>
          <FieldsProvider>
            {ftSwitch(
              shortTextField,
              data,
              1,
              rData,
              () => {},
              () => {},
              () => {}
            )}
          </FieldsProvider>
        </RecipientViewProvider>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should Render Number Field', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <RecipientViewProvider {...props} primaryRecipient>
          <FieldsProvider>
            {ftSwitch(
              numberField,
              data,
              1,
              rData,
              () => {},
              () => {},
              () => {}
            )}
          </FieldsProvider>
        </RecipientViewProvider>
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <RecipientViewProvider {...props} primaryRecipient={false}>
          <FieldsProvider>
            {ftSwitch(
              paragraphField,
              data,
              1,
              rData,
              () => {},
              () => {},
              () => {}
            )}
          </FieldsProvider>
        </RecipientViewProvider>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
