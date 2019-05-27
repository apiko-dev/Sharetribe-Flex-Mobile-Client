import {
  types as t,
  getEnv,
  getRoot,
  hasParentOfType,
  getParent,
  getIdentifier,
} from 'mobx-state-tree';
import { User } from './UserStore';
import { Product } from './ListingsStore';
import listModel from './utils/listModel';
import processJsonApi from './utils/processJsonApi';
import createFlow from './helpers/createFlow';
import { normalizedIncluded } from './utils/normalize';
import { Viewer } from './ViewerStore';
import isSameType from './utils/isSameType';

const Relationships = t.model('Relationships', {
  author: t.maybe(t.reference(t.late(() => User))),
  listing: t.maybe(t.reference(Product)),
  subject: t.maybe(t.reference(t.late(() => User))),
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

    fetchReviews: createFlow(fetchReviews),
    // fetchReviewsForListing: createFlow(fetchReviewsForListing),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },

    get averageRating() {
      if (store.list.array.length > 0) {
        const ratings = store.list.array
          .map((i) => i.rating)
          .filter((i) => i !== null);

        const rating = ratings.reduce((acc, current) => {
          return acc + current;
        });

        const averageRating = rating / ratings.length;
        return averageRating;
      }
    },

    get ratings() {
      const ratings = store.list.array
        .map((i) => i.rating)
        .filter((i) => i !== null);

      return ratings;
    },
  }));

function fetchReviews(flow, store) {
  return function* fetchReviews() {
    try {
      const params = {
        perPage: 10,
        page: 1,
      };

      const parent = getParent(store);
 
      if (isSameType(parent, User) || isSameType(parent, Viewer)) {

        params.subjectId = getIdentifier(parent);
      } else {
        params.listingId = getIdentifier(parent);
      }

      flow.start();
      const res = yield store.Api.fetchReviews({ params });

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
