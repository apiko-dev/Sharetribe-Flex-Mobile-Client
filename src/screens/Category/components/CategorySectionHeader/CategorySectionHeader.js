import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { Text, Touchable, IconFonts } from '../../../../components';
import s from './styles';
import { colors } from '../../../../styles';

const CategorySectionHeader = ({
  title,
  showCategoriesAsButton,
  onPress,
}) => (
  <Touchable disabled={!showCategoriesAsButton} onPress={onPress}>
    <View style={s.header}>
      {showCategoriesAsButton && (
        <IconFonts
          name="left"
          tintColor={colors.categoryScreen.icon}
          size={30}
        />
      )}
      <Text xmediumSize>{title}</Text>
    </View>
  </Touchable>
);

CategorySectionHeader.propTypes = {
  title: T.string,
  showCategoriesAsButton: T.bool,
  onPress: T.func,
};

export default CategorySectionHeader;
