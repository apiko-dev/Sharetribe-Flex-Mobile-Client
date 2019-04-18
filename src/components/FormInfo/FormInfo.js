import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import T from 'prop-types';
import Text from '../Text/Text';
import s from './styles';

const FormInfo = ({ showInfo, message, textStyle, ...props }) => (
  <React.Fragment>
    {showInfo && (
      <View style={s.container}>
        <View style={s.messageContainer}>
          <Text style={[s.text, textStyle]} gray {...props} smallSize>
            {message}
          </Text>
        </View>
        <View style={s.triangle} />
      </View>
    )}
  </React.Fragment>
);

FormInfo.propTypes = {
  children: T.any,
  textStyle: ViewPropTypes.style,
  showInfo: T.bool,
  message: T.any,
};

export default FormInfo;
