/* eslint-disable no-shadow */
import {
  types,
  flow,
  getParent,
  getRoot,
  getEnv,
} from 'mobx-state-tree';
import { NavigationService, AlertService } from '../services';

// TODO: Change ErrorModel
const ErrorModel = types.model({
  message: '',
  status: types.maybeNull(types.number),
  reason: types.maybeNull(types.string),
});

function createFlow(flowDefinition) {
  const flowModel = types
    .model({
      inProgress: false,
      error: types.optional(types.maybeNull(ErrorModel), null),
    })
    .views((store) => ({
      get errorMessage() {
        if (store.error === null) {
          return null;
        }

        return store.error.message;
      },

      get isError() {
        return Boolean(store.error);
      },
    }))
    .actions((store) => ({
      start() {
        store.inProgress = true;
        store.error = null;
      },

      success() {
        store.inProgress = false;
      },

      /* error(err) {
        store.inProgress = false;
        store.error = err;
      }, */

      operationError(err) { // eslint-disable-line
        store.inProgress = false;
        // store.error = err;
      },

      run: flow(flowDefinition(store, getParent(store))),
    }));

  return types.optional(flowModel, {});
}

function loginUser(flow, store) {
  return function* loginUser({ email, password }) {
    try {
      flow.start();

      yield store.Api.login({ email, password });

      const {
        data: {
          data: { id, attributes },
        },
      } = yield store.Api.getUser();

      const rootStore = getRoot(store);

      rootStore.viewer.setUser({
        id: id.uuid,
        email: attributes.email,
        firstName: attributes.profile.firstName,
        lastName: attributes.profile.lastName,
      });

      flow.success();

      store.setAuthorizationStatus(true);
      NavigationService.navigateToAuthorizedApp();
    } catch (err) {
      flow.operationError();
      AlertService.showSignInError();
    }

    return false;
  };
}

function registerUser(flow, store) {
  return function* registerUser({
    firstName,
    email,
    lastName,
    password,
  }) {
    try {
      flow.start();

      yield store.Api.register({
        firstName,
        email,
        lastName,
        password,
      });

      store.loginUser.run({ email, password });

      flow.success();

      store.setAuthorizationStatus(true);
    } catch (err) {
      AlertService.showSignUpError();

      flow.operationError(err);
    }
  };
}

function logout(flow, store) {
  return function* logout() {
    try {
      yield store.Api.logout();

      const rootStore = getRoot(store);

      rootStore.viewer.removeUser();

      store.setAuthorizationStatus(false);
      NavigationService.navigateToUnauthorizedApp();
    } catch (err) {
      AlertService.showSignOutError();
    }
  };
}

const AuthStore = types
  .model('AuthStore', {
    isAuthorized: false,
    loginUser: createFlow(loginUser),
    registerUser: createFlow(registerUser),
    logout: createFlow(logout),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }))

  .actions((store) => ({
    setAuthorizationStatus(status) {
      store.isAuthorized = status;
    },
  }));

export default AuthStore;
