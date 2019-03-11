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
const ErrorModel = types.model({ // eslint-disable-line
  message: '',
  status: types.maybeNull(types.number),
  reason: types.maybeNull(types.string),
});

function createFlow(flowDefinition) {
  const flowModel = types
    .model({
      inProgress: false,
      // error: types.optional(types.maybeNull(ErrorModel), null),
      // TODO: use ErrorModel
      error: types.optional(types.boolean, false),
    })
    .views((store) => ({
      get errorMessage() {
        if (store.error === false) {
          return false;
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
        store.error = false;
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
        store.error = true;
      },

      run: flow(flowDefinition(store, getParent(store))),

      cleanError() {
        store.error = false;
      },
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

function resetPassword(flow, store) {
  return function* resetPassword({ email }) {
    try {
      flow.start();

      yield store.Api.resetPassword({ email });
      flow.success();
    } catch (err) {
      flow.operationError();
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
    resetPassword: createFlow(resetPassword),
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
