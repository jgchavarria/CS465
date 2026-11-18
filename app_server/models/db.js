// Database access module: opens the Mongoose connection to MongoDB and
// registers the models. Required once from app.js.
const mongoose = require('mongoose');

// Override with MONGODB_URI (e.g. a MongoDB Atlas string) when needed.
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

mongoose.set('strictQuery', true);

const connect = () => mongoose.connect(dbURI, { serverSelectionTimeoutMS: 5000 });

mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${dbURI}`));
mongoose.connection.on('error', (err) => console.log('Mongoose connection error: ' + err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

// Close the connection cleanly when the process is stopped.
const shutdown = async (msg, exit) => {
  await mongoose.connection.close();
  console.log(`Mongoose disconnected through ${msg}`);
  exit();
};
process.once('SIGUSR2', () => shutdown('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => shutdown('app termination', () => process.exit(0)));
process.on('SIGTERM', () => shutdown('app shutdown', () => process.exit(0)));

// The test suite sets NODE_ENV=test so it doesn't need a running database.
if (process.env.NODE_ENV !== 'test' && !process.env.DB_MANUAL_CONNECT) {
  connect().catch(() => {}); // the 'error' event above already logs the reason
}

// Register the schema(s)
require('./travlr');

module.exports = { mongoose, connect, dbURI };
