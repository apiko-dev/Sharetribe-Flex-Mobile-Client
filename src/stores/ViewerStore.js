/* eslint-disable no-shadow */
import { types, getEnv } from 'mobx-state-tree';
import { User } from './UserStore';
import createFlow from './helpers/createFlow';
import { AlertService } from '../services';
import i18n from '../i18n';

const ViewerStore = types
  .model('ViewerStore', {
    user: types.maybeNull(User),
    getUserById: createFlow(getUserById),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }))
  .actions((store) => ({
    setUser(data) {
      store.user = data;
    },
    removeUser() {
      store.user = null;
    },
  }));

function getUserById(flow, store) {
  return function* getUserById(usedId) {
    try {
      flow.start();
      console.log('user id:', usedId);

      const res = yield store.Api.getUserById(usedId);
      const { displayName } = res.data.data.attributes.profile;
      console.log('res: getUserById: ', displayName);

      flow.success();

      return {
        displayName,
      };
    } catch (err) {
      console.log(err);
      flow.failed();

      AlertService.show(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );
    }
  };
}

export default ViewerStore;
