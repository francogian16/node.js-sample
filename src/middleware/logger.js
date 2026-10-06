// Custom logger middleware — runs before every route handler.
const logger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
  });

  next(); // Required — pass control to the next handler
};

module.exports = logger;
