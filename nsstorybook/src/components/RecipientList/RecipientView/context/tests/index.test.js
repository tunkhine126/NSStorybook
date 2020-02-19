/**
 *
 * Tests for RecipientViewProvider
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { RecipientViewProvider } from '../index';

describe('<RecipientViewProvider />', () => {
  const props = {
    profileDetails: {
      recipientName: 'Country',
      childRecipients: 'Communities',
    },
    data: {},
    rdData: {},
    match: {
      path: '/recipients/family-list/family/:id',
      url:
        '/recipients/family-list/family/07c538ec-f5c8-11e9-a1ad-22000be1c01d',
      isExact: true,
      params: {
        id: '07c538ec-f5c8-11e9-a1ad-22000be1c01d',
      },
    },
    tabChange: () => {},
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <TestingComponent>
        <RecipientViewProvider {...props} primaryRecipient>
          <div>Test Field</div>
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
          <div>Test Field</div>
        </RecipientViewProvider>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
