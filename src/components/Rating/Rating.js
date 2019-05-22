import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
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
  showOnlyRating = false,
  showAverageRating = false,
}) => {
  const formattedValue = formatValue(value);
  const formattedReviews = `(${reviewsCount})`;
  const [rating, setRating] = React.useState(value);
  return value ? (
    <View style={s.row}>
      {showOnlyRating || (
        <Text style={[s.text, s.value]}>{formattedValue}</Text>
      )}
      <RatingBase
        startingValue={round(rating)}
        type="custom"
        ratingCount={5}
        imageSize={imageSize}
        style={s.custom}
        ratingImage={ratingImage}
        ratingColor={colors.icon.tintColorOrange}
        ratingBackgroundColor={colors.icon.tintColorGray}
        showOnlyRating={showOnlyRating}
        setRating={setRating}
      />
      {showOnlyRating || !showAverageRating || (
        <Text style={[s.text, s.reviewCount]}>
          {formattedReviews}
        </Text>
      )}
    </View>
  ) : null;
};

Rating.propTypes = {
  value: PropTypes.number,
  reviewsCount: PropTypes.number,
  imageSize: PropTypes.number,
  showOnlyRating: PropTypes.bool,
  showAverageRating: PropTypes.bool,
};

export default Rating;
