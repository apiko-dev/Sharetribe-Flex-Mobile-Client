import { types as t } from 'mobx-state-tree';

// import { Transaction } from './TransactionStore';

const Relationships = t.model('Relationships', {
  // transaction: t.maybe(t.reference(Transaction)),
});

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
