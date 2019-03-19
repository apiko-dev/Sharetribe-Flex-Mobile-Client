import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import T from 'prop-types';
import { Touchable, Text, IconFonts } from '../../../../components';
import s from './styles';
import i18n from '../../../../i18n';
import { colors } from '../../../../styles';

const AddPhotoButton = ({
  containerStyle,
  disabled,
  onPress,
  ...props
}) => (
  <View style={[s.container, containerStyle]}>
    <Touchable
      useForeground
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      <View style={s.button}>
        <IconFonts
          name="outline-add_a_photo-24px"
          size={46}
          tintColor={colors.addPhotoButton.iconCamera}
        />
        <Text gray xsmallSize>
          {i18n.t('addNewItem.addPhoto')}
        </Text>
      </View>
    </Touchable>
  </View>
);

AddPhotoButton.propTypes = {
  containerStyle: ViewPropTypes.style,
  disabled: T.bool,
  onPress: T.func,
};

export default AddPhotoButton;
