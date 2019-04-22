import {
  types as t,
  getRoot,
  getParent,
  applySnapshot,
} from 'mobx-state-tree';
import R from 'ramda';
import createFlow from './helpers/createFlow';
import processJsonApi from './utils/processJsonApi';
import listModel from './utils/listModel';
import { User } from './UserStore';
import { normalizedIncluded } from './utils/normalize';

// const TypeSender = t.model('TypeSender', {
//   type: t.string,
// });
// const Sender = t.model('Sender', {
//   user: t.optional(t.maybeNull(TypeSender), null),
// });

const CreateTime = t.model('CreateTime', {
  atTime: t.string,
});

const MessageRelationships = t.model('MessageRelationships', {
  user: t.reference(User),
});

// const MessageId = t.model('MessageId', {
//   uuid: t.string,
// });

const MessageAttributes = t.model('MessageAttributes', {
  // createdAt: t.string,
  createdAt: t.optional(t.maybeNull(CreateTime), null),
  content: t.string,
});

export const Message = t.model('Message', {
  attributes: t.optional(t.maybeNull(MessageAttributes), null),
  id: t.string,
  // id: t.optional(t.maybeNull(MessageId), null),
  relationships: t.optional(t.maybeNull(MessageRelationships), null),
  type: t.string,
  // type: t.union(t.literal('message'), t.literal('user')),
});

// content: t.string,
// createdAt: t.optional(t.maybeNull(CreateTime), null),
// id: t.optional(t.maybeNull(MessageId), null),
// relationships: t.optional(t.maybeNull(MessageRelationships), null),

export const MessageList = listModel('MessageList', {
  of: t.reference(Message),
  entityName: 'message',
  identifierName: 'id',
  responseTransformer,
});

function responseTransformer(res) {
  return res.map(processJsonApi);
}

export const MessageStore = t.model('Messages', {
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

      // const snapshot = res.data.data.map((i) => processJsonApi(i));
      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );

      getRoot(store).entities.merge(normalizedEntities);
      console.log('response', res.data.data);
      store.list.set(res.data.data);
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
      getParent(store).setTransactionId(transactionId);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

export default MessageStore;
