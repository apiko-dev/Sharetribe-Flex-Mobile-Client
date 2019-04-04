const trim = (string, onlyEnds) => {
  if (typeof string !== 'string') {
    return string;
  }

  if (onlyEnds) {
    return string.trim();
  }

  return string.trim().replace(/\s+/g, ' ');
};

export const trimLongText = (text, symbols = 40) => {
  if (text.length < symbols) return text;

  return text.slice(0, symbols).concat('...');
};

export const trimData = (data) =>
  Object.entries(data).reduce((acc, [name, value]) => {
    acc[name] = trim(value);

    return acc;
  }, {});

export default trim;
