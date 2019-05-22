import { types as t, getEnv, getRoot } from 'mobx-state-tree';
import { User } from './UserStore';
import { Product } from './ListingsStore';
import listModel from './utils/listModel';
import processJsonApi from './utils/processJsonApi';
import createFlow from './helpers/createFlow';
import { normalizedIncluded } from './utils/normalize';

const Relationships = t.model('Relationships', {
  author: t.maybe(t.reference(User)),
  listing: t.maybe(t.reference(Product)),
  subject: t.maybe(t.reference(User)),
});

export const Review = t.model('Reviews', {
  id: t.identifier,
  type: t.string,
  state: t.string,
  rating: t.number,
  content: t.string,
  createdAt: t.Date,
  relationships: t.maybe(Relationships),
});

export const ReviewList = listModel('ReviewList', {
  of: t.reference(Review),
  entityName: 'reviews',
  identifierName: 'id',
  responseTransformer,
});

function responseTransformer(res) {
  return res.map(processJsonApi);
}

export const ReviewStore = t
  .model('ReviewsStore', {
    list: ReviewList,

    fetchReviews: createFlow(fetchReviews),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }));

function fetchReviews(flow, store) {
  return function* fetchReviews({ subjectId }) {
    try {
      flow.start();

      const res = yield store.Api.getReviews({
        subjectId,
      });

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );
      getRoot(store).entities.merge(normalizedEntities);
      store.list.set(res.data.data);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}
