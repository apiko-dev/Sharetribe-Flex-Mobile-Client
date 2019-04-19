/* eslint-disable no-shadow */
import {
  types as t,
  getEnv,
  getRoot,
  applySnapshot,
} from 'mobx-state-tree';
import R from 'ramda';
import createFlow from './helpers/createFlow';
import { AlertService, NavigationService } from '../services';
import i18n from '../i18n';
import processJsonApi from './utils/processJsonApi';
import listModel from './utils/listModel';
import { Image } from './ImageStore';
import { User } from './UserStore';
import { normalizedIncluded } from './utils/normalize';
import { dates } from '../utils';

// const TypeSender = t.model('TypeSender', {
//   type: t.string,
// });
// const Sender = t.model('Sender', {
//   sender: t.optional(t.maybeNull(TypeSender), null),
// });
// const MessageRelationships = t.model('MessageRelationships', {
//   sender: t.optional(t.maybeNull(Sender), null),
// });

// const MessageId = t.model('MessageId', {
//   uuid: t.string,
// });

// const MessageAttributes = t.model('MessageAtributes', {
//   createdAt: t.string,
//   content: t.string,
// });

// const Message = t.model('Message', {
//   attributes: t.optional(t.maybeNull(MessageAttributes), null),
//   id: t.optional(t.maybeNull(MessageId), null),
//   relationships: t.optional(t.maybeNull(MessageRelationships), null),
//   type: t.string,
// });

const DayOfWeek = t.model('DayOfWeek', {
  dayOfWeek: t.string,
  seats: t.number,
});

const AvailabilityPlanTypes = t.enumeration('AvailabilityPlanTypes', [
  'availability-plan/day',
]);

const AvailabilityPlan = t.model('AvailabilityPlan', {
  type: AvailabilityPlanTypes,
  entries: t.array(DayOfWeek),
});

const Geolocation = t.model('Geolocation', {
  lat: t.maybe(t.number),
  lng: t.maybe(t.number),
});

const ProductPublicData = t.model('ProductPublicData', {
  brand: t.maybe(t.string),
  category: t.maybe(t.string),
  level: t.maybe(t.string),
  location: t.maybe(t.string),
  subCategory: t.maybe(t.string),
  phoneNumber: t.maybe(t.string),
});

export const Price = t.model('Price', {
  amount: t.number,
  currency: t.string,
});

const ProductRelationships = t
  .model('ProductRelationships', {
    images: t.maybe(t.array(t.reference(t.late(() => Image)))),
    author: t.maybe(t.reference(User)),
  })
  .views((store) => ({
    get getImages() {
      return store.images.slice();
    },

    get imageIds() {
      return store.images.slice().map((i) => i.id);
    },
  }));

export const Product = t
  .model('Product', {
    id: t.identifier,
    description: t.string,
    deleted: t.boolean,
    geolocation: t.optional(t.maybeNull(Geolocation), null),
    createdAt: t.maybe(t.Date),
    state: t.string,
    title: t.string,
    // transactionId: t.optional(t.maybeNull(t.string), null),
    // //
    // messages: t.array(Message),
    // // messages: t.optional(t.array(Message), null),
    // //
    publicData: t.optional(t.maybeNull(ProductPublicData), null),
    price: t.optional(t.maybeNull(Price), null),
    metadata: t.model('metadata', {}),
    relationships: t.maybe(ProductRelationships),
    availableDates: t.maybe(t.array(t.string)),
    employedDates: t.maybe(t.array(t.string)),

    availabilityPlan: t.optional(t.maybeNull(AvailabilityPlan), null),

    update: createFlow(updateProduct),
    getOwnFields: createFlow(getOwnFields),

    // messageTransaction: createFlow(messageTransaction),
    // sendMessage: createFlow(sendMessage),
    // fetchMessage: createFlow(fetchMessage),
  })

  .views((store) => ({
    get canEdit() {
      return (
        store.relationships.author.id ===
        R.path(['viewer', 'user', 'id'], getRoot(store))
      );
    },
  }))

  .actions((store) => ({
    setTransactionId({ uuid }) {
      store.transactionId = uuid;
    },
  }));

