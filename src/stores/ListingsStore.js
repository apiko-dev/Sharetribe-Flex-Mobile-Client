/* eslint-disable no-shadow */
import { types as t, getEnv } from 'mobx-state-tree';
import createFlow from './helpers/createFlow';
import { AlertService, NavigationService } from '../services';
import i18n from '../i18n';
import processJsonApi from './utils/processJsonApi';
import listModel from './utils/listModel';
import { getImageUrl } from '../utils';

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

  // update: createFlow(updatePrice),
});

// .actions(store => ({
//   updateAmount(amount) {
//     store.amount = amount;
//   }
// }))

// function updatePrice(flow, store) {
//   return function* updatePriceFlow(amount) {
//     const { id } = getParent(store);

//     store.updateAmount(amount);
//   }
// }

const Image = t
  .model('Image', {
    id: t.string,
  })
  .views((store) => ({
    get uri() {
      return getImageUrl(store.id);
    },
  }));

const ProductRelationships = t
  .model('ProductRelationships', {
    images: t.maybe(t.array(Image)),
  })
  .views((store) => ({
    get getImages() {
      return store.images.map((i) => i.uri);
    },
  }));

export const Product = t.model('Product', {
  id: t.identifier,
  description: t.string,
  deleted: t.boolean,
  geolocation: t.null,
  createdAt: t.maybe(t.Date),
  state: t.string,
  title: t.string,
  publicData: t.optional(t.maybeNull(ProductPublicData), null),
  price: t.optional(t.maybeNull(Price), null),
  metadata: t.model('metadata', {}),
  relationships: t.maybe(ProductRelationships),
});

const ProductList = listModel('ProductList', {
  of: t.reference(Product),
  entityName: 'listings',
  identifierName: 'id',
  responseTransformer,
});

function responseTransformer(res) {
  return res.map(processJsonApi);
}

const ListingsStore = t
  .model('ListingsStore', {
    list: ProductList,
    createListing: createFlow(createListing),
    fetchListings: createFlow(fetchListings),
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
  }) {
    try {
      flow.start();
      const res = yield Promise.all(
        images.map((image) => store.Api.imagesUpload(image)),
      );

      const imagesId = res.map((item) => item.data.data.id.uuid);

      yield store.Api.createListing({
        title,
        category,
        subCategory,
        brand,
        level,
        description,
        price,
        location,
        images: imagesId,
      });

      flow.success();

      AlertService.showAlert(
        i18n.t('alerts.createListingSuccess.title'),
        i18n.t('alerts.createListingSuccess.message'),
        [
          {
            text: i18n.t('common.ok'),
            onPress: () => NavigationService.navigateToHome(),
          },
          {
            text: i18n.t('common.cancel'),
            style: 'cancel',
          },
        ],
      );
    } catch (err) {
      flow.failed(err);

      AlertService.showAlert(
        i18n.t('alerts.createListingError.title'),
        i18n.t('alerts.createListingError.message'),
      );
    }
  };
}

function fetchListings(flow, store) {
  return function* fetchListings({ categoriesList }) {
    try {
      flow.start();

      const res = yield store.Api.fetchListings({
        pub_category: categoriesList,
        include: ['images'],
      });

      console.log(res);

      store.list.set(res.data.data);
      flow.success();
    } catch (err) {
      console.log(err);
      flow.failed();

      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );
    }
  };
}

export default ListingsStore;
