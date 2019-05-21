import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Image, View, StyleSheet } from 'react-native';
import { dimensions } from '../../styles';
import { Touchable } from '..';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  starContainer: {
    margin: dimensions.smallIndent,
  },
});

const createWidth = (value, size) => {
  if (value === 1) {
    return 0;
  }
  if (value === 0) {
    return size;
  }

  const v = Math.asin(2 * value - 1) / Math.PI + 0.5;

  const returnValue = size - size * v;

  return returnValue;
};

const Star = ({
  image,
  width,
  height,
  needMargin,
  margin,
  backgroundColor,
  value,
  color,
  showOnlyRating,
  setRating,
  index,
}) => (
  <Touchable
    onPress={() => setRating(index + 1)}
    style={[
      showOnlyRating && styles.starContainer,
      needMargin && { marginRight: margin },
      { height },
    ]}
  >
    <View style={[styles.backgroundContainer, { backgroundColor }]} />
    <View
      style={[
        styles.backgroundContainer,
        { backgroundColor: color, right: createWidth(value, width) },
      ]}
    />
    <Image source={image} style={{ width, height }} />
  </Touchable>
);

const Rating = ({
  value,
  ratingCount,
  ratingColor,
  startingValue,
  ratingImage,
  ratingBackgroundColor,
  imageSize,
  imageWidth,
  imageHeight,
  showOnlyRating,
  setRating,
}) => (
  <View
    style={[styles.container, { height: imageHeight || imageSize }]}
  >
    {R.times((index) => {
      const item = startingValue - index;

      let itemValue = 0;

      if (item >= 1) {
        itemValue = 1;
      } else if (item < 1 && item >= 0) {
        itemValue = item;
      }
      const width = imageWidth || imageSize;
      const height = imageHeight || imageSize;

      return (
        <Star
          key={index}
          index={index}
          backgroundColor={ratingBackgroundColor}
          color={ratingColor}
          image={ratingImage}
          width={width}
          height={height}
          needMargin={ratingCount !== index + 1}
          value={itemValue}
          margin={2}
          showOnlyRating={showOnlyRating}
          setRating={setRating}
        />
      );
    }, ratingCount)}
  </View>
);

Rating.propTypes = {
  value: PropTypes.number,
  ratingCount: PropTypes.number,
  startingValue: PropTypes.number,
  // ratingImage: PropTypes.object,
  ratingColor: PropTypes.string,
  ratingBackgroundColor: PropTypes.string,
  showOnlyRating: PropTypes.bool,
  setRating: PropTypes.func,
};

export default Rating;
