export default function match(matchers, defaultValue) {
  // eslint-disable-next-line no-restricted-syntax
  for (const [condition, value] of matchers) {
    if (condition) {
      return value;
    }
  }

  return defaultValue;
}
