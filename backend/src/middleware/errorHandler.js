// Central error handler — any `next(err)` or thrown error in an async
// controller ends up here, so controllers never need their own try/catch
// boilerplate for the response.
function errorHandler(err, req, res, next) {
  // Mongoose validation errors → 400
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Invalid ObjectId (e.g. GET /api/categories/not-an-id) → 400
  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  // Duplicate key (unique index) → 409
  if (err.code === 11000) {
    return res.status(409).json({ message: "Duplicate value", fields: err.keyValue });
  }

  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ message: err.message || "Server error" });
}

module.exports = errorHandler;
