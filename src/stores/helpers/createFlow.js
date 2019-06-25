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

        return _.get(store, 'error.message', null);
      },

      get isError() {
        return !!store.error;
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

      failed(err, throwError) {
        // eslint-disable-line
        store.inProgress = false;

        store.error = {
          message: _.get(err, 'message', 'some error'),
          status: _.get(err, 'status', null),
        };

        if (throwError) {
          throw err;
        }
      },

      run: flow(flowDefinition(store, getParent(store))),

      cleanError() {
        store.error = null;
      },
    }));

  return types.optional(flowModel, {});
}

export default createFlow;
