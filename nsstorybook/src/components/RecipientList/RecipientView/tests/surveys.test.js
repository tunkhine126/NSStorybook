/**
 *
 * Tests for Surveys
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import Surveys from '../surveys';
import { RecipientViewProvider } from '../context';

describe('<Surveys />', () => {
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
      recipientDefinition: {
        customFields: [],
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

  const componentProps = {
    location: {
      search: 'tab=4&name=Demo%20Intagke&date=2019-10-01T16:58:28Z',
    },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <RecipientViewProvider {...props} primaryRecipient>
          <Surveys {...componentProps} />
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
          <Surveys {...componentProps} />
        </RecipientViewProvider>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
