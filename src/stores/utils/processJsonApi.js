import { objectUtils } from '../../utils';

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

  const relationships = Object.keys(record.relationships).reduce(
    (acc, current) => {
      const currentRelations = record.relationships[current];

      // TODO: Handle real relationships
      if (typeof currentRelations.data === 'undefined') {
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
    },
    {},
  );

  return {
    ...data,
    relationships,
    id: record.id.uuid,
  };
}

export function processJsonApiIncluded(record) {
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

  return {
    ...data,
    id: record.id.uuid,
  };
}

export default processJsonApi;
