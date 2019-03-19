import React from 'react';
import { View } from 'react-native';
import IconFonts from '../IconFonts/IconFonts';
import s from './styles';
import { colors } from '../../styles';

const Switch = () => (
  <View style={s.container}>
    <View style={s.switch}>
      <View style={s.activeButton}>
        <IconFonts
          name="plitka"
          tintColor={colors.switch.activeIcon}
          size={18}
        />
      </View>
      <View>
        <IconFonts
          name="baseline-map-24px"
          tintColor={colors.switch.icon}
          size={18}
        />
      </View>
    </View>
  </View>
);

export default Switch;
