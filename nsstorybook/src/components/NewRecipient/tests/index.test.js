/**
 *
 * Tests for NewRecipient
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import TestingComponent from 'components/shared/Testing';
import NewRecipient from '../Loadable';

describe('<NewRecipient />', () => {
  const location = {
    search:
      'pId=07c538ec-f5c8-11e9-a1ad-22000be1c01d&rdId=60618bd0-5641-11e9-9966-22000bd4493b',
  };

  const invalidLocation = {
    search:
      'pI=07c538ec-f5c8-11e9-a1ad-22000be1c01d&dId=60618bd0-5641-11e9-9966-22000bd4493b',
  };

  it('Expect no errors rending Fields component', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NewRecipient location={location} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should redirect user to family list', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <TestingComponent>
        <NewRecipient location={invalidLocation} />
      </TestingComponent>
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <TestingComponent>
        <NewRecipient location={location} />
      </TestingComponent>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
