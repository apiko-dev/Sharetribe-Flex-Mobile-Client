import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';

const FormContainer = ({ children }) => (
  <View style={[s.container, s.firstShadowContainer]}>
    <View style={[s.secondShadowContainer]}>{children}</View>
  </View>
);

FormContainer.propTypes = {
  children: T.any,
};

export default FormContainer;
