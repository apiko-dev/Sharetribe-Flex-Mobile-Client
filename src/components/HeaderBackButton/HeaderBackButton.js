import React from 'react';
import IconFonts from '../IconFonts/IconFonts';
import { colors } from '../../styles';
import s from './styles';

const HeaderBackButton = () => (
  <IconFonts
    name="baseline-arrow_back-24px"
    tintColor={colors.header.backButton}
    size={25}
    style={s.button}
  />
);

export default HeaderBackButton;
