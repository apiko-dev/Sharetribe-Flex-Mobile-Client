import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import RatingBase from './RatingBase';
import s from './styles';
import { colors } from '../../styles';

const ratingImage = require('../../assets/png/rate-star.png');

const round = (value) => Math.round(value * 10) / 10;
const formatValue = (value) =>
  `${value}`.indexOf('.') === -1
    ? `${value},0`
    : `${value}`.replace('.', ',');

const Rating = ({ value = 0 }) =>
  value ? (
    <View style={{ flexDirection: 'row' }}>
      <Text style={[s.text, s.value]}>{formatValue(value)}</Text>
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
      <Text style={[s.text, s.value]}>
        ({value})
      </Text>
    </View>
  ) : (
    <Text style={s.text}>No rating yet</Text>
  );

Rating.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
};

export default Rating;
