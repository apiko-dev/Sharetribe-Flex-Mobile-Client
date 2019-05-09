import { types } from 'mobx-state-tree';
import { runInAction } from 'mobx';
import deepMerge from 'deepmerge';

const capitalize = (str) => {
  const arr = Array.from(str);
  arr[0] = arr[0].toUpperCase();
  return arr.join('');
};

export const createCollectionStore = (name, Model) =>
  types
    .model(name, {
      collection: types.map(Model),
    })
    .actions((store) => ({
      add(key, value) {
        const item = store.collection.get(key);
        if (item) {
          deepMerge(item, value, {
            arrayMerge: (destinationArray, sourceArray) =>
              sourceArray,
          });
        } else {
          store.collection.set(key, value);
        }
      },
      destroy(item) {
        store.collection.delete(item.id);
      },
    }));

export function createEntitiesStore(definition) {
  const names = Object.keys(definition);

  const stores = names.reduce((acc, current) => {
    const capitalized = capitalize(current);
    const Model = definition[current];

    const CollectionStore = createCollectionStore(
      `${capitalized}CollectionStore`,
      Model,
    );

    acc[current] = types.optional(CollectionStore, {});

    return acc;
  }, {});

  const EntitiesStore = types
    .model('EntitiesStore', stores)

    .actions((store) => ({
      merge(normalizedEntities) {
        runInAction(() => {
          Object.keys(normalizedEntities).forEach((entityKey) => {
            const storeEntity = store[entityKey];

            if (!storeEntity) {
              return;
            }

            const entities = normalizedEntities[entityKey];

            Object.entries(entities).forEach(([key, value]) => {
              storeEntity.add(key, value);
            });
          });
        });
      },
    }));

  return EntitiesStore;
}
