import React from 'react';
import { browserHistory } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';

import configureStore from 'configureStore';
import TestingComponent from 'components/shared/Testing';
import history from 'utils/history';
import App from '../index';

const renderer = new ShallowRenderer();

describe('<App />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    renderer.render(
      <TestingComponent>
        <App store={store} history={history} />
      </TestingComponent>
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
