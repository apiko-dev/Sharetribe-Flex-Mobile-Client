import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import s from './styles';
import Location from '../Location/Location';
import Seller from '../Seller/Seller';
import {
  ShadowContainer,
  ExpandableText,
} from '../../../../components';
import { fontSizes } from '../../../../styles';

const DescriptionTab = ({ text, user, location, geolocation }) => (
  <View style={s.container}>
    <ShadowContainer>
      <View style={s.description}>
        <View style={s.textContainer}>
          <ExpandableText
            numberOfLines={5}
            fontSize={fontSizes.medium}
            lineHeight={fontSizes.medium}
            ellipsizeMode="tail"
          >
            {text}
          </ExpandableText>
        </View>
      </View>
    </ShadowContainer>
    <ShadowContainer>
      <Location location={location} geolocation={geolocation} />
    </ShadowContainer>
    <ShadowContainer>
      <Seller
        // image={image}
        user={user}
        rating={4}
      />
    </ShadowContainer>
  </View>
);

DescriptionTab.propTypes = {
  text: T.string,
  user: T.object,
  location: T.string,
  geolocation: T.object,
};

export default DescriptionTab;
