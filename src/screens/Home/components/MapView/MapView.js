import React from 'react';
import { View, Image } from 'react-native';
import Map, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import uuid from 'uuid/v4';
import { observer } from 'mobx-react/custom';
import { Text } from '../../../../components';
import s from './styles';
import FlatListHorizontal from '../FlatListHorizontal/FlatListHorizontal';

// const markers = [
//   {
//     coordinate: {
//       latitude: 34.094994,
//       longitude: -118.330255,
//     },
//     cost: 1000,
//     key: uuid(),
//     description: 'Some description',
//   },
//   {
//     coordinate: {
//       latitude: 34.109,
//       longitude: -118.33225,
//     },
//     cost: 20,
//     key: uuid(),
//     description: 'Some description',
//   },
//   {
//     coordinate: {
//       latitude: 34.1555,
//       longitude: -118.332767,
//     },
//     cost: 50,
//     key: uuid(),
//     description: 'Some description',
//   },
// ];

const MapView = ({
  markers,
  images,
  onPressMarker,
  selectedMarkerIndex,
}) => {
  return (
    <View style={s.container}>
      <Map
        style={s.map}
        provider={PROVIDER_GOOGLE}
        // Test region
        initialRegion={{
          latitude: 34.094994,
          longitude: -118.332245,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker, index) => {
          return (
            <Marker {...marker} onPress={() => onPressMarker(index)}>
              <View style={s.markerContainer}>
                <View
                  style={[
                    s.bubble,
                    selectedMarkerIndex === index && s.activeMarker,
                  ]}
                >
                  <Text
                    orange
                    bold
                    style={[
                      s.text,
                      selectedMarkerIndex === index && s.activeText,
                    ]}
                  >
                    {`$${marker.cost}`}
                  </Text>
                </View>
                <View
                  style={[
                    s.arrowBorder,
                    selectedMarkerIndex === index && s.activeArrow,
                  ]}
                />
                <View
                  style={[
                    s.arrow,
                    selectedMarkerIndex === index && s.activeArrow,
                  ]}
                />
              </View>
              {/* <FlatListHorizontal
                data={images}
                renderItem={(item) => (
                  <View>
                    <Image source={item} />
                  </View>
                )}
              /> */}
            </Marker>
          );
        })}
      </Map>
    </View>
  );
};

MapView.propTypes = {};

export default observer(MapView);
