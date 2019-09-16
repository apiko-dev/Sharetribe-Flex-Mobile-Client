import React from 'react';
import R from 'ramda';
import {
  compose,
  withHandlers,
  withState,
  defaultProps,
  hoistStatics,
  withProps,
  withPropsOnChange,
} from 'recompose';

import { inject } from 'mobx-react';
import MapBox from './MapBox';
import { categories } from '../../../../constants';

const LATITUDE_DELTA = 0.0222;
const ZOOMED_DELTA = 0.015;

export default hoistStatics(
  compose(
    inject((store, props) => ({
      props,
      listings: store.listings.list.asArray,
      isLoading: store.listings.fetchListings.inProgress,
      isSearching: store.listings.searchListings.inProgress,
      searchListings: store.listings.searchList.asArray,
    })),
    defaultProps({
      categories,
    }),
    withState('getMapViewRef', 'setMapViewRef', React.createRef()),
    withState('isMounted', 'setIsMounted', false),
    withState('listingForMap', 'setListingForMap', false),
    withState(
      'removeClippedSubviews',
      'setRemoveClippedSubviews',
      false,
    ),
    withHandlers({
      fixCoordinates: (props) => () => {
        if (
          !props.getMapViewRef ||
          !props.isMounted ||
          props.markers.length < 1
        ) {
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
    withProps((props) => {
      let newFilterItem = props.filterItem;
      if (props.data.length > 0) {
        newFilterItem = props.data;
      }
      return { newFilterItem };
    }),
    withHandlers({
      findInitialRegion: ({
        markers,
        currentWidth,
        currentHeight,
      }) => () => {
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

        const item = R.path(['newFilterItem', slideIndex], props);
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
    withPropsOnChange(['category', 'subCategory'], async (props) => {
      if (props.category.length !== 0 || props.subCategory !== 0) {
        const region = props.findInitialRegion();

        await props.getMapViewRef.animateToRegion(region);
      }
    }),
  ),
)(MapBox);
