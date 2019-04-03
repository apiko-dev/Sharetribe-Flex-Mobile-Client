import React from 'react';
import T from 'prop-types';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import s from './styles';
import ShadowContainer from '../ShadowContainer/ShadowContainer';

const TabHeader = ({ onChangeTabIndex, currentTabIndex, tabs }) => {
  function getActiveStyle(index, style) {
    return currentTabIndex === index && style;
  }

  return (
    <ShadowContainer style={s.container}>
      {tabs.map((tab, index) => (
        <Touchable
          style={[s.button, getActiveStyle(index, s.active)]}
          onPress={() => onChangeTabIndex(index)}
          key={tab.id}
        >
          <Text
            key={tab.text}
            xmediumSize
            style={getActiveStyle(index, s.activeText)}
            bold
            gray
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
};

export default TabHeader;
