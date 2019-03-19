/* eslint-disable no-shadow */
import { types, getEnv } from 'mobx-state-tree';
import createFlow from './helpers/createFlow';
import { AlertService, NavigationService } from '../services';
import i18n from '../i18n';

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
      flow.operationError();

      AlertService.showAlert(
        i18n.t('alerts.createListingError.title'),
        i18n.t('alerts.createListingError.message'),
      );
    }
  };
}

const ListingsStore = types
  .model('ListingsStore', {
    createListing: createFlow(createListing),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }));

export default ListingsStore;
