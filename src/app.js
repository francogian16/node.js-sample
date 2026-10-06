const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const apiRoutes = require('./routes');

// Builds and configures the Express app (no listening here — see server.js).
const app = express();

// Middleware — runs before every route
app.use(logger); // first, so every request is logged (even ones that fail parsing)
app.use(cors({ origin: env.clientOrigin })); // allow the React front end to call this API
app.use(express.json()); // parse JSON bodies into req.body

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express! The API lives under /api');
});
app.use('/api', apiRoutes);

// Fallbacks — must come after all routes
app.use(notFound);
app.use(errorHandler);

module.exports = app;
