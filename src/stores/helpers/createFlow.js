/* eslint-disable no-shadow */
import {
  types,
  flow,
  getParent,
  getRoot,
  getEnv,
} from 'mobx-state-tree';
import _ from 'lodash';

// TODO: Change ErrorModel
const ErrorModel = types.model({
  // eslint-disable-line
  message: '',
  status: types.maybeNull(types.number),
  reason: types.maybeNull(types.string),
});

function createFlow(flowDefinition) {
  const flowModel = types
    .model({
      inProgress: false,
      // TODO: use ErrorModel
      error: types.optional(types.maybeNull(ErrorModel), null),
    })
    .views((store) => ({
      get errorMessage() {
        if (store.error === false) {
          return false;
        }

        return _.get(store, 'error.message', null);
      },

      get isError() {
        return Boolean(store.error);
      },

      get Api() {
        return getEnv(getRoot(store)).Api;
      },
    }))
    .actions((store) => ({
      start() {
        store.inProgress = true;
        store.error = null;
      },

      success() {
        store.inProgress = false;
        store.error = null;
      },

      error(err) {
        store.inProgress = false;
        store.error = err;
      },

      failed(err, throwError) {
        // eslint-disable-line
        store.inProgress = false;

        store.error = {
          message: _.get(err, 'response.data.message', err.message),
          status: _.get(err, 'response.status', null),
          reason: _.get(err, 'response.data.reason', null),
        };

        if (throwError) {
          throw err;
        }
      },

      run: flow(flowDefinition(store, getParent(store))),

      cleanError() {
        store.error = false;
      },
    }));

  return types.optional(flowModel, {});
}

export default createFlow;
