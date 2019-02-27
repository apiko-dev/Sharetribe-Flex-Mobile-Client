import { types, getRoot, getEnv } from 'mobx-state-tree';
import { NavigationService } from '../services';

const AuthStore = types
  .model({
    isAuthenticated: false,
    isSigningIn: false,
    isSigningUp: false,
  })
  .actions((store) => ({
    login(userData) {
      getRoot(store).viewer.setUser(userData);

      getEnv(store).storage.setItem('token', 'token');

      NavigationService.navigateToAuthorizedApp();
    },
    logout() {
      getEnv(store).storage.removeItem('token');

      NavigationService.navigateToUnauthorizedApp();
    },
  }));

export default AuthStore;
