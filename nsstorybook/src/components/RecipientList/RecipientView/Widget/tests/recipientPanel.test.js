/**
 *
 * Tests for data
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import RecipientPanel from '../recipientPanel';
import { RecipientViewProvider } from '../../context';

describe('<RecipientPanel />', () => {
  const props = {
    profileDetails: {
      recipientName: 'Country',
      childRecipients: 'Communities',
    },
    data: {
      name: 'Test',
      avatarUrl: null,
      internalId: '3erf23-r323d-gewf3-233',
      children: [],
      customFields: {
        uuid: '1c91d190-f5c8-11e9-a1ad-22000be1c01d',
        name: 'Jack Fresh',
        wake_up_time: null,
      },
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
          <RecipientPanel
            name="Jamie"
            type="Father"
            data={{}}
            customFields={[]}
          />
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
          <RecipientPanel
            name="Jamie"
            type="Father"
            data={{}}
            customFields={[]}
          />
        </RecipientViewProvider>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
