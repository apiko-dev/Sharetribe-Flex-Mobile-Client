import { types } from 'mobx-state-tree';

const UserInterfaceStore = types
  .model('UserInterfaceStore', {
    shouldShowVerifyModal: false,
  })

  .actions((store) => ({
    setShouldShowVerifyModal(value) {
      store.shouldShowVerifyModal = value;
    },
  }));

export default UserInterfaceStore;
