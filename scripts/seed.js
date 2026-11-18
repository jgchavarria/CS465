// Loads app_server/data/trips.json into the "trips" collection through the
// Trip model (so every document is validated and dates are stored as Dates).
// Usage: npm run seed      (replaces all existing trips)
const fs = require('fs');
const path = require('path');
process.env.DB_MANUAL_CONNECT = '1'; // scripts connect explicitly below
const { mongoose, connect } = require('../app_server/models/db');
const Trip = mongoose.model('trips');
mongoose.set('bufferCommands', false);

const file = path.join(__dirname, '..', 'app_server', 'data', 'trips.json');

(async () => {
  try {
    await connect();
    const trips = JSON.parse(fs.readFileSync(file, 'utf8'));
    await Trip.deleteMany({});
    const saved = await Trip.insertMany(trips);
    console.log(`Inserted ${saved.length} trips`);
  } catch (err) {
    console.error('Seed failed: ' + err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
})();
