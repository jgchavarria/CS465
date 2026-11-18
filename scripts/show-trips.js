// Retrieves every trip from MongoDB and prints it as JSON (optionally one code).
// Usage: npm run trips   |   node scripts/show-trips.js GALR210215
process.env.DB_MANUAL_CONNECT = '1'; // scripts connect explicitly below
const { mongoose, connect } = require('../app_server/models/db');
const Trip = mongoose.model('trips');
mongoose.set('bufferCommands', false);

(async () => {
  try {
    await connect();
    const query = process.argv[2] ? { code: process.argv[2].toUpperCase() } : {};
    console.log(JSON.stringify(await Trip.find(query).lean(), null, 2));
  } catch (err) {
    console.error('Query failed: ' + err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
})();
