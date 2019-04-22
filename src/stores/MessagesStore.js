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

// const CreateTime = t.model('CreateTime', {
//   atTime: t.string,
// });

const MessageRelationships = t.model('MessageRelationships', {
  sender: t.reference(User),
  // sender: t.string,
});

// const MessageId = t.model('MessageId', {
//   uuid: t.string,
// });

// const MessageAttributes = t.model('MessageAttributes', {
//   createdAt: t.string,
//   // createdAt: t.optional(t.maybeNull(CreateTime), null),
//   content: t.string,
// });

export const Message = t.model('Message', {
  id: t.identifier,
  // attributes: t.maybe(MessageAttributes),
  // relationships: t.optional(t.maybeNull(MessageRelationships), null),
  // type: t.string,
  content: t.string,
  createdAt: t.maybe(t.Date),
  relationships: t.optional(t.maybeNull(MessageRelationships), null),
  // id: t.optional(t.maybeNull(MessageId), null),
  // id: t.string,
});

export const MessageList = listModel('MessageList', {
  of: t.reference(Message),
  entityName: 'message',
  identifierName: 'id',
  responseTransformer,
});

function responseTransformer(res) {
  return res.map(processJsonApi);
}

export const MessageStore = t.model('MessageStore', {
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

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );

      getRoot(store).entities.merge(normalizedEntities);
      store.list.set(res.data.data);

      console.log('fkfkfkfk', store.list.asArray);
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
      console.log('Message', res);
      // const normalizedEntities = normalizedIncluded(
      //   res.data.included,
      // );

      // getRoot(store).entities.merge(normalizedEntities);
      store.list.add(res.data.data);

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
