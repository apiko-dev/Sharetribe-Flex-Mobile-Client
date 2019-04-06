function normalizeError(err) {
  let reason;
  let fields = [];

  if (err.status === 400) {
    if (Array.isArray(err.data.errors)) {
      reason = err.data.errors.map((i) => {
        if (i.status === 400) {
          return {
            fields: i.source.path,
            code: i.code,
            details: i.details,
            title: i.title,
            status: i.status,
          };
        }

        return i;
      });

      fields = err.data.errors.map((i) => i.source.path[0]);
    }
  }

  if (err.status === 403) {
    /* tmp do nothing */
  }

  return {
    message: err.message,
    reason,
    fields,
    status: err.status,
  };
}

export default normalizeError;
