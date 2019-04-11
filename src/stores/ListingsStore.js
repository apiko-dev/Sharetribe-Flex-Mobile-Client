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
});

const Price = t.model('Price', {
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
    publicData: t.optional(t.maybeNull(ProductPublicData), null),
    price: t.optional(t.maybeNull(Price), null),
    metadata: t.model('metadata', {}),
    relationships: t.maybe(ProductRelationships),

    update: createFlow(updateProduct),
  })

  .views((store) => ({
    get canEdit() {
      return (
        store.relationships.author.id ===
        R.path(['viewer', 'user', 'id'], getRoot(store))
      );
    },
  }));

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
      });

      const data = processJsonApi(res.data.data);
      const entities = normalizedIncluded(res.data.included);
      getRoot(store).entities.merge(entities);
      store.ownList.addToBegin(data);

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
        include: ['images', 'author', 'profileImage'],
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
        include: ['images', 'author', 'profileImage'],
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
        include: ['images', 'author', 'profileImage'],
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
        include: ['images', 'author', 'profileImage'],
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

export default ListingsStore;
