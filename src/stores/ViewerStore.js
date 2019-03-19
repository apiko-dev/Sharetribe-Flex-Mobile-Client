import { types } from 'mobx-state-tree';
import { User } from './UserStore';

const ViewerStore = types
  .model('ViewerStore', {
    user: types.maybeNull(User),
  })
  .actions((store) => ({
    setUser(data) {
      store.user = data;
    },
    removeUser() {
      store.user = null;
    },
  }));

export default ViewerStore;
