import React from 'react';
import { View, Text, TextInput } from 'react-native';
import T from 'prop-types';

const Input = ({
  value,
  onChaneText,
  placeholder,
  title,
  error,
  ...props
}) => (
  <View>
    <View>
      <Text>{title}</Text>
      <TextInput
        value={value}
        onChaneText={onChaneText}
        placeholder={placeholder}
        {...props}
      />
    </View>
    {error && <Text>{error.message}</Text>}
  </View>
);

Input.propTypes = {
  value: T.string,
  onChaneText: T.func,
  placeholder: T.string,
  title: T.string,
  error: T.object,
};

export default Input;
