import React from 'react';
import T from 'prop-types';
import { View } from 'react-native';
import { MapView, Text } from '../../../../components';
import s from './styles';

const Location = ({ location, geolocation }) => {
  const coordinates = {
    latitude: geolocation.lat,
    longitude: geolocation.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <View style={s.container}>
      <MapView liteMode initialRegion={coordinates} />
      <View pointerEvents="box-only" style={s.bannerContainer}>
        <View style={s.banner}>
          <Text>{location}</Text>
        </View>
      </View>
    </View>
  );
};

Location.propTypes = {
  location: T.string,
  geolocation: T.object,
};

export default Location;
