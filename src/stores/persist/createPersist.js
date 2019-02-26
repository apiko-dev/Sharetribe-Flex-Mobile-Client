import { applySnapshot, onSnapshot } from 'mobx-state-tree';
import { transaction } from 'mobx';
import { AsyncStorage } from 'react-native';

const getSnapshots = (storesList, storage) => {
  const promises = storesList.map(storeName =>
    storage.getItem(storeName),
  );

  return Promise.all(promises).then(snapshots =>
    snapshots.reduce((acc, current, index) => {
      const storeName = storesList[index];
      acc[storeName] = JSON.parse(current);

      return acc;
    }, {}),
  );
};

const removeSnapshots = (storesList, storage) => {
  const promises = storesList.map(storeName =>
    storage.removeItem(storeName),
  );

  return Promise.all(promises);
};

const rehydrateOrApplySnapshot = (store, snapshot) => {
  if (!snapshot) return;

  if (typeof store.rehydrate === 'function') {
    store.rehydrate(snapshot);
  } else {
    applySnapshot(store, snapshot);
  }
};

const purgeStore = ([, store]) => {
  if (typeof store.purge === 'function') {
    store.purge();
  } else {
    applySnapshot(store, {});
  }
};

const attachSnapshotListeners = (stores, storage) => {
  stores.forEach(([name, store]) =>
    onSnapshot(store, snapshot =>
      storage.setItem(name, JSON.stringify(snapshot)),
    ),
  );
};

const createRehydrate = (storeEntries, storage) => () => {
  const storesList = storeEntries.map(i => i[0]);

  getSnapshots(storesList, storage).then(snapshots =>
    transaction(() =>
      storeEntries.forEach(([name, store]) => {
        const snapshot = snapshots[name];
        rehydrateOrApplySnapshot(store, snapshot);
      }),
    ),
  );
};

const createPurge = (storeEntries, storage) => () => {
  const storesList = storeEntries.map(i => i[0]);

  removeSnapshots(storesList, storage).then(() =>
    transaction(() => storeEntries.forEach(purgeStore)),
  );
};

const createPersist = (stores, config = {}) => {
  let entries = Object.entries(stores);
  const storage = config.storage || AsyncStorage;

  if (config.whitelist) {
    entries = entries.filter(([name]) =>
      config.whitelist.includes(name),
    );
  }

  attachSnapshotListeners(entries, storage);

  const rehydrate = createRehydrate(entries, storage);
  const purge = createPurge(entries, storage);

  return {
    rehydrate,
    purge,
  };
};

export default createPersist;
