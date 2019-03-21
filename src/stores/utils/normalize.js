export default function normalize(items, key = 'id') {
  if (!Array.isArray(items)) {
    throw new Error('items should be an array');
  }

  return items.reduce(
    (acc, current) => {
      const id = current[key];

      acc.ids.push(id);
      acc.entities[id] = current;

      return acc;
    },
    {
      ids: [],
      entities: {},
    },
  );
}
