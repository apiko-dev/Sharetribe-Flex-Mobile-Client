import makeInspectable from 'mobx-devtools-mst';
import { connectToDevTools } from 'mobx-devtools/lib/mobxDevtoolsBackend';
import persist from './persist/createPersist'
import RootStore from './RootStore';

connectToDevTools({ host: 'localhost', port: 8098 });

const createStore = (initState) => {
  const store = RootStore.create({ ...initState });

  makeInspectable(store);

  const persist = createPersist(RootStore, {
    whitelist: ['viewer', 'recentSearches'],
  });

  persist.rehydrate();

  persist.purge();

  return store;
};

export default createStore;