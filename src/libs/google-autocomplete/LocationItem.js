import React from 'react';
import T from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { Icon, Touchable } from '../';
import { dimensions, colors, fontSizes } from '../../styles';
import Spinner from '../RootSpinner';

const s = StyleSheet.create({
  container: {
    paddingHorizontal: dimensions.indent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: dimensions.indent,
  },
  textView: {
    flex: 1,
    marginLeft: dimensions.indent,
  },
  mainText: {
    fontSize: fontSizes.heading3,
    color: colors.locationItem.title,
  },
  secondaryText: {
    fontSize: fontSizes.heading4,
    color: colors.locationItem.subtitle,
  },
  loadingContainer: {

  },
});

const LocationItem = ({
  onPress,
  item,
  isLoading,
  testID,
  textTestID,
}) => (
  <Touchable
    onPress={() => onPress(item)}
    testID={testID}
  >
    <View style={s.container}>
      <Icon
        size={24}
        iconName="location-point"
        color={colors.icon}
      />
      <View style={s.textView}>
        <Text style={s.mainText} testID={textTestID}>
          {item.structured_formatting.main_text}
        </Text>
        {item.structured_formatting.secondary_text && (
          <Text style={s.secondaryText}>
            {item.structured_formatting.secondary_text}
          </Text>
        )}
      </View>
      {isLoading && (
        <View style={s.loadingContainer}>
          <Spinner size="small" transparent />
        </View>
      )}
    </View>
  </Touchable>
);

LocationItem.propTypes = {
  onPress: T.func,
  item: T.shape({
    place_id: T.string,
    structured_formatting: T.shape({
      main_text: T.string,
      main_text_matched_substrings: T.arrayOf(T.shape({
        length: T.number,
        offset: T.number,
      })),
      secondary_text: T.string,
    }),
  }),
  isLoading: T.bool,
  testID: T.string,
  textTestID: T.string,
};

export default LocationItem;
