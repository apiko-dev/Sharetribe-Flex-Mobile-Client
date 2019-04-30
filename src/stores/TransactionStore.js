/* eslint-disable no-shadow */
import { types as t, getEnv, getRoot } from 'mobx-state-tree';
import createFlow from './helpers/createFlow';
import processJsonApi, {
  processJsonApiTransactions,
} from './utils/processJsonApi';
import listModel from './utils/listModel';
import { MessageStore } from './MessagesStore';
import { Price } from './ListingsStore';
import { normalizedIncluded } from './utils/normalize';

const LineItems = t.model('LineItems', {
  code: t.string,
  quantity: t.number,
  reversal: t.boolean,
  unitPrice: Price,
  lineTotal: Price,
  includeFor: t.array(t.string),
});

const Transitions = t
  .model('Transactions', {
    transition: t.string,
    createdAt: t.Date,
    by: t.string,
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    createdAt: new Date(snapshot.createdAt),
  }));

// const Relationships = t.model('Relationships', {
//   // messages: t.optional(MessageStore, {}),
//   // listing: t.optional(Product, {}),
//   // booking: t.optional({}),
//   attributes: t.optional({}),
// });

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
    // lineItems: t.maybe(t.array(LineItems)),
    protectedData: t.model({}),
    // transitions: t.maybe(t.array(Transitions)),

    messages: t.optional(MessageStore, {}),
    // listings: t.optional(ListingsStore, {}),
    // relationships: t.optional(Relationships, {}),
  })

  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    createdAt: new Date(snapshot.createdAt),
    lastTransitionedAt: new Date(snapshot.lastTransitionedAt),
  }));

const TransactionList = listModel('TransactionList', {
  of: t.reference(Transaction),
  entityName: 'transaction',
  identifierName: 'id',
  responseTransformer,
});

function responseTransformer(res) {
  // if (Array.isArray(res)) {
  //   return res.data.data.map((i) => processJsonApi(i));
  // }
  return res.map(processJsonApi);
}

export const TransactionStore = t
  .model('ListingsStore', {
    list: TransactionList,
    initiateTransaction: createFlow(initiateTransaction),

    initiateMessageTransaction: createFlow(
      initiateMessageTransaction,
    ),
    fetchChatTransaction: createFlow(fetchChatTransaction),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }));
// ////////////
function initiateMessageTransaction(flow, store) {
  return function* initiateMessage(listingId) {
    try {
      flow.start();

      const res = yield flow.Api.initiateMessageTransaction(
        listingId,
      );
      //
      debugger;
      // store.list.add(res.data.data);
      const data = processJsonApi(res.data.data);
      console.log('data: ', data);
      // getParent(store, 2).add(data)
      store.list.add(data);
      debugger;
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}
// //////////
function initiateTransaction(flow, store) {
  return function* initiateTransaction({
    listingId,
    startRent,
    endRent,
  }) {
    try {
      flow.start();

      console.log(
        'initiateTransaction data: ',
        listingId,
        startRent,
        endRent,
      );

      const res = yield store.Api.initiateTransaction({
        listingId,
        startRent,
        endRent,
      });

      console.log('initiateTransaction res: ', res);

      const data = processJsonApiTransactions(res.data.data);
      console.log('data: ', data);
      store.list.add(data);

      const transactions = yield store.Api.fetchTransactions();

      console.log('fetchTransactions res: ', transactions);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function fetchTransaction(flow, store) {
  return function* initiateTransaction({
    listingId,
    startRent,
    endRent,
  }) {
    try {
      flow.start();

      console.log(
        'initiateTransaction data: ',
        listingId,
        startRent,
        endRent,
      );

      const res = yield store.Api.initiateTransaction({
        listingId,
        startRent,
        endRent,
      });

      console.log('initiateTransaction res: ', res);

      const data = processJsonApiTransactions(res.data.data);
      console.log('data: ', data);
      store.list.add(data);

      const transactions = yield store.Api.fetchTransactions();

      console.log('fetchTransactions res: ', transactions);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function fetchChatTransaction(flow, store) {
  return function* initiateTransaction(listingId) {
    try {
      flow.start();

      const res = yield store.Api.transactionsQuery({
        only: 'sale',
        lastTransitions: ['transition/request'],
      });

      const transactions = res.data.data.map((i) =>
        processJsonApi(i),
      );
      // const transactions = res.data.data.map((i) => i);

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );
      debugger;
      const listingsTransaction = transactions.filter(
        (i) => i.relationships.listing === listingId,
      );
      debugger;
      const listingTransaction = listingsTransaction[0];
      if (
        // listingTransaction.length === 0 &&
        typeof listingTransaction === 'undefined'
      ) {
        store.initiateMessageTransaction.run(listingId);
      } else {
        // const messageHistory = yield store.Api.transactionsShow(
        //   listingTransaction.id,
        // );
        store.list.add(listingTransaction);
        // store.list.add(res.data.data[0]);

        // const transactionRes = yield store.Api.transactionsShow(
        //   listingTransaction.id,
        // );
        // const processTransaction = processJsonApi(
        //   transactionRes.data.data,
        // );
        // store.list.add(processTransaction);
      }

      debugger;

      flow.success();
    } catch (err) {
      debugger;
      flow.failed(err, true);
    }
  };
}

export default TransactionStore;
