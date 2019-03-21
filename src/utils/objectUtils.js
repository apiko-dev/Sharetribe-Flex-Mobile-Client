export function isObject(value) {
  return value !== null && typeof value === 'object';
}

export function isPlainObject(value) {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export function toPlainObject(complexObject) {
  const obj = {};
  Object.getOwnPropertyNames(complexObject).forEach((item) => {
    if (item === 'constructor') {
      return;
    }

    const property = complexObject[item];

    if (typeof property === 'function') {
      return;
    }

    obj[item] = property;
  });

  return obj;
}
