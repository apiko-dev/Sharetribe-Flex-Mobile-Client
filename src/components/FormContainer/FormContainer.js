import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import T from 'prop-types';
import s from './styles';
import Text from '../Text/Text';
import TextTouchable from '../TextTouchable/TextTouchable';

const FormContainer = ({
  children,
  headerTitle,
  headerTitleTextTouchable,
  headerOnPressTextTouchable,
  containerStyle,
  formContainerStyle,
  headerStyle,
}) => (
  <React.Fragment>
    <View style={[s.header, headerStyle]}>
      {!!headerTitle && (
        <Text xmediumSize bold>
          {headerTitle}
        </Text>
      )}
      {!!headerTitleTextTouchable && (
        <TextTouchable onPress={headerOnPressTextTouchable}>
          {headerTitleTextTouchable}
        </TextTouchable>
      )}
    </View>
    <View
      style={[
        s.formContainer,
        s.firstShadowContainer,
        formContainerStyle,
      ]}
    >
      <View style={[s.secondShadowContainer, containerStyle]}>
        {children}
      </View>
    </View>
  </React.Fragment>
);

FormContainer.propTypes = {
  children: T.any,
  headerTitle: T.string,
  headerTitleTextTouchable: T.string,
  headerOnPressTextTouchable: T.func,
  containerStyle: ViewPropTypes.style,
  formContainerStyle: ViewPropTypes.style,
  headerStyle: ViewPropTypes.style,
};

export default FormContainer;
