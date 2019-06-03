import {
  compose,
  withProps,
  withStateHandlers,
  hoistStatics,
} from 'recompose';
import { inject } from 'mobx-react';
import uuid from 'uuid/v4';
import MapView from './MapView';

const arrCoordinates = (value) => {
  const markers = value.reduce((acc, current) => {
    const body = {
      coordinate: {
        latitude: current.geolocation.lat,
        longitude: current.geolocation.lng,
      },
      cost: `${current.price.amount}`,
      key: uuid(),
      // image: current.relationships.images[0].getTitleImage,
    };
    acc.push(body);
    return acc;
  }, []);
  return markers;
};

export default hoistStatics(
  compose(
    inject((stores, { listings }) => ({
      markers: arrCoordinates(listings.list.asArray),
      images: listings.list.asArray.map(
        (i) => i.relationships.images[0].getTitleImage,
      ),
    })),
    withStateHandlers(
      {
        selectedMarkerIndex: '',
      },
      {
        onPressMarker: () => (index) => ({
          selectedMarkerIndex: index,
        }),
      },
    ),
    withProps(console),
  ),
)(MapView);
