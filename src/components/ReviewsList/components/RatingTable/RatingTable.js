import React from 'react';
import T from 'prop-types';
import { View, Text } from 'react-native';
import Rating from '../../../Rating/Rating';
import s from './styles';

function RatingTable({ ratings, averageRating }) {
  const checkRating = isNaN(averageRating) ? 0 : averageRating;

  const total = ratings.length;
  const normalizeRating = ratings.reduce((acc, current) => {
    const index = current - 1;
    const arrayItem = acc[index];

    if (Array.isArray(arrayItem)) {
      acc[index].push(current);
    } else {
      acc[index] = [current];
    }

    return acc;
  }, Array(5));

  function ratingCalculate(arr) {
    if (!arr) {
      return '0%';
    }

    const calculate = (100 * arr.length) / total;

    return `${calculate}%`;
  }

  return (
    <View style={s.container}>
      <View style={s.ratingContainer}>
        <Rating
          value={checkRating}
          containerStyle={s.ratingContainerStyle}
          ratingNumberStyle={s.ratingNumberStyle}
          ratingCountStyle={s.ratingCountStyle}
          showAverageRating
        />
      </View>
      <View style={s.tableContainer}>
        {normalizeRating.map((item, index) => (
          <View style={s.lineContainer} key={index}>
            <Text style={s.numberLine}>{index + 1}</Text>
            <View style={s.line}>
              <View
                style={[
                  s.lineContent,
                  { width: ratingCalculate(item) },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

RatingTable.propTypes = {
  ratings: T.array,
  averageRating: T.number,
};

export default RatingTable;
