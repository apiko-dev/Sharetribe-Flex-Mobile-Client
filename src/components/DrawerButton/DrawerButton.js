import React from 'react';
import IconFonts from '../IconFonts/IconFonts';
import Touchable from '../Touchable/Touchable'; // eslint-disable-line
import { colors } from '../../styles';
import s from './styles';
import { NavigationService } from '../../services';

const DrawerButton = () => (
  <Touchable
    style={s.button}
    onPress={() => NavigationService.openDrawer()}
  >
    <IconFonts
      name="menu"
      tintColor={colors.header.drawerButton}
      size={25}
    />
  </Touchable>
);

export default DrawerButton;
