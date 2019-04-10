import R from 'ramda';
import {
  processJsonApiIncluded,
  processRelationships,
} from './processJsonApi';

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

export function normalizedIncluded(
  objectArray = [],
  resultObject = {},
) {
  return objectArray.reduce((acc, obj) => {
    if (obj === null) {
      return acc;
    }

    let key = obj.type;
    if (key === 'currentUser') {
      key = 'user';
    }
    if (!acc[key]) {
      acc[key] = {};
    }

    const record = processJsonApiIncluded(obj);
    acc[key][record.id] = record;

    if (!R.isEmpty(record.relationships)) {
      acc[key][record.id].relationships = processRelationships(
        record.relationships,
      );
    }

    return acc;
  }, resultObject);
}
