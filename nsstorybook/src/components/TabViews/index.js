/**
 *
 * TabViews
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import Header from './header';
import { ComponentStyle, TabContentStyle } from './styles';

function TabViews({
  data,
  btns,
  tabValues,
  currentTabValue,
  tabChange,
  tabViews,
  indexChange,
}) {
  return (
    <ComponentStyle>
      <Header
        value={currentTabValue}
        data={data}
        tabChange={tabChange}
        tabValues={tabValues}
        btns={btns}
      />

      <TabContentStyle>
        <SwipeableViews onChangeIndex={indexChange}>
          {tabViews[currentTabValue]}
        </SwipeableViews>
      </TabContentStyle>
    </ComponentStyle>
  );
}

TabViews.propTypes = {
  currentTabValue: PropTypes.number.isRequired,
  tabChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  tabValues: PropTypes.array.isRequired,
  indexChange: PropTypes.func.isRequired,
  tabViews: PropTypes.array.isRequired,
  btns: PropTypes.element,
};
export default TabViews;
