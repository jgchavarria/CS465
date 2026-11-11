const fs = require('fs');
const path = require('path');

const TRIPS_FILE = path.join(__dirname, '..', 'data', 'trips.json');

/* GET travel view - reads the trip data (JSON) and hands it to the view */
const travelList = (req, res, next) => {
  fs.readFile(TRIPS_FILE, 'utf8', (err, raw) => {
    if (err) return next(err);

    let trips;
    try {
      trips = JSON.parse(raw);
    } catch (parseErr) {
      return next(parseErr);
    }

    res.render('travel', {
      title: 'Travel - Travlr Getaways',
      page: 'travel',
      trips
    });
  });
};

module.exports = { travelList };
