import React from 'react';
import { View, TextInput } from 'react-native';

import { colors } from '../../../../styles';
import { IconFonts } from '../../../../components';
import s from './styles';

const Input = (props) => (
  <View style={s.containerInput}>
    <TextInput {...props} style={s.textInput} />
    <IconFonts
      name="send"
      size={25}
      style={s.send}
      tintColor={colors.icon.tintColorOrange}
      // onPress={props.onSend}
    />
  </View>
);

export default Input;
