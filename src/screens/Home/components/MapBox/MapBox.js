import React from 'react';
import T from 'prop-types';
import R from 'ramda';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { compose, withHandlers, withState } from 'recompose';
import s from './styles';
import { Carousel } from './components';
import CarouselItem from '../CarouselItem/CarouselItem';

const LATITUDE_DELTA = 0.0222;
const ZOOMED_DELTA = 0.015;

const findInitialRegion = (markers, currentWidth, currentHeight) => {
  if (markers.length === 1) {
    const aspectRatio = currentWidth / currentHeight;

    return {
      latitude: markers[0].coordinate.latitude,
      longitude: markers[0].coordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LATITUDE_DELTA * aspectRatio,
    };
  }

  const points = markers.map((item) => ({
    latitude: item.coordinate.latitude,
    longitude: item.coordinate.longitude,
  }));

  let minX = points[0].latitude;
  let maxX = points[0].latitude;
  let minY = points[0].longitude;
  let maxY = points[0].longitude;

  // calculate rect
  points.forEach((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;

  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX + LATITUDE_DELTA,
    longitudeDelta: deltaY + LATITUDE_DELTA,
  };
};

const getItemWidth = (currentWidth) => currentWidth - 60;

const MapBox = ({
  markers,
  onCalloutPress,
  setMapViewRef,
  currentWidth,
  currentHeight,
  items,
  onSnapToItem,
  removeClippedSubviews,
  onMapLayout,
  selectedMarkerIndex,
  onPressMarker,
  ...props
}) => (
  <View style={s.flex}>
    <MapView
      initialRegion={findInitialRegion(
        markers,
        currentWidth,
        currentHeight,
      )}
      style={s.flex}
      ref={setMapViewRef}
      onLayout={onMapLayout}
      provider={PROVIDER_GOOGLE}
    >
      {markers.map((marker) => (
        <MapView.Marker
          onCalloutPress={() => onCalloutPress(marker)}
          key={marker.key}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
    <View style={s.cardsContainer}>
      <Carousel
        removeClippedSubviews={removeClippedSubviews}
        onSnapToItem={onSnapToItem}
        keyExtractor={R.prop('id')}
        data={items}
        renderItem={({ item }) => <CarouselItem item={item} />}
        initialNumToRender={10}
        sliderWidth={currentWidth}
        itemWidth={getItemWidth(currentWidth)}
        inactiveSlideOpacity={1}
        onEndReachedThreshold={0.3}
        // Use this with pagination listings, it adds empty card in the end to fetch new product
        // onEndReached={() => {
        //   if (!props.isLoadingMore && !props.loadingMoreError) {
        //     props.fetchMore();
        //   }
        // }}
        // showFooter={props.isLoadingMore || !!props.loadingMoreError}
        // footerComponent={
        //   <Carousel.PlaceholderCard
        //     width={getItemWidth(currentWidth)}
        //     showSpinner={props.isLoadingMore}
        //     loadingError={props.loadingMoreError}
        //     loadingErrorCaption={props.loadingMoreErrorCaption}
        //     onRetry={props.fetchMore}
        //   />
        // }
      />
    </View>
  </View>
);

MapBox.propTypes = {
  markers: T.array,
  selectedMarkerIndex: T.number,
  onPressMarker: T.func,
  onCalloutPress: T.func,
  setMapViewRef: T.func,
  currentWidth: T.number,
  currentHeight: T.number,
  onSnapToItem: T.func,
  onMapLayout: T.func,
  removeClippedSubviews: T.bool,
  items: T.array,
};

const enhancer = compose(
  withState('getMapViewRef', 'setMapViewRef', React.createRef()),
  withState('isMounted', 'setIsMounted', false),
  withState(
    'removeClippedSubviews',
    'setRemoveClippedSubviews',
    false,
  ),
  withHandlers({
    fixCoordinates: (props) => () => {
      if (!props.getMapViewRef || props.markers.length < 1) {
        return;
      }

      const { latitude, longitude } = props.markers[0].coordinate;

      const region = {
        latitude,
        longitude,
        latitudeDelta: ZOOMED_DELTA,
        longitudeDelta: ZOOMED_DELTA,
      };

      props.getMapViewRef.animateToRegion(region);
    },
    handleClippedSubviews: (props) => () => {
      if (!props.removeClippedSubviews) {
        props.setRemoveClippedSubviews(true);
      }
    },
  }),
  withHandlers({
    onMapLayout: (props) => () => {
      if (!props.isMounted) {
        props.setIsMounted(true);
        props.fixCoordinates();
      }
    },
    onSnapToItem: (props) => (slideIndex) => {
      props.handleClippedSubviews();

      const item = R.path(['items', slideIndex], props);
      if (!item) return;

      const region = {
        latitude: item.geolocation.lat,
        longitude: item.geolocation.lng,
        latitudeDelta: ZOOMED_DELTA,
        longitudeDelta: ZOOMED_DELTA,
      };

      props.getMapViewRef.animateToRegion(region);
    },
  }),
);

export default enhancer(MapBox);
