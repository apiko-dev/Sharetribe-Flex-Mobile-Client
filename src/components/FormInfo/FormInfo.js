import React from 'react';
import {
  View,
  ViewPropTypes,
  TouchableWithoutFeedback,
} from 'react-native';
import T from 'prop-types';
import Text from '../Text/Text';
import s from './styles';

const FormInfo = ({
  showInfo,
  message,
  textStyle,
  onHideFormInfo,
  ...props
}) => (
  <React.Fragment>
    {showInfo && (
      <TouchableWithoutFeedback onPress={onHideFormInfo}>
        <View style={s.container}>
          <View style={s.messageContainer}>
            <Text
              style={[s.text, textStyle]}
              gray
              {...props}
              smallSize
            >
              {message}
            </Text>
          </View>
          <View style={s.triangle} />
        </View>
      </TouchableWithoutFeedback>
    )}
  </React.Fragment>
);

FormInfo.propTypes = {
  children: T.any,
  textStyle: ViewPropTypes.style,
  showInfo: T.bool,
  message: T.any,
  onHideFormInfo: T.func,
};

export default FormInfo;
