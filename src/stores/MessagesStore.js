import { types as t } from 'mobx-state-tree';
import R from 'ramda';
import createFlow from './helpers/createFlow';
import processJsonApi from './utils/processJsonApi';
import listModel from './utils/listModel';
import { normalizedIncluded } from './utils/normalize';

const TypeSender = t.model('TypeSender', {
  type: t.string,
});
const Sender = t.model('Sender', {
  user: t.optional(t.maybeNull(TypeSender), null),
});
const MessageRelationships = t.model('MessageRelationships', {
  sender: t.optional(t.maybeNull(Sender), null),
});

const MessageId = t.model('MessageId', {
  uuid: t.string,
});

const MessageAttributes = t.model('MessageAttributes', {
  createdAt: t.string,
  content: t.string,
});

export const Message = t.model('Message', {
  attributes: t.optional(t.maybeNull(MessageAttributes), null),
  id: t.optional(t.maybeNull(MessageId), null),
  relationships: t.optional(t.maybeNull(MessageRelationships), null),
  type: t.string,
});

const MessageList = listModel('MessageList', {
  of: t.reference(Message),
  entityName: 'listing',
  identifierName: 'id',
  responseTransformer,
});

function responseTransformer(res) {
  return res.map(processJsonApi);
}

const MessageStore = t.model('Messages', {
  list: MessageList,

  messageTransaction: createFlow(messageTransaction),
  sendMessage: createFlow(sendMessage),
  fetchMessage: createFlow(fetchMessage),
});

function fetchMessage(flow, store) {
  return function* fetchMessage(transactionId) {
    try {
      flow.start();

      const res = yield flow.Api.fetchMessage({
        transactionId,
        include: ['sender', 'sender.profileImage'],
      });
      console.log('Message', res);

      // const snapshot = processJsonApi(res.data.data);
      // const entities = normalizedIncluded(res.data.included);
      // const entities = normalizedIncluded(res.data.data);
      // applySnapshot(store, snapshot);
      // getRoot(store).entities.merge(entities);
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}
function sendMessage(flow, store) {
  return function* sendMessage(transactionId, content) {
    try {
      flow.start();

      const res = yield flow.Api.sendMessage({
        transactionId,
        content,
        include: ['sender', 'sender.profileImage'],
      });
      console.log('Message___________', res);
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}
function messageTransaction(flow, store) {
  return function* messageTransaction(listingId) {
    try {
      flow.start();

      const res = yield flow.Api.initiateMessageTransaction(
        listingId,
      );
      console.log(res);
      const transactionId = res.data.data.id;
      store.setTransactionId(transactionId);
      // debugger;
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

export default MessageStore;
