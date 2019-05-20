import { types as t } from 'mobx-state-tree';
import { User } from './UserStore';
import { Product } from './ListingsStore';

export const Reviews = t.model('Reviews', {
  author: t.maybe(t.reference(User)),
  listing: t.maybe(t.reference(Product)),
  subject: t.maybe(t.reference(User)),
});
