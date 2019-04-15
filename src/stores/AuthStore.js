/* eslint-disable no-shadow */
import { types, getRoot, getEnv } from 'mobx-state-tree';
import R from 'ramda';
import { NavigationService, AlertService } from '../services';
import i18n from '../i18n';
import createFlow from './helpers/createFlow';

function loginUser(flow, store) {
  return function* loginUser({ email, password }) {
    try {
      flow.start();

      yield store.Api.login({ email, password });

      const rootStore = getRoot(store);

      yield rootStore.viewer.getCurrentUser.run();

      flow.success();

      store.setAuthorizationStatus(true);
      NavigationService.navigateToApp();
    } catch (err) {
      flow.failed();
      AlertService.showAlert(
        i18n.t('alerts.signInError.title'),
        i18n.t('alerts.signInError.message'),
      );
    }
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
        displayName: `${firstName} ${lastName}`,
      });

      yield store.loginUser.run({ email, password });

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
      flow.failed(err);
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
      flow.failed();
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
      flow.failed();
    }
  };
}

function logout(flow, store) {
  return function* logout() {
    try {
      flow.start();

      yield store.Api.logout();

      const rootStore = getRoot(store);

      rootStore.viewer.removeUser();

      flow.success();

      store.setAuthorizationStatus(false);
      NavigationService.navigateToAuth();
    } catch (err) {
      flow.failed();
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
