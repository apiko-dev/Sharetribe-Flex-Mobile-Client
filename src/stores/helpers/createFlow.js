/* eslint-disable no-shadow */
import { types, flow, getParent } from 'mobx-state-tree';

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

      failed(err) { // eslint-disable-line
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

export default createFlow;
