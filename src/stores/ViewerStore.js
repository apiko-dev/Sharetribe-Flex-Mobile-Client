import { types } from 'mobx-state-tree';
import { User } from './UserStore';

const ViewerStore = types
  .model({
    user: types.maybeNull(User),
  })
  .actions((store) => ({
    setUser(data) {
      store.user = data;
    },
  }));

export default ViewerStore;
