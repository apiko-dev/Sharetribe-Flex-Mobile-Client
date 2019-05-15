import { types as t } from 'mobx-state-tree';

const Relationships = t.model('Relationships', {});

const StateEnum = t.enumeration('BookingState', [
  'pending',
  'accepted',
  'declined',
  'cancelled',
]);

export const Booking = t.model('Booking', {
  id: t.identifier,
  displayEnd: t.Date,
  displayStart: t.Date,
  start: t.Date,
  end: t.Date,
  state: StateEnum,
  relationships: t.optional(Relationships, {}),
});
