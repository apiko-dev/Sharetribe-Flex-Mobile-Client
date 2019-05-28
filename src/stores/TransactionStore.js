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
      const transition = transitionStatuses.REVIEW_CUSTOMER_1;

      const res = yield store.Api.changeTransactionsView({
        transactionId: store.id,
        transition,
        content,
        rating,
      });
      const snapshot = processJsonApiTransactions(res.data.data);
      store.update(snapshot);
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
