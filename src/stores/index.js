// import { AsyncStorage } from 'react-native';
import makeInspectable from 'mobx-devtools-mst';
import { connectToDevTools } from 'mobx-devtools/lib/mobxDevtoolsBackend';
import createPersist from './persist/createPersist';
import RootStore from './RootStore';
import { SharetribeFlexService } from '../services';

connectToDevTools({ host: 'localhost', port: 8098 });

const createStore = (initialState = {}) => {
  const store = RootStore.create(initialState, {
    // storage: AsyncStorage,
    Api: SharetribeFlexService,
  });

  const persist = createPersist(store, {
    whitelist: [],
  });

  persist.rehydrate();

  // persist.purge();

  makeInspectable(store);

  return store;
};

export default createStore;
