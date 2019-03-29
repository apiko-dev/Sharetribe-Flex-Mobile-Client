import React from 'react';
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

const Rating = ({ value = 0, reviewsCount = 4 }) => {
  const formattedValue = formatValue(value);
  const formattedReviews = `(${reviewsCount})`;

  return value ? (
    <View style={s.row}>
      <Text style={[s.text, s.value]}>{formattedValue}</Text>
      <RatingBase
        startingValue={round(value)}
        type="custom"
        ratingCount={5}
        imageSize={14}
        style={s.custom}
        ratingImage={ratingImage}
        ratingColor={colors.icon.tintColorOrange}
        ratingBackgroundColor={colors.icon.tintColorGray}
      />
      <Text style={[s.text, s.reviewCount]}>{formattedReviews}</Text>
    </View>
  ) : null;
};

Rating.propTypes = {
  value: PropTypes.number,
  reviewsCount: PropTypes.number,
};

export default Rating;
