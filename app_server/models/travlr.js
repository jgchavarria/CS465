// Trip schema/model. Collection name: "trips".
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code:        { type: String, required: [true, 'Trip code is required'], unique: true, index: true, trim: true, uppercase: true,
                 match: [/^[A-Z]{4}\d{6}$/, 'Trip code must be 4 letters + 6 digits (e.g. GALR210215)'] },
  name:        { type: String, required: [true, 'Trip name is required'], index: true, trim: true, maxlength: 100 },
  length:      { type: String, required: [true, 'Trip length is required'], trim: true },
  start:       { type: Date,   required: [true, 'Start date is required'] },
  resort:      { type: String, required: [true, 'Resort is required'], trim: true },
  perPerson:   { type: Number, required: [true, 'Price per person is required'], min: [0, 'Price cannot be negative'] },
  image:       { type: String, required: [true, 'Image file name is required'], trim: true },
  description: { type: [String], required: [true, 'Description is required'],
                 validate: { validator: (v) => v.length > 0, message: 'Description needs at least one paragraph' } }
});

module.exports = mongoose.model('trips', tripSchema);
