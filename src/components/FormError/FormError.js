import React from 'react';
import { ViewPropTypes } from 'react-native';
import { Text } from '..';
import T from 'prop-types';
import s from './styles';

const FormError = ({ showError, error, textStyle, ...props }) => (
  <React.Fragment>
    {showError && (
      <Text style={[s.text, textStyle]} red {...props} smallSize>
        {error}
      </Text>
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
