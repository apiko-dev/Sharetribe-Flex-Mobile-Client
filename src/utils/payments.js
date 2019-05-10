import XDate from 'xdate';

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const clearValue = clearNumber(value);
  const nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
    4,
    8,
  )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 16)}`;

  return nextValue.trim();
}

export function formatCVC(value) {
  const clearValue = clearNumber(value);

  return clearValue.slice(0, 3);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  let month = clearValue.slice(0, 2);
  let year = clearValue.slice(2, 4);

  const currentMonth = new XDate().getMonth();
  const currentYear = new XDate()
    .getFullYear()
    .toString()
    .slice(2, 4);

  if (month > 12) {
    month = '12';
  }

  if (
    year.length === 2 &&
    currentMonth > month &&
    year === currentYear
  ) {
    year = '';
  }

  if (year.length === 2 && year < currentYear) {
    year = '';
  }

  if (clearValue.length >= 3) {
    return `${month}/${year}`;
  }

  return clearValue;
}

export function formatFormData(data) {
  return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}

export function normalizeCardData(cardNumber, cardExpiration) {
  const [monthExpiration, yearExpiration] = cardExpiration.split('/');

  return {
    cardNumber: cardNumber.replace(/\s/g, ''),
    cardExpiration: cardExpiration.replace('/', ''),
    monthExpiration,
    yearExpiration,
  };
}
