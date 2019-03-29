import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import i18n from '../../i18n';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import s from './styles';
import ShadowContainer from '../ShadowContainer/ShadowContainer';

const TabHeader = ({ onChangeTabIndex, currentTabIndex }) => {
  const tabs = [
    {
      text: i18n.t('addNewItem.description'),
    },
    {
      text: i18n.t('addNewItem.reviews'),
    },
  ];

  function getActiveStyle(index, style) {
    return currentTabIndex === index && style;
  }

  return (
    <ShadowContainer style={s.container}>
      {tabs.map((tab, index) => (
        <Touchable
          style={[s.button, getActiveStyle(index, s.active)]}
          onPress={() => onChangeTabIndex(index)}
        >
          <Text
            mediumSize
            style={getActiveStyle(index, s.activeText)}
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
};

export default TabHeader;
