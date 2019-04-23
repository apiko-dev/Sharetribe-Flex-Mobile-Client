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

const Transitions = t.model('Transactions', {
  transition: t.string,
  createdAt: t.Date,
  by: t.string,
});

export const Transaction = t.model('Transaction', {
  id: t.string,
  type: t.maybe(t.string),
  createdAt: t.Date,
  processName: t.string,
  processVersion: t.number,
  lastTransition: t.maybe(t.string),
  lastTransitionedAt: t.maybe(t.Date),
  payinTotal: t.maybeNull(Price),
  payoutTotal: t.maybeNull(Price),
  lineItems: t.maybe(t.array(LineItems)),
  protectedData: t.model({}),
  transitions: t.maybe(t.array(Transitions)),

  messages: t.optional(MessageStore, {}),
});

const TransactionList = listModel('TransactionList', {
  of: t.reference(Transaction),
  entityName: 'transaction',
  identifierName: 'id',
  responseTransformer,
});

function responseTransformer(res) {
  // return res.map(processJsonApiTransactions);
  return res.map(processJsonApi);
}

export const TransactionStore = t
  .model('ListingsStore', {
    list: TransactionList,
    initiateTransaction: createFlow(initiateTransaction),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }));

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

export default TransactionStore;
