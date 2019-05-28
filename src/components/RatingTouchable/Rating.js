import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import RatingBase from './RatingBase';
import s from './styles';
import { colors } from '../../styles';

const ratingImage = require('../../assets/png/rate-star.png');

const round = (value) => Math.round(value * 10) / 10;

const Rating = ({ value = 0, imageSize = 14, setRating }) => {
  return (
    <View style={s.row}>
      <RatingBase
        startingValue={round(value)}
        type="custom"
        ratingCount={5}
        imageSize={imageSize}
        style={s.custom}
        ratingImage={ratingImage}
        ratingColor={colors.icon.tintColorOrange}
        ratingBackgroundColor={colors.icon.tintColorGray}
        setRating={setRating}
      />
    </View>
  );
};

Rating.propTypes = {
  value: PropTypes.number,
  setRating: PropTypes.func,
  imageSize: PropTypes.number,
};

export default Rating;
