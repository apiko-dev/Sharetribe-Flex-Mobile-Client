import { types as t, getEnv } from 'mobx-state-tree';
import { User } from './UserStore';
import { Product } from './ListingsStore';
import listModel from './utils/listModel';
import processJsonApi from './utils/processJsonApi';
import createFlow from './helpers/createFlow';

const Relationships = t.model('Relationships', {
  author: t.maybe(t.reference(User)),
  listing: t.maybe(t.reference(Product)),
  subject: t.maybe(t.reference(User)),
});

// export const Reviews = t.model('Reviews', {
//   type: t.frozen(),
//   state: t.frozen(),
//   rating: t.frozen(),
//   content: t.frozen(),
//   createdAt: t.frozen(),
//   relationships: t.maybe(Relationships),
// });
export const Review = t.model('Reviews', {
  type: t.frozen(),
  state: t.frozen(),
  rating: t.frozen(),
  content: t.frozen(),
  createdAt: t.frozen(),
  relationships: t.frozen(),
  // relationships: t.maybe(Relationships),
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

export const ReviewStore = t.model('ReviewsStore', {
  list: ReviewList,

  fetchReviews: createFlow(fetchReviews),
});

function fetchReviews(flow, store) {
  return function* fetchReviews() {
    try {
      flow.start();
      const res = yield store.Api.getReviews({
        listingId: getEnv(store).relationships.listing.id,
        // listingId: store.relationships.listing.id,
      });
      const entities = normalizedIncluded(res.data.included);
      const snapshot = res.data.data.map((i) => processJsonApi(i));
      console.log('SNAPSHOTS_REVIEW', snapshot);
      // store.update(res.data.data);
      const test = getRoot(store).reviews;
      getRoot(store).reviews.merge(res.data.data);

      // const normalizedEntities = normalizedIncluded(
      //   res.data.included,
      // );
      // getRoot(store).entities.merge(normalizedEntities);

      // store.list.append(res.data.data);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}
