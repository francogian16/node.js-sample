const mongoose = require('mongoose');

// Connect once at server startup.
const connectDB = async (mongoUri) => {
  if (!mongoUri || mongoUri.includes('<')) {
    throw new Error(
      'MONGO_URI is missing or still has placeholders. Copy .env.example to .env and set your connection string.'
    );
  }

  const conn = await mongoose.connect(mongoUri);
  console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  return conn;
};

// Close the connection on shutdown.
const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
};

module.exports = { connectDB, disconnectDB };
