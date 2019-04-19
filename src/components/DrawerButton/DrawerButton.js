import React from 'react';
import { Keyboard } from 'react-native';
import IconFonts from '../IconFonts/IconFonts';
import Touchable from '../Touchable/Touchable';
import { colors } from '../../styles';
import s from './styles';
import { NavigationService } from '../../services';

const DrawerButton = () => (
  <Touchable
    style={s.button}
    onPress={() => {
      Keyboard.dismiss();
      NavigationService.openDrawer();
    }}
    borderless
    hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
  >
    <IconFonts
      name="menu"
      tintColor={colors.header.drawerButton}
      size={25}
    />
  </Touchable>
);

export default DrawerButton;
