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

  const persist = createPersist(store, {
    whitelist: ['viewer'],
  });
  makeInspectable(store);

  persist.rehydrate();

  // persist.purge();

  return store;
};

export default createStore;
