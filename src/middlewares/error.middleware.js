export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Error Zod
  if (err.issues) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.issues.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
};
