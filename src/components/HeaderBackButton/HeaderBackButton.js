import React from 'react';
import T from 'prop-types';
import IconFonts from '../IconFonts/IconFonts';
import Touchable from '../Touchable/Touchable'; // eslint-disable-line
import { colors } from '../../styles';
import s from './styles';
import { NavigationService } from '../../services';

const HeaderBackButton = ({
  onPress = () => NavigationService.goBack(),
}) => (
  <Touchable style={s.button} onPress={onPress}>
    <IconFonts
      name="baseline-arrow_back-24px"
      tintColor={colors.header.backButton}
      size={25}
    />
  </Touchable>
);

HeaderBackButton.propTypes = {
  onPress: T.func,
};

export default HeaderBackButton;
