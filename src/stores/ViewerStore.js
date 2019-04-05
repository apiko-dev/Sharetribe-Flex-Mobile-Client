/* eslint-disable no-shadow */
import { types, getEnv, getRoot } from 'mobx-state-tree';
import { User } from './UserStore';
import createFlow from './helpers/createFlow';
import { AlertService } from '../services';
import i18n from '../i18n';
import processJsonApi from './utils/processJsonApi';
import { normalizedIncluded } from './utils/normalize';

const Viewer = types.compose(
  User,
  types.model('Viewer', {
    id: types.maybe(types.string),
  }),
);

function errorParser(err) {
  let reason;
  let fields;

  if (Array.isArray(err.data.errors)) {
    reason = err.data.errors.map((i) => {
      if (i.status === 400) {
        return {
          fields: i.source.path,
          code: i.code,
          details: i.details,
          title: i.title,
          status: i.status,
        };
      }

      return i;
    });

    fields = err.data.errors.map((i) => i.source.path[0]);
  }

  return {
    message: err.message,
    reason,
    fields,
  };
}

const ViewerStore = types
  .model('ViewerStore', {
    user: types.optional(types.maybeNull(Viewer), null),
    getCurrentUser: createFlow(getCurrentUser),
    changeAvatar: createFlow(changeAvatar),
    updateProfile: createFlow(updateProfile),
    changeEmail: createFlow(changeEmail),
    changePassword: createFlow(changePassword),
    sendVerifyEmail: createFlow(sendVerifyEmail),
    verifyEmail: createFlow(verifyEmail),
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

function getCurrentUser(flow, store) {
  return function* getCurrentUser() {
    try {
      flow.start();

      const res = yield store.Api.getUser();
      console.log('res: ', res);
      const user = processJsonApi(res.data.data);
      console.log(user);

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );

      getRoot(store).entities.merge(normalizedEntities);

      store.setUser(user);

      flow.success();
    } catch (err) {
      console.log(err);

      flow.failed();
    }
  };
}

function changeAvatar(flow, store) {
  return function* changeAvatar(avatar) {
    try {
      flow.start();
      console.log('start changeAvatar ', avatar);

      const imagesRes = yield store.Api.imagesUpload(avatar);
      const avatarId = imagesRes.data.data.id.uuid;

      const res = yield store.Api.updateAvatar(avatarId);
      console.log('update avatar res: ', res);
      yield store.getCurrentUser.run();

      flow.success();
    } catch (err) {
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );

      flow.failed();
    }
  };
}

function updateProfile(flow, store) {
  return function* updateProfile({
    firstName,
    lastName,
    bio,
    phone,
  }) {
    try {
      flow.start();

      yield store.Api.updateProfile({
        firstName,
        lastName,
        bio,
        protectedData: {
          phoneNumber: phone,
        },
      });

      yield store.getCurrentUser.run();

      flow.success();
    } catch (err) {
      const error = errorParser(err);

      flow.failed(error, true);
    }
  };
}

function changeEmail(flow, store) {
  return function* changeEmail({ currentPasswordForEmail, email }) {
    try {
      flow.start();

      yield store.Api.changeEmail({
        currentPassword: currentPasswordForEmail,
        email,
      });

      yield store.getCurrentUser.run();

      flow.success();
    } catch (err) {
      console.log('change email error: ', err);
      const error = errorParser(err);

      flow.failed(error, true);
    }
  };
}

function changePassword(flow, store) {
  return function* changePassword({ currentPassword, newPassword }) {
    try {
      flow.start();

      yield store.Api.changePassword({
        currentPassword,
        newPassword,
      });

      yield store.getCurrentUser.run();

      flow.success();
    } catch (err) {
      console.log('change password error: ', err);
      const error = errorParser(err);

      flow.failed(error, true);
    }
  };
}

function sendVerifyEmail(flow, store) {
  return function* sendVerifyEmail() {
    try {
      flow.start();

      yield store.Api.sendVerifyEmail();

      flow.success();
    } catch (err) {
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );

      flow.failed();
    }
  };
}

function verifyEmail(flow, store) {
  return function* verifyEmail(token) {
    try {
      flow.start();

      yield store.Api.verifyEmail(token);

      flow.success();
    } catch (err) {
      console.log(err);
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );

      flow.failed();
    }
  };
}

export default ViewerStore;
