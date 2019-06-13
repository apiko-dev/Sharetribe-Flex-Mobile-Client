import React from 'react';
import R from 'ramda';
import uuid from 'uuid/v4';

import {
  compose,
  withHandlers,
  withState,
  withPropsOnChange,
  defaultProps,

} from 'recompose';

import { inject } from 'mobx-react';
import MapBox from './MapBox';
import { categories } from '../../../../constants';

const ZOOMED_DELTA = 0.015;

const arrCoordinates = (value) => {
  const markers = value.reduce((acc, current) => {
    const body = {
      coordinate: {
        latitude: current.geolocation.lat,
        longitude: current.geolocation.lng,
      },
      cost: `${current.price.amount}`,
      key: uuid(),
    };
    acc.push(body);
    return acc;
  }, []);
  return markers;
};

const enhancer = compose(
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
