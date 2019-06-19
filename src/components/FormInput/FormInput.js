/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import T from 'prop-types';
import { View, ViewPropTypes, FlatList } from 'react-native';
import _ from 'lodash';
import Field from '../Field/Field';
import FormError from '../FormError/FormError';
import FormInfo from '../FormInfo/FormInfo';
import InputForm from '../InputForm/InputForm';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import s from './styles';
import { payments, dates } from '../../utils';
import { colors } from '../../styles';

const FormInput = ({
  containerStyle,
  inputContainerStyle,
  isError,
  error,
  inputType,
  onPressIcon,
  iconName,
  iconNameLeft,
  onChangeText,
  infoMessage,
  active,
  secureTextEntry,
  validateOnTouched = true,
  ...props
}) => {
  const [secureTextEntryStatus, setSecureTextEntryStatus] = useState(
    inputType === 'password',
  );

  const [infoStatus, setInfoStatus] = useState(false);

  const onChangeTextWithParser = (value) => {
    if (inputType === 'card-number') {
      value = payments.formatCreditCardNumber(value);
    } else if (inputType === 'card-expiration') {
      value = payments.formatExpirationDate(value);
    } else if (inputType === 'card-cvc') {
      value = payments.formatCVC(value);
    } else if (inputType === 'date') {
      value = dates.formatDate(value);
    } else if (inputType === 'month') {
      value = dates.formatMonth(value);
    } else if (inputType === 'year') {
      value = dates.formatYear(value);
    }

    onChangeText(value);
  };

  const onPress = () => {
    if (inputType === 'password') {
      setSecureTextEntryStatus(!secureTextEntryStatus);
    }

    return onPressIcon;
  };

  const onPressIconInInputPlaceholder = () => {
    setInfoStatus(!infoStatus);
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
        secureTextEntry={secureTextEntryStatus || secureTextEntry}
        onPressIcon={onPress}
        iconNameLeft={iconNameLeft}
        iconName={iconName || (inputType === 'password' && 'eye')}
        iconTintColor={
          secureTextEntryStatus
            ? colors.icon.tintColorGray
            : colors.icon.tintColorOrange
        }
        onChangeText={onChangeTextWithParser}
        onPressIconInInputPlaceholder={onPressIconInInputPlaceholder}
        isShowingFormInfo={infoStatus}
        active={active}
      />
      <FormError
        showError={
          (validateOnTouched ? isError : isError || !!error) &&
          !active
        }
        error={error}
      />
      <FormInfo
        message={infoMessage}
        showInfo={infoStatus}
        onHideFormInfo={() => setInfoStatus(false)}
      />
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

FormInput.FieldWithDropDown = ({ name, ...restProps }) => (
  <Field
    type={_.isFunction(restProps.onPress) ? 'touchable' : 'text'}
    name={name}
    {...restProps}
  >
    {(props) => (
      <React.Fragment>
        <FormInput {...restProps} {...props} />
        {props.active && restProps.dropDownList.length !== 0 && (
          <FlatList
            style={s.dropDownList}
            keyExtractor={restProps.keyExtractor}
            data={restProps.dropDownList}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Touchable
                style={s.dropDownListItem}
                onPress={() => {
                  props.onChangeText(item.title);
                  props.onBlur();
                }}
              >
                <Text>{item.title}</Text>
              </Touchable>
            )}
          />
        )}
      </React.Fragment>
    )}
  </Field>
);

FormInput.FieldWithDropDown.propTypes = {
  name: T.string.isRequired,
  active: T.bool,
  dropDownList: T.array,
  onChangeText: T.func,
  onBlur: T.func,
};

FormInput.Field.propTypes = {
  name: T.string.isRequired,
};

FormInput.propTypes = {
  inputStyle: T.any,
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
  validateOnTouched: T.bool,
  active: T.bool,
  secureTextEntry: T.bool,
  error: T.any,
  inputType: T.string,
  onPressIcon: T.func,
  iconName: T.string,
  iconNameLeft: T.string,
  infoMessage: T.string,
  onChangeText: T.func,
};

export default FormInput;
