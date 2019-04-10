import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import T from 'prop-types';
import Text from '../Text/Text';
import IconFonts from '../IconFonts/IconFonts';
import s from './styles';
import { colors } from '../../styles';

const FormError = ({ showError, error, textStyle, ...props }) => (
  <React.Fragment>
    {showError && (
      <View style={s.container}>
        <IconFonts
          name="error"
          size={15}
          tintColor={colors.formError.iconColor}
        />
        <Text style={[s.text, textStyle]} red {...props} xsmallSize>
          {error}
        </Text>
      </View>
    )}
  </React.Fragment>
);

FormError.propTypes = {
  children: T.any,
  textStyle: ViewPropTypes.style,
  showError: T.bool,
  error: T.any,
};

export default FormError;
