/* eslint-disable no-shadow */
import { types, getEnv } from 'mobx-state-tree';
import { types as t } from 'sharetribe-flex-sdk';
import createFlow from './helpers/createFlow';
import { AlertService, NavigationService } from '../services';
import i18n from '../i18n';

const Money = types.custom({
  name: 'Money',
  fromSnapshot(value) {
    return new t.Money(value, 'USD');
  },
  toSnapshot(value) {
    return value.toString();
  },
  isTargetType(value) {
    return value instanceof t.Money;
  },
  getValidationMessage(value) {
    if (/^-?\d+\.\d+$/.test(value)) return '';
    return `'${value}' doesn't look like a valid money number`;
  },
});

const Listing = types.model('Listing', {
  attributes: types.optional(
    types.model('Listing_attributes_model', {
      // createdAt: types.Date,
      deleted: false,
      description: '',
      /* geolocation: types.maybeNull(
        types.model('Listing_geolocation_model', {
          lat: 0,
          lng: 0,
        }),
      ), */
      metadata: types.optional(
        types.model('Listing_metadata_model', {
          promoted: false,
        }),
        {},
      ),
      // price: types.optional(
      //   types.model('Listing_price_model', {
      //     amount: 0,
      //     currency: '',
      //   }),
      //   {},
      // ),
      publicData: types.optional(
        types.model('Listing_publicData_price', {
          brand: '',
          category: '',
          subCategory: '',
          // location: '',
          level: '',
        }),
        {},
      ),
      state: '',
      title: '',
    }),
    {},
  ),
  /* id: types.model(
    {
      uuid: types.optional(types.identifier, ''),
    },
    {},
  ), */
  type: '',
});

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

      const imagesId = [];

      for (let i = 0; i <= images.length; i += 1) {
        const {
          data: {
            data: { id },
          },
        } = yield store.Api.imagesUpload(images[0]);
        imagesId.push(id.uuid);
      }

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
      console.log(err);
      flow.failed();

      AlertService.showAlert(
        i18n.t('alerts.createListingError.title'),
        i18n.t('alerts.createListingError.message'),
      );
    }
  };
}

function fetchListings(flow, store) {
  return function* fetchListings() {
    try {
      flow.start();

      const res = yield store.Api.fetchListings({
        pub_level: 'Asdasd',
      });

      console.log(res.data.data);

      yield store.setListings(res.data.data);
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

const ListingsStore = types
  .model('ListingsStore', {
    listings: types.array(Listing),
    createListing: createFlow(createListing),
    fetchListings: createFlow(fetchListings),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },

    get getListings() {
      return store.listings.slice();
    },
  }))
  .actions((store) => ({
    setListings(data) {
      store.listings = data;
    },
  }));

export default ListingsStore;
