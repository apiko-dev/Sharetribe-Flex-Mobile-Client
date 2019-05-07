import { types, getRoot } from 'mobx-state-tree';
import normalize from './normalize';

export default function listModel(name, options) {
  const {
    of: ofType,
    identifierName,
    entityName,
    responseTransformer,
    shouldTransformSingle,
    perPage,
  } = options;

  const listStore = types
    .model(name, {
      array: types.array(ofType),
      hasNoMore: false,
    })
    .views((store) => ({
      get asArray() {
        return store.array.slice();
      },

      get count() {
        return store.array.length;
      },

      get pageNumber() {
        const pages = store.count / perPage;

        if (Number.isInteger(pages)) {
          return pages + 1;
        }

        return undefined;
      },

      get latest() {
        return store.array[store.array.length - 1];
      },
    }))

    .actions((store) => ({
      set(data) {
        const { ids, entities } = store.normalize(data);

        store.merge(entityName, entities);
        store.array = ids;
        if (ids.length < perPage) {
          store.hasNoMore = true;
        }
      },

      append(data) {
        const { ids, entities } = store.normalize(data);

        store.merge(entityName, entities);
        ids.forEach((i) => store.array.push(i));

        if (ids.length < perPage) {
          store.hasNoMore = true;
        }
      },

      prepend(data) {
        const { ids, entities } = store.normalize(data);

        store.merge(entityName, entities);
        ids.forEach((i) => store.array.unshift(i));

        if (ids.length < perPage) {
          store.hasNoMore = true;
        }
      },

      add(item) {
        if (shouldTransformSingle) {
          // eslint-disable-next-line prefer-destructuring
          item = responseTransformer([item])[0];
        }
        store.mergeSingle(item);
        store.array.push(item.id);
      },


      addToBegin(item, shouldMerge = true) {
        if (shouldTransformSingle) {
          // eslint-disable-next-line prefer-destructuring
          item = responseTransformer([item])[0];
        }

        if (shouldMerge) {
          store.mergeSingle(item);
        }
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
        const transformed = responseTransformer(items);
        return normalize(transformed, keyName);
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
