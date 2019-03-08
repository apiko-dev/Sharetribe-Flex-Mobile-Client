import { types, flow, getEnv } from 'mobx-state-tree';
import AuthStore from './AuthStore';
import ViewerStore from './ViewerStore';
import { NavigationService } from '../services';

const RootStore = types
  .model({
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),
  })
  .actions((store) => ({
    bootstrap: flow(function* bootstrap() {
      const authInfo = yield getEnv(store).Api.isAuthenticated();

      if (authInfo && authInfo.grantType === 'refresh_token') {
        NavigationService.navigateToAuthorizedApp();
      } else {
        NavigationService.navigateToUnauthorizedApp();
      }
    }),
  }));

export default RootStore;
