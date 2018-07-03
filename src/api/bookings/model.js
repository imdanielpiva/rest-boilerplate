const mongoose = require('mongoose');

const { Schema } = mongoose;
const Booking = new Schema({
  customer: {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true },
    phone: {
      number: { type: String, required: true },
      codeCountry: { type: String, required: true }
    },
    // required: true,
  },
  date: { type: Date, required: true },
  service: {
    code: Number,
    description: String,
    type: { type: String, required: true },
    // required: true
  },
  address: {
    state: String,
    latLng: [Number],
    city: { type: String, required: true },
    number: { type: String, required: true },
    country: String,
    street: {
      type: String,
      // required: true
    }
  }
});

module.exports = mongoose.model('booking', Booking);
