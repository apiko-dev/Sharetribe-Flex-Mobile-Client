import { types } from 'mobx-state-tree';

const UiStore = types
  .model('UiStore', {
    shouldShowVerifyModal: false,
  })

  .actions((store) => ({
    setShouldShowVerifyModal(value) {
      store.shouldShowVerifyModal = value;
    },
  }));

export default UiStore;
