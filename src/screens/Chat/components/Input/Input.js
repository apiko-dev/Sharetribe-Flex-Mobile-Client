import React from 'react';
import { View, TextInput } from 'react-native';

import { colors } from '../../../../styles';
import { IconFonts, Touchable } from '../../../../components';
import s from './styles';

const Input = ({ onSend, ...props }) => (
  <View style={s.containerInput}>
    <TextInput {...props} style={s.textInput} />
    <Touchable onPress={onSend} style={s.send}>
      <IconFonts
        name="send"
        size={25}
        tintColor={colors.icon.tintColorOrange}
      />
    </Touchable>
  </View>
);

export default Input;
