/**
 *
 * Tests for RecipientList
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import TestingComponent from 'components/shared/Testing';
import { render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { generateISODate } from 'utils/helpers';
import RecipientList from '../Loadable';

Enzyme.configure({ adapter: new Adapter() });

describe('<RecipientList />', () => {
  const props = {
    localOrg: {
      value: 'New Story',
      uuid: '5d6d254c-5641-11e9-9966-22000bd4493b',
    },
    details: {
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
    },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <RecipientList {...props} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should click past 7 days option on date filer', () => {
    const spy = jest.spyOn(global.console, 'error');

    const wrapper = mount(
      <TestingComponent>
        <RecipientList {...props} />
      </TestingComponent>
    );

    wrapper
      .find('button[aria-controls="Last Update"]')
      .first()
      .simulate('click');

    wrapper
      .find('input[aria-label="Past 7 days"]')
      .first()
      .simulate('change', { target: { value: generateISODate(7) } });

    // Close Filter
    document.body
      .querySelector('#Last-Update > div[aria-hidden="true"]')
      .click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should click on table views, then close table views', () => {
    const spy = jest.spyOn(global.console, 'error');

    const wrapper = mount(
      <TestingComponent>
        <RecipientList {...props} />
      </TestingComponent>
    );

    wrapper
      .find('button[aria-controls="saved-views"]')
      .first()
      .simulate('click');

    wrapper
      .find('button[aria-controls="table-settings-close"]')
      .first()
      .simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <RecipientList {...props} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
