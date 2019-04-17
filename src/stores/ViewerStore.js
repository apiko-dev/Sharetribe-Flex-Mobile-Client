/* eslint-disable no-shadow */
import { types, getEnv, getRoot } from 'mobx-state-tree';
import { User } from './UserStore';
import createFlow from './helpers/createFlow';
import processJsonApi from './utils/processJsonApi';
import { normalizedIncluded } from './utils/normalize';
import normalizeError from './utils/normalizeError';

const Viewer = types.compose(
  User,
  types.model('Viewer', {
    id: types.maybe(types.string),
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
      const user = processJsonApi(res.data.data);

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );

      getRoot(store).entities.merge(normalizedEntities);

      store.setUser(user);

      flow.success();
    } catch (err) {
      flow.failed();
    }
  };
}

function changeAvatar(flow, store) {
  return function* changeAvatar(avatar) {
    try {
      flow.start();

      const imagesRes = yield store.Api.imagesUpload(avatar);
      const avatarId = imagesRes.data.data.id.uuid;

      yield store.Api.updateAvatar(avatarId);

      yield store.getCurrentUser.run();

      flow.success();
    } catch (err) {
      flow.failed(err, true);
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
        publicData: {
          phoneNumber: phone,
        },
        displayName: `${firstName} ${lastName}`,
      });

      yield store.getCurrentUser.run();

      flow.success();
    } catch (err) {
      const error = normalizeError(err);

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
      const error = normalizeError(err);
      console.log(error);

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
      flow.failed(err, true);
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
      flow.failed(err, true);
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
      flow.failed(err, true);
    }
  };
}

export default ViewerStore;
