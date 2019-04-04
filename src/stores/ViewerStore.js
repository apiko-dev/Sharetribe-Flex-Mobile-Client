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
    id: types.string,
  }),
);

const ViewerStore = types
  .model('ViewerStore', {
    user: types.optional(types.maybeNull(Viewer), null),
    getCurrentUser: createFlow(getCurrentUser),
    changeAvatar: createFlow(changeAvatar),
    updateProfile: createFlow(updateProfile),
    changeEmail: createFlow(changeEmail),
    changePassword: createFlow(changePassword),
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

      flow.failed('', true);
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
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );

      flow.failed();
    }
  };
}

function changeEmail(flow, store) {
  return function* changeEmail({ currentPasswordForEmail, email }) {
    try {
      flow.start();

      console.log(
        'Current password: ',
        currentPasswordForEmail,
        ' email: ',
        email,
      );

      const res = yield store.Api.changeEmail({
        currentPassword: currentPasswordForEmail,
        email,
      });

      console.log('change email res: ', res);

      yield store.getCurrentUser.run();

      flow.success();
    } catch (err) {
      console.log('change email err: ', err);
      flow.failed();
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );
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
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );

      flow.failed('');
    }
  };
}

function verifyEmail(flow, store) {
  return function* verifyEmail() {
    try {
      flow.start();

      yield store.Api.sendVerifyEmail();

      flow.success();
    } catch (err) {
      console.log(err);
      AlertService.showAlert(
        i18n.t('alerts.somethingWentWrong.title'),
        i18n.t('alerts.somethingWentWrong.message'),
      );

      flow.failed('');
    }
  };
}

export default ViewerStore;
