import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import T from 'prop-types';
import s from './styles';
import i18n from '../../i18n';
import TextTouchable from '../TextTouchable/TextTouchable';
import Text from '../Text/Text';

const DetailsTabView = ({ text, setVisible, isVisible, style }) => (
  <View style={[s.container, style]}>
    <Text>{text}</Text>
    {isVisible ? (
      <TextTouchable onPress={setVisible} style={s.moreButton}>
        {i18n.t('common.less')}
      </TextTouchable>
    ) : (
      <TextTouchable onPress={setVisible} style={s.moreButton}>
        {i18n.t('common.more')}
      </TextTouchable>
    )}
  </View>
);

DetailsTabView.propTypes = {
  text: T.string,
  isVisible: T.bool,
  setVisible: T.func,
  style: ViewPropTypes.style,
};

export default DetailsTabView;
