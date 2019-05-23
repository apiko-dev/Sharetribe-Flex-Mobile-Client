import React from 'react';
import T from 'prop-types';
import { View, Text } from 'react-native';
import Rating from '../../../Rating/Rating';
import s from './styles';

function RatingTable({ ratings, averageRating }) {
  const checkRating = isNaN(averageRating) ? 0 : averageRating;
  const normalizeRating = ratings.reduce(
    (acc, current) => {
      try {
        switch (current) {
          case 1:
            acc.one.push(current);
            acc.total += 1;
            break;
          case 2:
            acc.two.push(current);
            acc.total += 1;
            break;
          case 3:
            acc.three.push(current);
            acc.total += 1;
            break;
          case 4:
            acc.four.push(current);
            acc.total += 1;
            break;
          case 5:
            acc.five.push(current);
            acc.total += 1;
            break;
          default:
            return acc;
        }
        return acc;
      } catch (err) {
        console.log(err);
      }
    },
    {
      one: [],
      two: [],
      three: [],
      four: [],
      five: [],
      total: 0,
    },
  );
  function ratingCalculate(arr, total) {
    const calculate = (100 * arr.length) / total;

    return `${calculate}%`;
  }

  const { one, two, three, four, five, total } = normalizeRating;

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
        <View style={s.lineContainer}>
          <Text style={s.numberLine}>1</Text>
          <View style={s.line}>
            <View
              style={[
                s.lineContent,
                { width: ratingCalculate(one, total) },
              ]}
            />
          </View>
        </View>
        <View style={s.lineContainer}>
          <Text style={s.numberLine}>2</Text>
          <View style={s.line}>
            <View
              style={[
                s.lineContent,
                { width: ratingCalculate(two, total) },
              ]}
            />
          </View>
        </View>
        <View style={s.lineContainer}>
          <Text style={s.numberLine}>3</Text>
          <View style={s.line}>
            <View
              style={[
                s.lineContent,
                { width: ratingCalculate(three, total) },
              ]}
            />
          </View>
        </View>
        <View style={s.lineContainer}>
          <Text style={s.numberLine}>4</Text>
          <View style={s.line}>
            <View
              style={[
                s.lineContent,
                { width: ratingCalculate(four, total) },
              ]}
            />
          </View>
        </View>
        <View style={s.lineContainer}>
          <Text style={s.numberLine}>5</Text>
          <View style={s.line}>
            <View
              style={[
                s.lineContent,
                { width: ratingCalculate(five, total) },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

RatingTable.propTypes = {
  ratings: T.array,
  averageRating: T.number,
};

export default RatingTable;
