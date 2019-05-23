import { types as t, getEnv, getRoot } from 'mobx-state-tree';
import { User } from './UserStore';
import { Product } from './ListingsStore';
import listModel from './utils/listModel';
import processJsonApi from './utils/processJsonApi';
// import { averageRating } from './utils/rating';
import createFlow from './helpers/createFlow';
import { normalizedIncluded } from './utils/normalize';

const Relationships = t.model('Relationships', {
  author: t.maybe(t.reference(User)),
  listing: t.maybe(t.reference(Product)),
  subject: t.maybe(t.reference(User)),
});

export const Review = t.model('Reviews', {
  id: t.identifier,
  type: t.maybeNull(t.string),
  state: t.maybeNull(t.string),
  rating: t.maybeNull(t.number),
  content: t.maybeNull(t.string),
  createdAt: t.maybeNull(t.Date),
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

    fetchReviewsForUser: createFlow(fetchReviewsForUser),
    fetchReviewsForListing: createFlow(fetchReviewsForListing),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }));

function fetchReviewsForUser(flow, store) {
  return function* fetchReviewsForUser({ subjectId }) {
    try {
      flow.start();
      let averageRating = 0;
      const res = yield store.Api.fetchReviewsForUser({
        subjectId,
        perPage: 10,
        page: 1,
      });
      const ratings = res.data.data.map(
        (i) => processJsonApi(i).rating,
      );
      if (ratings.length > 0) {
        const rating = ratings.reduce((acc, current) => {
          acc + current;
        });
        averageRating = rating / ratings.length;
        const normalizedEntities = normalizedIncluded(
          res.data.included,
        );
        getRoot(store).entities.merge(normalizedEntities);
        store.list.set(res.data.data);
      }
      flow.success();
      return averageRating;
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function fetchReviewsForListing(flow, store) {
  return function* fetchReviewsForListing({ listingId }) {
    try {
      flow.start();
      let averageRating = 0;
      const res = yield store.Api.fetchReviewsForListing({
        listingId,
        perPage: 10,
        page: 1,
      });
      const ratings = res.data.data.map(
        (i) => processJsonApi(i).rating,
      );
      if (ratings.length > 0) {
        const rating = ratings.reduce((acc, current) => {
          acc + current;
        });
        averageRating = rating / ratings.length;
        const normalizedEntities = normalizedIncluded(
          res.data.included,
        );
        getRoot(store).entities.merge(normalizedEntities);
        store.list.set(res.data.data);
      }
      flow.success();
      return averageRating;
    } catch (err) {
      flow.failed(err, true);
    }
  };
}
