/* eslint-disable no-shadow */
import { types as t, getEnv, getRoot } from 'mobx-state-tree';
import { StripeService } from '../services';

import createFlow from './helpers/createFlow';
import processJsonApi, {
  processJsonApiTransactions,
  processJsonApiIncluded,
} from './utils/processJsonApi';
import listModel from './utils/listModel';
import { MessageStore } from './MessagesStore';
import { Price, Product } from './ListingsStore';
import { User } from './UserStore';
import { Booking } from './BookingStore';
import { Review } from './ReviewsStore';
import { normalizedIncluded } from './utils/normalize';
import { transitionStatuses } from '../constants';

// const UnitPrice = t.model('UnitPrice', {});
// const LineTotal = t.model('LineTotal', {});
// const Quantity = t.model('Quantity', {
//   value: t.number,
// });
// const Percentage = t.model('Percentage', {});
// const IncludeFor = t.enumeration('LineItemsInclude', [
//   'customer',
//   'provider',
// ]);

// const PayInfo = t.model('Night', {
//   code: t.string,
//   includeFor: t.array(IncludeFor),
//   reversal: t.boolean,
//   // lineTotal: t.maybeNull(LineTotal),
//   // percentage: t.optional(t.maybeNull(Percentage), null),
//   // quantity: t.optional(t.maybeNull(Quantity), null),
//   // unitPrice: t.optional(t.maybeNull(UnitPrice), null),
//   lineTotal: t.frozen(),
//   quantity: t.frozen(),
//   unitPrice: t.frozen(),
//   percentage: t.maybe(t.frozen()),
// });

// const LineItems = t.model('LineItems', {
//   0: t.optional(t.maybeNull(PayInfo), null),
//   1: t.optional(t.maybeNull(PayInfo), null),
// });

const Relationships = t.model('Relationships', {
  listing: t.maybe(t.reference(Product)),
  booking: t.optional(t.maybeNull(t.reference(Booking))),
  reviews: t.optional(t.maybeNull(t.reference(Review))),
  customer: t.optional(t.maybeNull(t.reference(User))),
  provider: t.optional(t.maybeNull(t.reference(User))),
});

export const Transaction = t
  .model('Transaction', {
    id: t.identifier,
    type: t.maybe(t.string),
    createdAt: t.Date,
    processName: t.string,
    processVersion: t.number,
    lastTransition: t.maybe(t.string),
    lastTransitionedAt: t.maybe(t.Date),
    payinTotal: t.maybeNull(Price),
    payoutTotal: t.maybeNull(Price),
    // lineItems: t.optional(t.maybeNull(LineItems), null),
    protectedData: t.model({}),
    messages: t.optional(MessageStore, {}),
    relationships: t.maybe(Relationships),

    changeStateTransactions: createFlow(changeStateTransactions),
    initiateOrderAfterEnquiry: createFlow(initiateOrderAfterEnquiry),
    sentReview: createFlow(sentReview),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },

    get isViewer() {
      return store.relationships.listing.relationships.author
        .isViewer;
    },

    get imageUrl() {
      return store.relationships.listing.relationships.getImages[0]
        .variants.default.url;
    },
  }))
  .actions((store) => ({
    update(snapshot) {
      Object.assign(store, snapshot);
    },
  }));

