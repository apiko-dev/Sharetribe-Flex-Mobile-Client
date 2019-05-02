import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import T from 'prop-types';
import {
  Touchable,
  Text,
  Loader,
  FormContainer,
  IconFonts,
} from '../../../../components';
import s from './styles';
import { colors } from '../../../../styles';
import VisaLogoSvg from '../CardLogo/VisaLogoSvg';

const CardItem = ({
  number,
  selected = false,
  isLoading,
  onPress,
  ...props
}) => (
  <FormContainer
    containerStyle={s.containerStyle}
    formContainerStyle={s.formContainerStyle}
    headerStyle={s.formHeaderStyle}
  >
    <Touchable
      useForeground
      rippleColor={colors.button.rippleColor}
      onPress={() => onPress('selectedCard', number)}
      {...props}
    >
      <React.Fragment>
        {!isLoading ? (
          <View style={s.container}>
            <View style={s.header}>
              <VisaLogoSvg />
              <View>
                {selected === number ? (
                  <IconFonts
                    name="check"
                    size={20}
                    tintColor={colors.cardItem.iconCheck}
                  />
                ) : (
                  <View style={s.notSelected} />
                )}
              </View>
            </View>
            <Text gray xmediumSize>
              {number}
            </Text>
            <View style={s.cardExpiration}>
              <Text gray smallSize style={s.validThru}>
                VALID THRU:
              </Text>
              <Text gray>11/21</Text>
            </View>
          </View>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    </Touchable>
  </FormContainer>
);

CardItem.propTypes = {
  selected: T.string,
  disabled: T.bool,
  onPress: T.func,
  isLoading: T.bool,
  number: T.string,
  titleStyle: ViewPropTypes.style,
};

export default CardItem;
