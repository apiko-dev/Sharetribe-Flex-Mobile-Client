import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import { withPropsOnChange, compose, withState } from 'recompose';
import s from './styles';

const TabContainer = ({
  selectedTabIndex,
  tabIndex,
  children,
  topOffset,
  shouldRender,
}) => (
  <View
    style={[
      s.container,
      topOffset && { top: topOffset },
      selectedTabIndex === tabIndex ? s.show : s.hide,
    ]}
  >
    {shouldRender && children}
  </View>
);

TabContainer.propTypes = {
  selectedTabIndex: T.number,
  tabIndex: T.number,
  topOffset: T.number,
  children: T.element,
  shouldRender: T.any,
};

const enhancer = compose(
  withState(
    'shouldRender',
    'setShouldRender',
    (props) => !props.lazy,
  ),
  withPropsOnChange(['selectedTabIndex'], (props) => {
    if (
      !props.shouldRender &&
      props.selectedTabIndex === props.tabIndex
    ) {
      props.setShouldRender(true);
    }
  }),
);

export default enhancer(TabContainer);
