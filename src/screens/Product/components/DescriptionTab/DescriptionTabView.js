import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import Location from '../Location/Location';
import Seller from '../Seller/Seller';
import {
  Touchable,
  Text,
  ShadowContainer,
  ExpandableText,
} from '../../../../components';
import { fontSizes } from '../../../../styles';

const DescriptionTab = ({
  text,
  // setVisible,
  isVisible,
  onPress,
  user,
}) => (
  <View style={s.container}>
    <ShadowContainer>
      <View style={s.description}>
        <View style={s.textContainer}>
          {/* <Text numberOfLines={!isVisible && 5} style={s.text}> */}

          <ExpandableText
            numberOfLines={5}
            fontSize={fontSizes.medium}
            lineHeight={fontSizes.medium}
            ellipsizeMode="tail"
          >
            {text}
          </ExpandableText>
          {/* </Text> */}
        </View>
        {/* <Touchable style={s.buttonContainer} onPress={onPress}>
          {isVisible ? (
            <Text orange>Less</Text>
          ) : (
            <Text orange>More</Text>
          )}
        </Touchable> */}
      </View>
    </ShadowContainer>
    <ShadowContainer>
      <Location />
    </ShadowContainer>
    <ShadowContainer>
      <Seller
        // image={image}
        name={user.displayName}
        rating={4}
      />
    </ShadowContainer>
  </View>
);

DescriptionTab.propTypes = {
  text: T.string,
  // setVisible: T.bool,
  isVisible: T.bool,
  onPress: T.func,
  user: T.object,
};

export default DescriptionTab;
