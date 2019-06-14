import React from 'react';
import T from 'prop-types';
import R from 'ramda';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { observer } from 'mobx-react/custom';
import s from './styles';
import { Carousel } from './components';
import CarouselItem from '../CarouselItem/CarouselItem';

const getItemWidth = (currentWidth) => currentWidth - 60;

const MapBox = ({
  findInitialRegion,
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
  data,
  listings,
  sectionList,
  isRefreshing,
  isLoading,
  filterItem,
  newFilterItem,
  ...props
}) => (
  <View style={s.flex}>
    <MapView
      initialRegion={findInitialRegion()}
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
        />
      ))}
    </MapView>
    <View style={s.cardsContainer}>
      <Carousel
        removeClippedSubviews={removeClippedSubviews}
        onSnapToItem={onSnapToItem}
        keyExtractor={R.prop('id')}
        data={newFilterItem}
        renderItem={({ item }) => (
          <CarouselItem item={item} isLoading={isLoading} />
        )}
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
  data: T.array,
  listings: T.array,
  sectionList: T.array,
  filterItem: T.array,
  newFilterItem: T.array,
  findInitialRegion: T.func,
  isRefreshing: T.bool,
  isLoading: T.bool,
};

export default observer(MapBox);
