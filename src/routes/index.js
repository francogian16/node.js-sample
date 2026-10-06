const express = require('express');
const mongoose = require('mongoose');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// GET /api/health — quick check that the server and database are up
router.get('/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.status(200).json({
    status: 'ok',
    database: states[mongoose.connection.readyState] || 'unknown',
  });
});

// REST resources — nouns for URLs, HTTP verbs for actions
router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);

module.exports = router;
