import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import i18n from '../../i18n';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import s from './styles';

const TabHeader = ({ onChangeTabIndex, currentTabIndex }) => (
  <View style={s.container}>
    <Touchable
      style={[s.button, currentTabIndex === 0 && s.active]}
      onPress={() => onChangeTabIndex(0)}
    >
      <Text mediumSize orange>
        {i18n.t('addNewItem.description')}
      </Text>
    </Touchable>
    <Touchable
      style={[s.button, currentTabIndex === 1 && s.active]}
      onPress={() => onChangeTabIndex(1)}
    >
      <Text mediumSize orange>
        {i18n.t('addNewItem.reviews')}
      </Text>
    </Touchable>
  </View>
);

TabHeader.propTypes = {
  onChangeTabIndex: T.func,
  currentTabIndex: T.number,
};

export default TabHeader;
