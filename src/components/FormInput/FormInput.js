/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import T from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import _ from 'lodash';
import Field from '../Field/Field';
import FormError from '../FormError/FormError';
import InputForm from '../InputForm/InputForm';
import s from './styles';

const FormInput = ({
  containerStyle,
  inputContainerStyle,
  isError,
  error,
  inputType,
  onPressIcon,
  iconName,
  ...props
}) => {
  const [secureTextEntryStatus, setSecureTextEntryStatus] = useState(
    inputType === 'password',
  );

  const onPress = () => {
    if (inputType === 'password') {
      setSecureTextEntryStatus(!secureTextEntryStatus);
    }

    return onPressIcon;
  };

  return (
    <View style={[containerStyle]}>
      <InputForm
        {...props}
        value={props.value}
        containerStyle={[
          isError && s.inputError,
          inputContainerStyle,
        ]}
        secureTextEntry={secureTextEntryStatus}
        onPressIcon={onPress}
        iconName={iconName || (inputType === 'password' && 'eye')}
      />
      <FormError showError={isError} error={error} />
    </View>
  );
};

FormInput.Field = ({ name, ...restProps }) => (
  <Field
    type={_.isFunction(restProps.onPress) ? 'touchable' : 'text'}
    name={name}
    {...restProps}
  >
    {(props) => <FormInput {...restProps} {...props} />}
  </Field>
);

FormInput.Field.propTypes = {
  name: T.string.isRequired,
};

FormInput.propTypes = {
  inputStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  labelContainerStyle: ViewPropTypes.style,
  labelStyle: ViewPropTypes.style,
  textInputRef: T.object,
  label: T.string,
  onPress: T.func,
  getValue: T.func,
  placeholderTextColor: T.string,
  noBorder: T.bool,
  chevronRight: T.bool,
  value: T.oneOfType([T.string, T.object]),
  placeholder: T.string,
  isError: T.bool,
  error: T.any,
  inputType: T.string,
  onPressIcon: T.func,
  iconName: T.string,
};

export default FormInput;