function sentReview(flow, store) {
  return function* initiatechangeStateTransactionsTransaction({
    content,
    rating,
  }) {
    try {
      flow.start();
      // const transition1 = store.isViewer
      //   ? transitionStatuses.REVIEW_PROVIDER_1
      //   : transitionStatuses.REVIEW_CUSTOMER_1;
      // const transition2 = store.isViewer
      //   ? transitionStatuses.REVIEW_PROVIDER_2
      //   : transitionStatuses.REVIEW_CUSTOMER_2;
      // const transition =
      //   store.lastTransition === transitionStatuses.DELIVERED
      //     ? transition1
      //     : transition2;
      const transition = transitionStatuses.REVIEW_CUSTOMER_1;

      const res = yield store.Api.changeTransactionsView({
        transactionId: store.id,
        transition,
        content,
        rating,
      });

      // store.update(snapshot);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function changeStateTransactions(flow, store) {
  return function* initiatechangeStateTransactionsTransaction({
    transition,
  }) {
    try {
      flow.start();
      const res = yield store.Api.changeStateTransactions({
        transactionId: store.id,
        transition,
      });

      const snapshot = processJsonApiTransactions(res.data.data);
      store.update(snapshot);
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function initiateOrderAfterEnquiry(flow, store) {
  return function* initiateTransaction({
    transition,
    transactionId,
    listingId,
    startRent,
    endRent,
    cardNumber,
    monthExpiration,
    yearExpiration,
    cardCVC,
    message,
  }) {
    try {
      flow.start();
      const expMonth = Number(monthExpiration);
      const expYear = Number(yearExpiration);

      const paramsToken = {
        number: cardNumber,
        expMonth,
        expYear,
        cvc: cardCVC,
      };

      const cardToken = yield StripeService.createTokenWithCard(
        paramsToken,
      );

      const { tokenId } = cardToken;

      const res = yield store.Api.changeTransactionsAfterEnquiry({
        transactionId,
        transition,
        listingId,
        cardToken: tokenId,
        startRent,
        endRent,
      });

      const snapshot = processJsonApi(res.data.data);
      store.update(snapshot);
      const entities = normalizedIncluded(res.data.included);
      getRoot(store).entities.merge(entities);

      if (message) {
        yield store.Api.sendMessage({
          transactionId: snapshot.id,
          content: message,
          include: ['sender', 'sender.profileImage'],
        });
      }

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

const TransactionList = listModel('TransactionList', {
  of: t.reference(Transaction),
  entityName: 'transaction',
  identifierName: 'id',
  responseTransformer,
  perPage: 15,
});

function responseTransformer(res) {
  return res.map(processJsonApi);
}

export const TransactionStore = t
  .model('ListingsStore', {
    list: TransactionList,
    initiateTransaction: createFlow(initiateTransaction),

    initiateMessageTransaction: createFlow(
      initiateMessageTransaction,
    ),
    fetchTransactions: createFlow(fetchTransactions),
    fetchMoreTransactions: createFlow(fetchMoreTransactions),
    changeStateTransactions: createFlow(changeStateTransactions),
    fetchTransactionById: createFlow(fetchTransactionById),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }))

  .actions((store) => ({
    update(snapshot) {
      Object.assign(store, snapshot);
    },
  }));

function initiateMessageTransaction(flow, store) {
  return function* initiateMessage(listingId) {
    try {
      flow.start();

      const res = yield flow.Api.initiateMessageTransaction(
        listingId,
      );

      const data = processJsonApi(res.data.data);
      store.list.addToBegin(data);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function initiateTransaction(flow, store) {
  return function* initiateTransaction({
    listingId,
    startRent,
    endRent,
    cardNumber,
    monthExpiration,
    yearExpiration,
    cardCVC,
    message,
  }) {
    try {
      flow.start();
      const expMonth = Number(monthExpiration);
      const expYear = Number(yearExpiration);

      const params = {
        number: cardNumber,
        expMonth,
        expYear,
        cvc: cardCVC,
      };

      const cardToken = yield StripeService.createTokenWithCard(
        params,
      );

      const { tokenId } = cardToken;

      const res = yield store.Api.initiateTransaction({
        listingId,
        startRent,
        endRent,
        cardToken: tokenId,
      });
      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );
      getRoot(store).entities.merge(normalizedEntities);

      const data = processJsonApi(res.data.data);
      store.list.addToBegin(data);

      if (message) {
        yield store.Api.sendMessage({
          transactionId: data.id,
          content: message,
          include: ['sender', 'sender.profileImage'],
        });
      }

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function fetchTransactionById(flow, store) {
  return function* fetchTransaction(transactionId) {
    try {
      flow.start();

      const res = yield store.Api.transactionsShow({
        transactionId,
      });
      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );
      getRoot(store).entities.merge(normalizedEntities);

      const data = processJsonApiTransactions(res.data.data);
      store.list.add(data);
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function fetchTransactions(flow, store) {
  return function* fetchTransaction() {
    try {
      flow.start();

      const res = yield store.Api.fetchTransactions({
        perPage: 15,
        page: 1,
      });
      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );
      getRoot(store).entities.merge(normalizedEntities);

      // TODO: Fetch listings for each transaction
      // since transaction doesn't include the listing relationships
      // We have to fetch each listing by it id
      // Fetching multiple listings by array of ids is not currently supported

      store.list.set(res.data.data);
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function fetchMoreTransactions(flow, store) {
  return function* fetchTransactions() {
    try {
      if (store.list.hasNoMore || flow.inProgress) {
        return;
      }

      flow.start();
      const page = store.list.pageNumber;
      const perPage = 15;

      const res = yield store.Api.fetchTransactions({
        perPage,
        page,
      });

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );
      getRoot(store).entities.merge(normalizedEntities);

      store.list.append(res.data.data);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

export default TransactionStore;

JW->MR
review by customer 1
const data = {
  status: 200,
  data: {
    data: {
      id: { uuid: '5ce5649e-ea54-4f4e-b84e-1fe33f31756f' },
      type: 'transaction',
      attributes: {
        processName: 'preauth-with-nightly-booking',
        transitions: [
          {
            transition: 'transition/request',
            createdAt: '2019-05-22T15:02:55.967Z',
            by: 'customer',
          },
          {
            transition: 'transition/accept',
            createdAt: '2019-05-22T15:07:45.159Z',
            by: 'provider',
          },
          {
            transition: 'transition/complete',
            createdAt: '2019-05-23T00:00:30.376Z',
            by: 'system',
          },
          {
            transition: 'transition/review-1-by-customer',
            createdAt: '2019-05-23T13:17:16.204Z',
            by: 'customer',
          },
        ],
        payoutTotal: { amount: 8010, currency: 'USD' },
        processVersion: 2,
        createdAt: '2019-05-22T15:02:54.713Z',
        lastTransitionedAt: '2019-05-23T13:17:16.204Z',
        protectedData: {},
        lineItems: [
          {
            code: 'line-item/night',
            unitPrice: { amount: 8900, currency: 'USD' },
            lineTotal: { amount: 8900, currency: 'USD' },
            reversal: false,
            includeFor: ['customer', 'provider'],
            quantity: { value: '1' },
          },
          {
            code: 'line-item/provider-commission',
            unitPrice: { amount: 8900, currency: 'USD' },
            lineTotal: { amount: -890, currency: 'USD' },
            reversal: false,
            includeFor: ['provider'],
            percentage: { value: '-10.0' },
          },
        ],
        lastTransition: 'transition/review-1-by-customer',
        payinTotal: { amount: 8900, currency: 'USD' },
      },
      relationships: {
        provider: {
          data: {
            id: { uuid: '5cd190e1-137a-428e-8cc9-0f29921f2526' },
            type: 'user',
          },
        },
        customer: {
          data: {
            id: { uuid: '5cd188f0-1915-4c64-abea-00ebb6c3e235' },
            type: 'user',
          },
        },
        listing: {
          data: {
            id: { uuid: '5cdd98e1-1f09-460e-80d6-214e44879e00' },
            type: 'listing',
          },
        },
        reviews: {
          data: [
            {
              id: { uuid: '5ce69d5c-6266-415e-b2e3-d5a311d82f18' },
              type: 'review',
            },
          ],
        },
        messages: {
          data: [
            {
              id: { uuid: '5ce564a0-7344-43e3-96df-944f145bf279' },
              type: 'message',
            },
            {
              id: { uuid: '5ce69597-643b-4f0e-91fb-562da2bc9e9d' },
              type: 'message',
            },
            {
              id: { uuid: '5ce69b9b-0e54-472c-a8db-3ea226a0864c' },
              type: 'message',
            },
          ],
        },
      },
    },
    included: [
      {
        id: { uuid: '5cd190e1-137a-428e-8cc9-0f29921f2526' },
        type: 'user',
        attributes: {
          banned: false,
          deleted: false,
          createdAt: '2019-05-07T14:06:25.334Z',
          profile: {
            displayName: 'Mark Ruffalo',
            abbreviatedName: 'MR',
            bio: null,
            publicData: {},
          },
        },
        relationships: { profileImage: { data: null } },
      },
      {
        id: { uuid: '5cd188f0-1915-4c64-abea-00ebb6c3e235' },
        type: 'user',
        attributes: {
          banned: false,
          deleted: false,
          createdAt: '2019-05-07T13:32:33.274Z',
          profile: {
            displayName: 'John Wick',
            abbreviatedName: 'JW',
            bio: null,
            publicData: {},
          },
        },
        relationships: { profileImage: { data: null } },
      },
      {
        id: { uuid: '5cdd98e1-1f09-460e-80d6-214e44879e00' },
        type: 'listing',
        attributes: {
          description: 'Bxbzbxbx d d dd. D d',
          deleted: false,
          geolocation: { lat: 34.094994, lng: -118.332245 },
          createdAt: '2019-05-16T17:07:45.680Z',
          state: 'published',
          title: 'Wood',
          publicData: {
            brand: 'Hh',
            category: 'Sport',
            description: 'Bxbzbxbx d d dd. D d',
            level: 'Dfg',
            location: 'Savannah, GA, USA',
            price: 8900,
            subCategory: 'Football',
            title: 'Wood',
          },
          price: { amount: 8900, currency: 'USD' },
          metadata: {},
        },
      },
      {
        id: { uuid: '5ce69d5c-6266-415e-b2e3-d5a311d82f18' },
        type: 'review',
        attributes: {
          type: 'ofProvider',
          state: 'pending',
          createdAt: '2019-05-23T13:17:16.189Z',
          rating: null,
          content: null,
        },
        relationships: {
          author: {
            data: {
              id: { uuid: '5cd188f0-1915-4c64-abea-00ebb6c3e235' },
              type: 'user',
            },
          },
          subject: {
            data: {
              id: { uuid: '5cd190e1-137a-428e-8cc9-0f29921f2526' },
              type: 'user',
            },
          },
        },
      },
      {
        id: { uuid: '5ce564a0-7344-43e3-96df-944f145bf279' },
        type: 'message',
        attributes: {
          content:
            'REVIEW_PROVIDER_1 REVIEW_PROVIDER_1 REVIEW_PROVIDER_1 REVIEW_PROVIDER_1 REVIEW_PROVIDER_1 REVIEW_PROVIDER_1 REVIEW_PROVIDER_1 REVIEW_PROVIDER_1 REVIEW_PROVIDER_1 REVIEW_PROVIDER_1 ',
          createdAt: '2019-05-22T15:02:56.337Z',
        },
      },
      {
        id: { uuid: '5ce69597-643b-4f0e-91fb-562da2bc9e9d' },
        type: 'message',
        attributes: {
          content: 'Ннн',
          createdAt: '2019-05-23T12:44:07.342Z',
        },
      },
      {
        id: { uuid: '5ce69b9b-0e54-472c-a8db-3ea226a0864c' },
        type: 'message',
        attributes: {
          content: 'T',
          createdAt: '2019-05-23T13:09:47.913Z',
        },
      },
    ],
  },
};
