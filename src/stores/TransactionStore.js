/* eslint-disable no-shadow */
import { types as t, getEnv } from 'mobx-state-tree';
import createFlow from './helpers/createFlow';
import processJsonApi, {
  processJsonApiTransactions,
} from './utils/processJsonApi';
import listModel from './utils/listModel';
import { Price } from './ListingsStore';

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
});

const TransactionList = listModel('TransactionList', {
  of: t.reference(Transaction),
  entityName: 'transaction',
  identifierName: 'id',
  responseTransformer,
});

function responseTransformer(res) {
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
    // monthExpiration,
    // yearExpiration,
    // message,
  }) {
    try {
      flow.start();

      // TODO: Make request to create cardToken here

      const res = yield store.Api.initiateTransaction({
        listingId,
        startRent,
        endRent,
        // cardToken,
      });

      const data = processJsonApiTransactions(res.data.data);
      store.list.add(data);

      // TODO: Send message by transaction id
      //
      // if(!!message) {
      // yield store.Api.sendMessage({
      //  transactionId: data.id,
      //  content: message,
      //  });
      // }

      // const transactions = yield store.Api.fetchTransactions(); Using for test
      // console.log('fetchTransactions res: ', transactions);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

export default TransactionStore;
