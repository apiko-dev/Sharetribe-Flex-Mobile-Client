import React from 'react';
import T from 'prop-types';
import NavigationService from '../../services/NavigationService';

import Touchable from '../Touchable/Touchable';
import IconFonts from '../IconFonts/IconFonts';
import s from './styles';
import { colors } from '../../styles';

const NavigationButton = ({
  name,
  onPress,
  color,
  right,
  goBack,
  circled,
}) => (
  <Touchable
    style={[
      s.buttonContainer,
      right ? s.right : s.left,
      circled && s.circled,
    ]}
    onPress={() => (goBack ? NavigationService.goBack() : onPress())}
    borderless
  >
    <IconFonts
      name={goBack ? 'ic-back' : name}
      color={color}
      tintColor={colors.header.backButton}
      size={25}
      style={s.icon}
    />
  </Touchable>
);

NavigationButton.propTypes = {
  name: T.string,
  onPress: T.func,
  color: T.string,
  right: T.bool,
  goBack: T.bool,
  circled: T.bool,
};

export default NavigationButton;
