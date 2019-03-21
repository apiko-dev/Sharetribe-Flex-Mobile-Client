import { types, getRoot } from 'mobx-state-tree';
import normalize from './normalize';

export default function listModel(name, options) {
  const { of: ofType, identifierName, entityName } = options;

  const listStore = types
    .model(name, {
      array: types.array(ofType),
    })
    .views((store) => ({
      get asArray() {
        return store.array.slice();
      },
    }))

    .actions((store) => ({
      set(data) {
        const { ids, entities } = store.normalize(data);

        store.merge(entityName, entities);
        store.array = ids;
      },

      add(item) {
        store.mergeSingle(item);
        store.array.push(item.id);
      },

      addToBegin(item) {
        store.mergeSingle(item);
        store.array.unshift(item.id);
      },

      replace(id, newItem) {
        const index = store.array.findIndex(
          (i) => i[identifierName] === id,
        );

        store.mergeSingle(newItem);
        store[index] = newItem;
      },

      remove(id) {
        const index = store.findIndex(id);
        store.array.splice(index, 1);
      },

      removeMany(ids) {
        ids.forEach((id) => store.remove(id));
      },

      findIndex(id) {
        return store.array.findIndex((i) => i[identifierName] === id);
      },

      normalize(items, keyName) {
        return normalize(items, keyName);
      },

      merge(key, object) {
        if (typeof key === 'object') {
          getRoot(store).entities.merge(key);
        } else {
          getRoot(store).entities.merge({ [key]: object });
        }
      },

      mergeSingle(entity) {
        getRoot(store).entities.merge({
          [entityName]: {
            [entity[identifierName]]: entity,
          },
        });
      },
    }));

  return types.optional(listStore, {});
}