// function fetchMessage(flow, store) {
//   return function* fetchMessage(transactionId) {
//     try {
//       flow.start();

//       const res = yield flow.Api.fetchMessage({
//         transactionId,
//         include: ['sender', 'sender.profileImage'],
//       });
//       console.log('MessaMessaMessaMessaMessaMessaMessage_/', res);

//       const snapshot = res.data.data;
//       // const snapshot2 = processJsonApi(res.data.data);
//       // const entities = normalizedIncluded(res.data.included);
//       applySnapshot(store.messages, snapshot);
//       debugger;
//       flow.success();
//     } catch (err) {
//       flow.failed(err, true);
//     }
//   };
// }
// function sendMessage(flow, store) {
//   return function* sendMessage(transactionId, content) {
//     try {
//       flow.start();

//       const res = yield flow.Api.sendMessage({
//         transactionId,
//         content,
//         include: ['sender', 'sender.profileImage'],
//       });
//       console.log('MessaMessaMessaMessaMessaMessaMessage_/', res);
//       debugger;
//       flow.success();
//     } catch (err) {
//       flow.failed(err, true);
//     }
//   };
// }
// function messageTransaction(flow, store) {
//   return function* messageTransaction(listingId) {
//     try {
//       flow.start();

//       const res = yield flow.Api.initiateMessageTransaction(
//         listingId,
//       );
//       console.log(res);
//       const transactionId = res.data.data.id;
//       store.setTransactionId(transactionId);
//       // debugger;
//       flow.success();
//     } catch (err) {
//       flow.failed(err, true);
//     }
//   };
// }

