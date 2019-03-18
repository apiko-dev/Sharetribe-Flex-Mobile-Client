/* eslint-disable no-shadow */
import {
  types,
  flow,
  getParent,
  getRoot,
  getEnv,
} from 'mobx-state-tree';
import R from 'ramda';
import { NavigationService, AlertService } from '../services';
import i18n from '../i18n';

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
      NavigationService.navigateToApp();
    } catch (err) {
      flow.operationError();
      AlertService.showAlert(
        i18n.t('alerts.signInError.title'),
        i18n.t('alerts.signInError.message'),
      );
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
      const errorPath = R.pathOr(
        false,
        ['source', 'path'],
        err.data.errors[0],
      );

      if (errorPath && errorPath.includes('email')) {
        AlertService.showAlert(
          i18n.t('alerts.incorrectEmail.title'),
          i18n.t('alerts.incorrectEmail.message'),
        );
      } else {
        AlertService.showAlert(
          i18n.t('alerts.signUpError.title'),
          i18n.t('alerts.signUpError.message'),
        );
      }
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

function updatePassword(flow, store) {
  return function* updatePassword({ newPassword, email, token }) {
    try {
      flow.start();

      yield store.Api.updatePassword({ newPassword, email, token });
      flow.success();
      NavigationService.navigateToAuth();
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
      NavigationService.navigateToAuth();
    } catch (err) {
      AlertService.showAlert(
        i18n.t('alerts.signOutError.title'),
        i18n.t('alerts.signOutError.message'),
      );
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
    updatePassword: createFlow(updatePassword),
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
