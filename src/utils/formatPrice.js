/* eslint-disable no-restricted-properties */
const { pow, floor, abs, log } = Math;

function round(n, precision) {
  const prec = Math.pow(10, precision);
  return Math.round(n * prec) / prec;
}

export default function formatPrice(n) {
  const base = floor(log(abs(n)) / log(1000000));
  const suffix = 'M'[base - 1];
  return suffix
    ? `${round(n / pow(1000000, base), 2)} ${suffix}`
    : `${n}`;
}