function updateProduct(flow, store) {
  return function* updateProduct({ images, ...params }) {
    try {
      flow.start();

      const imagesToUpload = images.filter((i) => !!i.type);
      const restImagesIds = images
        .filter((i) => !i.type)
        .map((i) => String(i.id));
      const uploadedImagesIds = yield Promise.all(
        imagesToUpload.map((image) => flow.Api.imagesUpload(image)),
      );

      const imagesId = uploadedImagesIds.map((item) =>
        String(item.data.data.id.uuid),
      );

      const body = {
        ...params,
        availabilityPlanType: 'availability-plan/day',
        id: store.id,
        images: restImagesIds.concat(imagesId),
      };

      const res = yield flow.Api.updateOwnListings(body);
      const snapshot = processJsonApi(res.data.data);
      const entities = normalizedIncluded(res.data.included);
      getRoot(store).entities.merge(entities);
      applySnapshot(store, snapshot);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function getOwnFields(flow, store) {
  return function* updateProduct() {
    try {
      flow.start();

      const res = yield flow.Api.getOwnListing({
        id: store.id,
        include: ['images', 'author', 'author.profileImage'],
      });

      const snapshot = processJsonApi(res.data.data);
      applySnapshot(store, snapshot);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

const ProductList = listModel('ProductList', {
  of: t.reference(Product),
  entityName: 'listing',
  identifierName: 'id',
  responseTransformer,
});

const SearchProductList = listModel('SearchProductList', {
  of: t.reference(Product),
  entityName: 'listing',
  identifierName: 'id',
  responseTransformer,
});

const OwnProductList = listModel('OwnProductList', {
  of: t.reference(Product),
  entityName: 'listing',
  identifierName: 'id',
  responseTransformer,
});

const ParticularUserProductList = listModel('OwnProductList', {
  of: t.reference(Product),
  entityName: 'listing',
  identifierName: 'id',
  responseTransformer,
});

function responseTransformer(res) {
  return res.map(processJsonApi);
}

export const ListingsStore = t
  .model('ListingsStore', {
    list: ProductList,
    searchList: SearchProductList,
    ownList: OwnProductList,
    particularUserList: ParticularUserProductList,
    createListing: createFlow(createListing),
    fetchListings: createFlow(fetchListings),
    searchListings: createFlow(searchListings),
    fetchOwnListings: createFlow(fetchOwnListings),
    fetchParticularUserListings: createFlow(
      fetchParticularUserListings,
    ),
    getAvailableDays: createFlow(getAvailableDays),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }));

function createListing(flow, store) {
  return function* createListing({
    images,
    title,
    category,
    subCategory,
    brand,
    level,
    description,
    price,
    location,
    geolocation,
    entriesDay,
  }) {
    try {
      flow.start();
      const resImages = yield Promise.all(
        images.map((image) => store.Api.imagesUpload(image)),
      );

      const imagesId = resImages.map(
        (item) => item.data.data.id.uuid,
      );

      const res = yield store.Api.createListing({
        title,
        category,
        subCategory,
        brand,
        level,
        description,
        price,
        location,
        images: imagesId,
        geolocation,
        entriesDay,
        availabilityPlanType: 'availability-plan/day',
      });

      const data = processJsonApi(res.data.data);
      const entities = normalizedIncluded(res.data.included);
      getRoot(store).entities.merge(entities);
      store.ownList.addToBegin(data);
      store.list.addToBegin(data, false);

      flow.success();

      // TODO: move this alert into screen container
      AlertService.showAlert(
        i18n.t('alerts.createListingSuccess.title'),
        i18n.t('alerts.createListingSuccess.message'),
        [
          {
            text: i18n.t('common.ok'),
            onPress: () => NavigationService.navigateToHome(),
          },
        ],
      );
    } catch (err) {
      flow.failed(err);

      // TODO: move this alert into screen container
      AlertService.showAlert(
        i18n.t('alerts.createListingError.title'),
        i18n.t('alerts.createListingError.message'),
      );
    }
  };
}

function fetchListings(flow, store) {
  return function* fetchListings({ categories, title }) {
    try {
      flow.start();

      const res = yield store.Api.fetchListings({
        pub_category: categories,
        pub_title: title,
        include: ['images', 'author', 'author.profileImage'],
      });

      console.log(res);

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );

      getRoot(store).entities.merge(normalizedEntities);

      store.list.set(res.data.data);

      flow.success();
    } catch (err) {
      console.log(err);
      flow.failed();

      // TODO: move this alert into screen container
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );
    }
  };
}

function searchListings(flow, store) {
  return function* searchListings({ categories, title }) {
    try {
      flow.start();

      const res = yield store.Api.fetchListings({
        pub_category: categories,
        pub_title: title,
        include: ['images', 'author', 'author.profileImage'],
      });

      console.log(res);

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );

      getRoot(store).entities.merge(normalizedEntities);

      store.searchList.set(res.data.data);

      flow.success();
    } catch (err) {
      flow.failed();

      // TODO: move this alert into screen container
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );
    }
  };
}

function fetchOwnListings(flow, store) {
  return function* fetchOwnListings() {
    try {
      flow.start();

      const res = yield store.Api.fetchOwnListings({
        include: ['images', 'author', 'author.profileImage'],
      });

      console.log(res);

      store.ownList.set(res.data.data);

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );

      getRoot(store).entities.merge(normalizedEntities);

      flow.success();
    } catch (err) {
      console.log(err);
      flow.failed();

      // TODO: move this alert into screen container
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );
    }
  };
}

function fetchParticularUserListings(flow, store) {
  return function* fetchParticularUserListings(userId) {
    try {
      flow.start();
      console.log(userId);
      const res = yield store.Api.fetchListings({
        authorId: userId,
        include: ['images', 'author', 'author.profileImage'],
      });

      console.log('fetchParticularUserListings: ', res);

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );

      getRoot(store).entities.merge(normalizedEntities);

      store.particularUserList.set(res.data.data);

      flow.success();
    } catch (err) {
      flow.failed();

      // TODO: move this alert into screen container
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );
    }
  };
}

function getAvailableDays(flow, store) {
  return function* getAvailableDays(listingId) {
    try {
      flow.start();

      const { start, end } = dates.getEndDateByStart(new Date(), 89);

      const res = yield store.Api.getAvailableDays({
        listingId,
        start,
        end,
      });

      const data = dates.getAvailableAndEmployedDates(
        res.data.data,
        start,
        end,
      );

      flow.success();

      return data;
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

export default ListingsStore;
