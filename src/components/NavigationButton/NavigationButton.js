import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import NavigationService from '../../services/NavigationService';
import Touchable from '../Touchable/Touchable';
import IconFonts from '../IconFonts/IconFonts';
import s from './styles';
import { colors } from '../../styles';

const NavigationButton = ({
  name,
  onPress,
  tintColor,
  right,
  goBack,
  circled,
}) => (
  <Touchable
    style={[s.buttonContainer, right ? s.right : s.left]}
    onPress={() => (goBack ? NavigationService.goBack() : onPress())}
    borderless
  >
    <View style={[s.containerIcon, circled && s.circled]}>
      <IconFonts
        name={goBack ? 'back' : name}
        tintColor={tintColor}
        size={25}
        style={s.icon}
      />
    </View>
  </Touchable>
);

NavigationButton.propTypes = {
  name: T.string,
  onPress: T.func,
  tintColor: T.string,
  right: T.bool,
  goBack: T.bool,
  circled: T.bool,
};

export default NavigationButton;
