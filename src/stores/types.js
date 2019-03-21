import { types } from 'mobx-state-tree';
import { types as t } from 'sharetribe-flex-sdk';

export const Money = types.custom({
  name: 'Money',
  fromSnapshot(value) {
    return new t.Money(value, 'USD');
  },
  toSnapshot(value) {
    return value.toString();
  },
  isTargetType(value) {
    return value instanceof t.Money;
  },
  getValidationMessage(value) {
    if (/^-?\d+\.\d+$/.test(value)) return '';
    return `'${value}' doesn't look like a valid money number`;
  },
});

export const UUID = types.custom({
  name: 'Money',
  fromSnapshot(value) {
    return new t.UUID(value);
  },
  toSnapshot(value) {
    return value.toString();
  },
  isTargetType(value) {
    return value instanceof t.UUID;
  },
  getValidationMessage(value) {
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value,
      )
    )
      return '';
    return `'${value}' doesn't look like a valid uuid string`;
  },
});
