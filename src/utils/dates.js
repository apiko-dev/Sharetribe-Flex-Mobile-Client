/* eslint-disable no-plusplus */
import XDate from 'xdate';

export const getEndDateByStart = (start, days) => {
  const mStart = new XDate(start);
  const startDate = mStart.toString('yyyy-MM-dd');
  const mEnd = mStart.addDays(days);
  const endDate = mEnd.toString('yyyy-MM-dd');

  return {
    start: startDate,
    end: endDate,
  };
};

export const getHourAndMinutes = (date) => {
  const xdate = new XDate(date);
  const formatDate = xdate.toString('h(:mm)');
  return formatDate;
};

export const formatedDate = ({
  start,
  end,
  format = 'dd/MM/yyyy',
  separator = '-',
}) => {
  const formatedDateStart = new XDate(start).toString(format);

  let formatedDateEnd;
  let rangeDate;

  if (end) {
    formatedDateEnd = new XDate(end).toString(format);

    rangeDate = `${formatedDateStart}${separator}${formatedDateEnd}`;
  }

  return {
    start: formatedDateStart,
    end: formatedDateEnd,
    rangeDate,
  };
};

export const getAvailableAndEmployedDates = (
  arr,
  fromDate,
  toDate,
) => {
  const availableDates = arr.map((i) =>
    new XDate(i.attributes.start).toString('yyyy-MM-dd'),
  );

  const mFromDate = new XDate(fromDate);
  const mToDate = new XDate(toDate);
  const range = mFromDate.diffDays(mToDate);

  const employedDates = [];

  if (range >= 0) {
    let tempDate = mFromDate.toString('yyyy-MM-dd');
    for (let i = 1; i <= range; i++) {
      if (!availableDates.includes(tempDate)) {
        employedDates.push(tempDate);
      }
      tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
    }
  }

  return {
    availableDates,
    employedDates,
  };
};
