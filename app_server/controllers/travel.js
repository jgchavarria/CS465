const fs = require('fs');
const path = require('path');

/* GET travel view - reads the trip data (JSON) and hands it to the view */
const travelList = (req, res) => {
  const trips = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', 'trips.json'), 'utf8')
  );
  res.render('travel', { title: 'Travel - Travlr Getaways', page: 'travel', trips });
};

module.exports = { travelList };
