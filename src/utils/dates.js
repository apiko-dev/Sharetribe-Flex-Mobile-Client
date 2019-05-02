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

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

export function formatDate(value) {
  if (!value) {
    return value;
  }

  if (value > 31) {
    return '31';
  }

  const clearValue = clearNumber(value);

  return clearValue.slice(0, 2);
}

export function formatMonth(value) {
  if (!value) {
    return value;
  }

  if (value > 12) {
    return '12';
  }

  const clearValue = clearNumber(value);

  return clearValue.slice(0, 2);
}

export function formatYear(value) {
  if (!value) {
    return value;
  }

  const currentYear = new XDate().getFullYear();

  if (value > currentYear) {
    return currentYear.toString();
  }

  const clearValue = clearNumber(value);

  return clearValue.slice(0, 4);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}
