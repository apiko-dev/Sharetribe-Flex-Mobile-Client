import React from 'react';
import T from 'prop-types';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { colors } from '../../styles';
import s from './styles';
import glyphMap from '../../assets/fonts/icons/selection.json';

const Icons = createIconSetFromIcoMoon(
  glyphMap,
  'ApikoFlex',
  'ApikoFlex.ttf',
);

const FontIcon = ({
  IconSet = Icons,
  size = 16,
  name,
  isDisabled,
  tintColor = colors.icon.tintColorGray,
  disabledColor = colors.icon.tintColorGray,
  style,
  onPress,
}) => (
  <IconSet
    name={name}
    onPress={onPress}
    style={[s.icon, size && { fontSize: size }, style]}
    color={isDisabled ? disabledColor : tintColor}
    suppressHighlighting={false}
    hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
  />
);

FontIcon.propTypes = {
  name: T.string,
  onPress: T.func,
  style: T.any,
  size: T.number,
  IconSet: T.any,
  tintColor: T.string,
  disabledColor: T.string,
  isDisabled: T.bool,
};

export default FontIcon;
