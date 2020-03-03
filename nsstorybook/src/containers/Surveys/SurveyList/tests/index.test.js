/**
 *
 * Tests for SurveyList
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
import SurveyList from '../Loadable';

Enzyme.configure({ adapter: new Adapter() });

describe('<SurveyList />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <SurveyList />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should click past 7 days option on date filer', () => {
    const spy = jest.spyOn(global.console, 'error');

    const wrapper = mount(
      <TestingComponent>
        <SurveyList />
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
        <SurveyList />
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
        <SurveyList />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
