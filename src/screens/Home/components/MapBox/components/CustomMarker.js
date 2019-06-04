import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import T from 'prop-types';
import { colors } from '../../../../../styles';

const s = StyleSheet.create({
  markerContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: colors.mapView.backgroundColor,
    padding: 2,
    borderRadius: 3,
    borderColor: colors.mapView.backgroundColor,
  },
  activeMarker: {
    backgroundColor: colors.mapView.backgroundActiveColor,
  },
  activeText: {
    color: colors.mapView.activeText,
  },
  activeArrow: {
    borderTopColor: colors.mapView.backgroundActiveColor,
  },
});

const CustomMarker = ({ selectedMarkerIndex, index, marker }) => (
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
);

CustomMarker.propTypes = {
  selectedMarkerIndex: T.bool,
  index: T.number,
  marker: T.object,
};

export default CustomMarker;
