import R from 'ramda';
import { objectUtils } from '../../utils';

export function processRelationships(relationships) {
  return Object.keys(relationships).reduce((acc, current) => {
    const currentRelations = relationships[current];

    // TODO: Handle real relationships
    if (
      typeof currentRelations.data === 'undefined' ||
      currentRelations.data === null
    ) {
      return acc;
    }

    if (!Array.isArray(currentRelations.data)) {
      acc[current] = currentRelations.data.id.uuid;
    } else {
      acc[current] = currentRelations.data.map(
        (item) => item.id.uuid,
      );
    }

    return acc;
  }, {});
}

function processJsonApi(record) {
  const data = Object.keys(record.attributes).reduce(
    (acc, current) => {
      const currentAttr = record.attributes[current];
      if (
        objectUtils.isObject(currentAttr) &&
        !objectUtils.isPlainObject(currentAttr) &&
        !(currentAttr instanceof Date)
      ) {
        acc[current] = objectUtils.toPlainObject(currentAttr);
      } else {
        acc[current] = record.attributes[current];
      }

      return acc;
    },
    {},
  );

  const relationships = processRelationships(record.relationships);

  return {
    ...data,
    relationships,
    id: record.id.uuid,
  };
}

export function processJsonApiIncluded(record) {
  const data = Object.keys(record.attributes || {}).reduce(
    (acc, current) => {
      const currentAttr = record.attributes[current];
      if (
        objectUtils.isObject(currentAttr) &&
        !objectUtils.isPlainObject(currentAttr) &&
        !(currentAttr instanceof Date)
      ) {
        acc[current] = objectUtils.toPlainObject(currentAttr);
      } else {
        acc[current] = record.attributes[current];
      }

      return acc;
    },
    {},
  );

  return {
    ...data,
    relationships: R.pathOr({}, ['relationships'], record),
    id: record.id.uuid,
  };
}

export default processJsonApi;
