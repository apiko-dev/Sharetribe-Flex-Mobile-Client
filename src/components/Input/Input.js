import React from 'react';
import T from 'prop-types';
import R from 'ramda';
import { View } from 'react-native';
import _ from 'lodash';
import { Field } from '../Field/Field';
import s from './styles';
import FormError from '../FormError/FormError';
import InputForm from '../InputForm/InputForm';

const FormInput = (props) => {
  const Input = InputForm;

  return (
    <View>
      <View
        style={[
          s.container,
          !R.isNil(props.value) &&
            !R.isEmpty(props.value) &&
            s.inputFilled,
          props.isError && s.inputError,
        ]}
      >
        <View
          style={[
            s.formContainer,
            props.containerStyle,
            !props.noBorder && s.borderBottom,
          ]}
        >
          <Input {...props} value={props.value} />
        </View>
      </View>
      <FormError showError={props.isError} error={props.error} />
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
  inputStyle: T.any,
  containerStyle: T.any,
  labelContainerStyle: T.any,
  labelStyle: T.any,
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
};

export default FormInput;
