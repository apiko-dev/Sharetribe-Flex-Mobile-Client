import React from 'react';
import T from 'prop-types';
import R from 'ramda';
import { FlatList } from 'react-native';
import {
  compose,
  withHandlers,
  withPropsOnChange,
  lifecycle,
  withStateHandlers,
} from 'recompose';
import { PermissionService } from '../../services';
import { Separator, EmptyCover, RootSpinner } from "..";
import { colors } from '../../styles';
import { withDebouncedHandler } from '../../utils/enhancers';
import s from './styles';
import GoogleApi from './GoogleAutocompleteApi';
import LocationItem from './LocationItem';
import CurrentLocationHeader from './CurrentLocationHeader';
import testID from '../../../e2e/testIDs';

const AutocompleteLocationsList = ({
  predictions,
  searchString,
  getDetails,
  isLoading,
  isError,
  retry,
  shouldShowResult,
  currentPlace,
  currentLocation,
  useCurrentLocationLabel,
  getCurrentLocation,
}) => {
  if (
    currentLocation &&
    R.isEmpty(searchString) &&
    !shouldShowResult
  ) {
    return (
      <CurrentLocationHeader
        label={useCurrentLocationLabel}
        onPress={getCurrentLocation}
        testID={testID.currentLocation}
      />
    );
  }

  if (!shouldShowResult || R.isEmpty(searchString)) {
    return null;
  }

  if (isLoading) {
    return <RootSpinner />;
  }

  if (isError) {
    return (
      <EmptyCover
        title="Something went wrong"
        buttonTitle="Retry"
        onPress={retry}
      />
    );
  }

  return (
    <FlatList
      style={s.container}
      data={predictions}
      ListEmptyComponent={(
<EmptyCover
          title="Not found"
          caption={`No results for ${searchString}`}
        />
)}
      contentContainerStyle={R.and(
        R.isEmpty(predictions),
        s.listContainerEmpty,
      )}
      keyboardShouldPersistTaps="handled"
      ItemSeparatorComponent={() => (
        <Separator small marginLeft indent={32 + 20} />
      )}
      ListFooterComponent={() =>
        R.and(
          R.not(R.isEmpty(predictions)),
          <Separator small marginLeft indent={32 + 20} />,
        )
      }
      keyExtractor={R.prop('id')}
      renderItem={({ item, index }) => (
        <LocationItem
          item={item}
          onPress={getDetails}
          isLoading={currentPlace && currentPlace.id === item.id}
          testID={`${testID.locationItem}${index}`}
          textTestID={`${testID.locationItemText}${index}`}
        />
      )}
    />
  );
};

const suspense = async (asyncFn, onTimeout) => {
  const timeoutId = setTimeout(onTimeout, 1000);

  try {
    const res = await asyncFn();

    return res;
  } catch (err) {
    throw new Error(err);
  } finally {
    clearTimeout(timeoutId);
  }
};

const enhancer = compose(
  withStateHandlers(
    {
      predictions: [],
      isLoading: false,
      loadingItemId: null,
      isError: false,
      currentPlace: null,
      shouldShowResult: false,
    },
    {
      setState: () => (state) => state,
    },
  ),

  withHandlers({
    getPredictions: (props) => async () => {
      if (!props.searchString) {
        return;
      }

      props.setState({ isError: false });

      try {
        // don't show loading until timeout
        const res = await suspense(
          () =>
            GoogleApi.getPredictions({
              text: props.searchString,
              types: props.searchTypes,
            }),
          () => props.setState({ isLoading: true }),
        );

        props.setState({ predictions: res.data.predictions });
      } catch (err) {
        props.setState({ isError: true });
      } finally {
        props.setState({
          isLoading: false,
          // don't show anything until we receive some results
          shouldShowResult: props.shouldShowResult || true,
        });
      }
    },
    getDetails: (props) => async (item) => {
      props.setState({ isError: false, currentPlace: item });

      try {
        const res = await GoogleApi.getPlaceDetails({
          placeid: item.place_id,
          language: props.language,
        });

        props.onSelectPlace(item, res.data.result);
      } catch (err) {
        props.setState({ isError: true });
      } finally {
        props.setState({ currentPlace: null });
      }
    },
    getCurrentLocation: (props) => async () => {
      try {
        await PermissionService.getLocationPermission();
        const location = await GoogleApi.getCurrentLocation();

        const currentLocation = {
          description: props.currentLocationLabel,
          geometry: {
            location,
          },
        };

        props.onSelectPlace(currentLocation, currentLocation);
      } catch (err) {
        console.log(err.message);
      }
    },
  }),

  withHandlers({
    retry: (props) => () => {
      props.setState({ isLoading: true });

      if (props.currentPlace) {
        props.getDetails(props.currentPlace);
      } else {
        props.getPredictions();
      }
    },
  }),

  // debounce handler
  withDebouncedHandler('getPredictions', 300),

  lifecycle({
    UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.searchString !== nextProps.searchString) {
        // as soon as we type
        // we calling handler (debounced)
        this.props.getPredictions();

        // hiding results on clearing input state
        if (R.isEmpty(nextProps.searchString)) {
          this.props.setState({ shouldShowResult: false });
        }
      }
    },
  }),
);

export default enhancer(AutocompleteLocationsList);
