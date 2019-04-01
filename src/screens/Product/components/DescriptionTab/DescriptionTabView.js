import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import i18n from '../../../../i18n';
// import { categories } from '../../../../constants';
// import { Text, Touchable} from '../../../../components';
import Location from '../Location/Location';
import Seller from '../Seller/Seller';
import {
  Touchable,
  Text,
  ShadowContainer,
} from '../../../../components';

const DescriptionTab = ({ text, setVisible, isVisible, onPress }) => (
  <View style={s.container}>
    <ShadowContainer>
      <View style={s.description}>
        <View
          style={[s.textContainer, isVisible ? s.flex : s.maxHeight]}
        >
          <Text numberOfLines={!isVisible && 5} style={s.text}>
            {text}
          </Text>
        </View>
        <Touchable style={s.buttonContainer} onPress={onPress}>
          {isVisible ? (
            <Text orange>Less</Text>
          ) : (
            <Text orange>More</Text>
          )}
        </Touchable>
      </View>
    </ShadowContainer>
    <ShadowContainer>
      <Location />
    </ShadowContainer>
    <ShadowContainer>
      <Seller
        // image={image}
        name="Oleh Chabanov"
        rating={4}
      />
    </ShadowContainer>
  </View>
);

export default DescriptionTab;
