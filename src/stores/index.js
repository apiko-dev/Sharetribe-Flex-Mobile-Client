import { AsyncStorage } from 'react-native';
import makeInspectable from 'mobx-devtools-mst';
import { connectToDevTools } from 'mobx-devtools/lib/mobxDevtoolsBackend';
import createPersist from './persist/createPersist';
import RootStore from './RootStore';

connectToDevTools({ host: 'localhost', port: 8098 });

const createStore = (initialState = {}) => {
  const store = RootStore.create(initialState, {
    storage: AsyncStorage,
  });

  const persist = createPersist(RootStore, {
    whitelist: ['viewer'],
  });

  persist.rehydrate();

  // persist.purge();

  makeInspectable(store);

  return store;
};

export default createStore;
