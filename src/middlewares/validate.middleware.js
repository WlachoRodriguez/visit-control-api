export const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    try {
      const data = schema.parse(req[property] || {});

      if (property === "body" || property === "params") {
        req[property] = data;
      } else {
        req.validated = {
          ...req.validated,
          [property]: data,
        };
      }

      next();
    } catch (err) {
      err.status = 400;
      next(err);
    }
  };
