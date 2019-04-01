import React from 'react';
import { View, TextInput } from 'react-native';
import T from 'prop-types';
import s from './styles';
import { IconFonts } from '../../../../components';
import { colors } from '../../../../styles';

const SearchInput = ({
  value,
  onChangeText,
  placeholder,
  ...props
}) => (
  <View style={s.container}>
    <IconFonts
      name="search"
      size={22}
      tintColor={colors.searchInput.icon}
      style={[s.icon, s.iconSearch]}
    />
    <TextInput
      value={value}
      onChangeText={(text) => onChangeText(text)}
      placeholder={placeholder}
      style={s.input}
      {...props}
    />
    {!!value && (
      <IconFonts
        name="close"
        size={22}
        tintColor={colors.searchInput.icon}
        style={s.icon}
        onPress={() => onChangeText('')}
      />
    )}
  </View>
);

SearchInput.propTypes = {
  value: T.string,
  onChangeText: T.func,
  placeholder: T.string,
};

export default SearchInput;
