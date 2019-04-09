import React from 'react';
import { View } from 'react-native';
import Map, { PROVIDER_GOOGLE } from 'react-native-maps';
import s from './styles';

const MapView = (props) => (
  <View style={s.container}>
    <Map
      style={s.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      {...props}
      provider={PROVIDER_GOOGLE}
      // Test region
    />
  </View>
);

MapView.propTypes = {};

export default MapView;
