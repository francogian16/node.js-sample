// Loads variables from .env into process.env and exposes them in one place.
// Never hard-code connection strings — always read them from the environment.
require('dotenv').config({ quiet: true });

const env = {
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGO_URI,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = env;
