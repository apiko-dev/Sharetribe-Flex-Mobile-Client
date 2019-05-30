import React from 'react';
import T from 'prop-types';
import { ViewPropTypes } from 'react-native';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import s from './styles';
import ShadowContainer from '../ShadowContainer/ShadowContainer';

const TabHeader = ({
  onChangeTabIndex,
  currentTabIndex,
  tabs,
  activeTabStyle,
  inactiveTabStyle,
  inactiveTextStyle,
  activeTextStyle,
  containerTabStyle,
}) => {
  function getActiveStyle(index, style) {
    return currentTabIndex === index && style;
  }

  return (
    <ShadowContainer style={[s.container, containerTabStyle]}>
      {tabs.map((tab, index) => (
        <Touchable
          style={[
            s.button,
            inactiveTabStyle,
            getActiveStyle(index, [s.active, activeTabStyle]),
          ]}
          onPress={() => onChangeTabIndex(index)}
          key={tab.id}
        >
          <Text
            key={tab.text}
            xmediumSize
            bold
            gray
            style={[
              inactiveTextStyle,
              getActiveStyle(index, [s.activeText, activeTextStyle]),
            ]}
          >
            {tab.text}
          </Text>
        </Touchable>
      ))}
    </ShadowContainer>
  );
};

TabHeader.propTypes = {
  onChangeTabIndex: T.func,
  currentTabIndex: T.number,
  tabs: T.array,
  activeTabStyle: ViewPropTypes.style,
  inactiveTabStyle: ViewPropTypes.style,
  inactiveTextStyle: ViewPropTypes.style,
  activeTextStyle: ViewPropTypes.style,
  containerTabStyle: ViewPropTypes.style,
};

export default TabHeader;
