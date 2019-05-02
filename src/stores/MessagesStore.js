import { types as t, getRoot, getParent } from 'mobx-state-tree';
import R from 'ramda';
import createFlow from './helpers/createFlow';
import processJsonApi from './utils/processJsonApi';
import listModel from './utils/listModel';
import { User } from './UserStore';
import { normalizedIncluded } from './utils/normalize';

const MessageRelationships = t.model('MessageRelationships', {
  sender: t.maybe(t.reference(User)),
});

export const Message = t
  .model('Message', {
    id: t.identifier,

    content: t.string,
    createdAt: t.maybe(t.Date),
    relationships: t.optional(MessageRelationships, {}),
  })

  .views((store) => ({
    get sender() {
      return store.relationships.sender || getRoot(store).viewer.user;
    },
  }));

export const MessageList = listModel('MessageList', {
  of: t.reference(Message),
  entityName: 'message',
  identifierName: 'id',
  responseTransformer,
  shouldTransformSingle: true,
  perPage: 15,
});

function responseTransformer(res) {
  return res.map(processJsonApi);
}

export const MessageStore = t
  .model('MessageStore', {
    list: MessageList,

    messageTransaction: createFlow(messageTransaction),
    sendMessage: createFlow(sendMessage),
    fetchMessages: createFlow(fetchMessages),
    fetchMoreMessages: createFlow(fetchMoreMessages),
  })

  .views((store) => ({
    get messagesLength() {
      return store.list.asArray.length;
    },
  }));

function initiateMessage(flow, store) {
  return function* initiateMessage(listingId) {
    try {
      flow.start();

      const res = yield flow.Api.initiateMessageTransaction(
        listingId,
      );

      const data = processJsonApi(res.data.data);
      getParent(store, 2).add(data);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function fetchMessages(flow, store) {
  return function* fetchMessages() {
    try {
      flow.start();
      const transactionId = getParent(store).id;
      const res = yield flow.Api.fetchMessage({
        transactionId,
        include: ['sender', 'sender.profileImage'],
        perPage: 15,
        page: 1,
      });

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

function fetchMoreMessages(flow, store) {
  return function* fetchMoreMessages() {
    try {
      flow.start();
      const page = store.list.pageNumber;
      const perPage = 15;
      const transactionId = getParent(store).id;
      if (!store.list.hasNoMore) {
        const res = yield flow.Api.fetchMessage({
          transactionId,
          include: ['sender', 'sender.profileImage'],
          perPage,
          page,
        });

        const normalizedEntities = normalizedIncluded(
          res.data.included,
        );

        getRoot(store).entities.merge(normalizedEntities);
        store.list.append(res.data.data);
      }

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function sendMessage(flow, store) {
  return function* sendMessage(content) {
    try {
      flow.start();

      const transactionId = getParent(store).id;
      const res = yield flow.Api.sendMessage({
        transactionId,
        content,
        include: ['sender', 'sender.profileImage'],
      });

      store.list.prepend([res.data.data]);

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
      const transactionId = res.data.data.id;
      getParent(store).setTransactionId(transactionId);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

export default MessageStore;
