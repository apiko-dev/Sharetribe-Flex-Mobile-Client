import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ViewPropTypes } from 'react-native';
import RatingBase from './RatingBase';
import s from './styles';
import { colors } from '../../styles';

const ratingImage = require('../../assets/png/rate-star.png');

const round = (value) => Math.round(value * 10) / 10;
const formatValue = (value) =>
  `${value}`.indexOf('.') === -1
    ? `${value},0`
    : `${value}`.replace('.', ',');

const Rating = ({
  value = 0,
  reviewsCount = 4,
  imageSize = 14,
  showAverageRating = false,
  containerStyle,
  ratingNumberStyle,
  ratingCountStyle,
}) => {
  const formattedValue = formatValue(value);
  const formattedReviews = `(${reviewsCount})`;
  return (
    <View style={[s.row, containerStyle]}>
      <Text style={[s.text, s.value, ratingNumberStyle]}>
        {formattedValue}
      </Text>
      <RatingBase
        startingValue={round(value)}
        type="custom"
        ratingCount={5}
        imageSize={imageSize}
        style={s.custom}
        ratingImage={ratingImage}
        ratingColor={colors.icon.tintColorOrange}
        ratingBackgroundColor={colors.icon.tintColorGray}
      />
      {!showAverageRating || (
        <Text style={[s.text, s.reviewCount, ratingCountStyle]}>
          {formattedReviews}
        </Text>
      )}
    </View>
  );
};

Rating.propTypes = {
  value: PropTypes.number,
  reviewsCount: PropTypes.number,
  imageSize: PropTypes.number,
  showAverageRating: PropTypes.bool,
  containerStyle: PropTypes.any,
  ratingNumberStyle: PropTypes.any,
  ratingCountStyle: PropTypes.any,
};

export default Rating;
