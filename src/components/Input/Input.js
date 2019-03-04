import React from 'react';
import { View, Text, TextInput } from 'react-native';
import T from 'prop-types';
import s from './styles';

const Input = ({
  value,
  onChangeText,
  placeholder,
  title,
  error,
  containerStyle,
  inputStyle,
  ...props
}) => (
  <View style={[s.container, containerStyle]}>
    <View style={s.inputContainer}>
      <Text style={s.inputTitle}>{title}</Text>
      <TextInput
        style={[s.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...props}
      />
    </View>
    {error && <Text>{error.message}</Text>}
  </View>
);

Input.propTypes = {
  value: T.string,
  onChangeText: T.func,
  placeholder: T.string,
  title: T.string,
  error: T.object,
  containerStyle: T.any,
  inputStyle: T.any,
};

export default Input;
