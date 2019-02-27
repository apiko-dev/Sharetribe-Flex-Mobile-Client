import { types } from 'mobx-state-tree';
import { AuthStore } from './AuthStore';

const RootStore = types.model({
  Auth: types.optional(AuthStore, {}),
});

// const rootStore = RootStore.create({}, { Api });

export default RootStore;
