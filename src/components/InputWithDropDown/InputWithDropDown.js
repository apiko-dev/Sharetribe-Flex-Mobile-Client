import React from 'react';
import { View, ViewPropTypes, ScrollView } from 'react-native';
import T from 'prop-types';
import InputForm from '../InputForm/InputForm';
import Touchable from '../Touchable/Touchable';
import Text from '../Text/Text';
import s from './styles';

// TODO: Make this component in the future
const InputWithDropDown = ({
  inputStyle,
  containerStyle,
  textInputRef = React.createRef(),
  label,
  labelContainerStyle,
  labelStyle,
  onInputPress,
  chevronRight,
  value,
  placeholder,
  active,
  list,
  onPressListItem,
  listStyle,
  listItemStyle,
  ...props
}) => (
  <View>
    <InputForm
      inputStyle={inputStyle}
      containerStyle={containerStyle}
      textInputRef={textInputRef}
      label={label}
      labelContainerStyle={labelContainerStyle}
      labelStyle={labelStyle}
      onInputPress={onInputPress}
      chevronRight={chevronRight}
      value={value}
      placeholder={placeholder}
      active={active}
      {...props}
    />
    {list.length !== 0 && (
      <ScrollView
        style={[s.locationDropDownList, listStyle]}
        scrollEnabled
      >
        {list.map((item) => (
          <Touchable onPress={() => onPressListItem(item)}>
            <View style={[s.locationDropDownListItem, listItemStyle]}>
              <Text>{item}</Text>
            </View>
          </Touchable>
        ))}
      </ScrollView>
    )}
  </View>
);

InputWithDropDown.propTypes = {
  inputStyle: T.any,
  containerStyle: ViewPropTypes.style,
  labelContainerStyle: ViewPropTypes.style,
  listStyle: ViewPropTypes.style,
  listItemStyle: ViewPropTypes.style,
  labelStyle: ViewPropTypes.style,
  textInputRef: T.object,
  label: T.string,
  onInputPress: T.func,
  placeholderTextColor: T.string,
  noBorder: T.bool,
  chevronRight: T.bool,
  value: T.string,
  placeholder: T.string,
  active: T.bool,
  list: T.array,
  onPressListItem: T.func,
};

export default InputWithDropDown;
