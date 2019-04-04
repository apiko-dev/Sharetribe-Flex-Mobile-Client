import React from 'react';
import T from 'prop-types';
import IconFonts from '../IconFonts/IconFonts';
import Touchable from '../Touchable/Touchable';
import { colors } from '../../styles';
import s from './styles';
import { NavigationService } from '../../services';

const HeaderBackButton = ({
  onPress = () => NavigationService.goBack(),
}) => (
  <Touchable
    style={s.button}
    onPress={onPress}
    borderless
    hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
  >
    <IconFonts
      name="back"
      tintColor={colors.header.backButton}
      size={25}
    />
  </Touchable>
);

HeaderBackButton.propTypes = {
  onPress: T.func,
};

export default HeaderBackButton;
