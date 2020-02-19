/**
 *
 * Tests for TabContent
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import TabContent from '../tabContent';
import { RecipientViewProvider } from '../context';

describe('<TabContent />', () => {
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

  const details = {
    addRecipientName: 'New Country',
    columns: [
      {
        id: 'recipientName',
        defaultWidth: '380px',
        label: 'Family',
        align: 'left',
        type: 'single',
        columnData: null,
        noData: false,
        disablePadding: true,
        show: true,
        sortable: true,
        defaultFilter: false,
        filter: false,
        custom: false,
      },
      {
        id: 'id',
        defaultWidth: '450px',
        label: 'Family ID',
        align: 'left',
        type: 'single',
        columnData: null,
        noData: false,
        disablePadding: false,
        show: true,
        sortable: true,
        filter: false,
        defaultFilter: false,
        custom: false,
      },
      {
        id: 'completedSurveys',
        defaultWidth: '123px',
        type: 'multi',
        label: 'Completed Surveys',
        filterWidth: 170,
        align: 'center',
        columnData: null,
        disablePadding: true,
        noData: false,
        show: true,
        sortable: false,
        filter: true,
        defaultFilter: true,
        custom: false,
      },
      {
        id: 'childRecipients',
        defaultWidth: '100px',
        type: 'multi',
        label: 'Family Members',
        align: 'center',
        columnData: null,
        noData: false,
        disablePadding: true,
        show: true,
        sortable: false,
        filter: false,
        defaultFilter: false,
        custom: false,
      },
      {
        id: 'parentRecipients',
        type: 'levels',
        label: 'Community',
        filterWidth: 150,
        align: 'center',
        noData: false,
        columnData: null,
        disablePadding: true,
        sortable: false,
        show: true,
        filter: true,
        noColumn: true,
        defaultFilter: true,
        custom: false,
      },
      {
        id: 'lastUpdate',
        defaultWidth: '180px',
        type: 'date',
        label: 'Last Update',
        filterWidth: 150,
        align: 'center',
        columnData: null,
        noData: true,
        disablePadding: true,
        show: true,
        sortable: true,
        filter: true,
        defaultFilter: true,
        custom: false,
      },
    ],
    title: 'Countries',
    recipientDefintionUuid: '60577bb8-5641-11e9-9966-22000bd4493b',
    childRoutes: [],
    hierarchyId: 3,
    hasParentRecipient: false,
    nestedRecipientTree: [],
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <TestingComponent>
        <RecipientViewProvider {...props} primaryRecipient>
          <TabContent value={0} details={details} indexChange={() => {}} />
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
          <TabContent value={0} details={details} indexChange={() => {}} />
        </RecipientViewProvider>
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
