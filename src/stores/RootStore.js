import { types, flow, getEnv } from 'mobx-state-tree';
import AuthStore from './AuthStore';
import ViewerStore from './ViewerStore';
import { NavigationService } from '../services';
import { ListingsStore } from './ListingsStore';
import { TransactionStore } from './TransactionStore';
import EntitiesStore from './EntitiesStore';

const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),
    listings: types.optional(ListingsStore, {}),
    transaction: types.optional(TransactionStore, {}),
    entities: types.optional(EntitiesStore, {}),
  })
  .actions((store) => ({
    bootstrap: flow(function* bootstrap() {
      const authInfo = yield getEnv(store).Api.isAuthenticated();

      if (authInfo && authInfo.grantType === 'refresh_token') {
        try {
          store.viewer.getCurrentUser.run();
          store.auth.setAuthorizationStatus(true);
          NavigationService.navigateToApp();
        } catch (err) {
          NavigationService.navigateToAuth();
        }
      } else {
        NavigationService.navigateToAuth();
      }
    }),
  }));

export default RootStore;
