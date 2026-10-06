const env = require('../config/env');

// Central error handler — Express recognises it by its 4 arguments.
// Maps Mongoose error types to the correct HTTP status code.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // 400 — data failed Mongoose schema rules
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  // 404 — invalid MongoDB ObjectId format
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Invalid ID format' });
  }

  // 409 — unique index violated (e.g. duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return res.status(409).json({ message: `Duplicate value for ${field}` });
  }

  // 400 — malformed JSON body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Malformed JSON body' });
  }

  // 500 — anything unexpected
  console.error(err);
  res.status(500).json({
    message: 'Server error',
    ...(env.nodeEnv === 'development' && { error: err.message }),
  });
};

module.exports = errorHandler;
