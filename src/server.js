const env = require('./config/env');
const app = require('./app');
const { connectDB, disconnectDB } = require('./config/db');

// Entry point: connect to MongoDB first, then start listening.
const start = async () => {
  try {
    await connectDB(env.mongoUri);

    const server = app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });

    // Graceful shutdown — stop accepting requests, then close the DB connection.
    const shutdown = (signal) => {
      console.log(`\n${signal} received. Shutting down...`);
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown); // Ctrl + C
    process.on('SIGTERM', shutdown); // e.g. hosting platform stop
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
