/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import T from 'prop-types';
import { Calendar } from 'react-native-calendars';
import XDate from 'xdate';

const DataRangerPicker = ({
  theme,
  initialRange,
  onSuccess,
  ...props
}) => {
  const [isFromDatePicked, setFromDatePicked] = useState(false);
  const [isToDatePicked, setToDatePicked] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [fromDate, setFromDate] = useState('');

  useEffect(() => {
    setupInitialRange();
  }, []);

  function onDayPress(day) {
    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      setupStartMarker(day);
    } else if (!isToDatePicked) {
      const markedDates_ = { ...markedDates };
      const [mMarkedDates, range] = setupMarkedDates(
        fromDate,
        day.dateString,
        markedDates_,
      );
      if (range >= 0) {
        setToDatePicked(true);
        setToDatePicked(true);
        setMarkedDates(mMarkedDates);

        onSuccess(fromDate, day.dateString);
      } else {
        setupStartMarker(day);
      }
    }
  }

  function setupStartMarker(day) {
    const markedDates_ = {
      [day.dateString]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    };

    setFromDatePicked(true);
    setToDatePicked(false);
    setFromDate(day.dateString);
    setMarkedDates(markedDates_);
  }

  function setupMarkedDates(fromDate_, toDate, markedDates_) {
    const mFromDate = new XDate(fromDate_);
    const mToDate = new XDate(toDate);
    const range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range === 0) {
        markedDates_ = {
          [toDate]: {
            color: theme.markColor,
            textColor: theme.markTextColor,
          },
        };
      } else {
        for (let i = 1; i <= range; i++) {
          const tempDate = mFromDate
            .addDays(1)
            .toString('yyyy-MM-dd');
          if (i < range) {
            markedDates[tempDate] = {
              color: theme.markColor,
              textColor: theme.markTextColor,
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: theme.markColor,
              textColor: theme.markTextColor,
            };
          }
        }
      }
    }
    return [markedDates_, range];
  }

  function setupInitialRange() {
    if (!initialRange) return;
    const [fromDate_, toDate] = initialRange;
    const markedDates_ = {
      [fromDate_]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    };

    const [mMarkedDates] = setupMarkedDates(
      fromDate_,
      toDate,
      markedDates_,
    );

    setMarkedDates(mMarkedDates);
    setFromDate(fromDate_);
  }

  return (
    <Calendar
      {...props}
      markingType="period"
      current={fromDate}
      markedDates={markedDates}
      onDayPress={(day) => {
        onDayPress(day);
      }}
    />
  );
};

DataRangerPicker.propTypes = {
  theme: T.any,
  initialRange: T.any,
  onSuccess: T.func,
};

export default DataRangerPicker;
