/* eslint-disable no-shadow */
import { types, getEnv } from 'mobx-state-tree';
import { User } from './UserStore';
import createFlow from './helpers/createFlow';
import { AlertService } from '../services';
import i18n from '../i18n';
import { processJsonApiIncluded } from './utils/processJsonApi';

const Viewer = types.compose(
  User,
  types.model('Viewer', {
    id: types.string,
  }),
);

const ViewerStore = types
  .model('ViewerStore', {
    user: types.optional(types.maybeNull(Viewer), null),
    getCurrentUser: createFlow(getCurrentUser),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }))
  .actions((store) => ({
    setUser(data) {
      // getRoot(store).entities.user.add(data.id, data);
      store.user = data;
    },
    removeUser() {
      store.user = null;
    },
  }));

function getCurrentUser(flow, store) {
  return function* getCurrentUser() {
    try {
      flow.start();

      const res = yield store.Api.getUser();

      const user = processJsonApiIncluded(res.data.data);
      console.log(user);

      store.setUser(user);

      flow.success();
    } catch (err) {
      AlertService.show(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );

      flow.failed('', true);
    }
  };
}

export default ViewerStore;
