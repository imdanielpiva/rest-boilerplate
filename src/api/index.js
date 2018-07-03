const express = require('express');
const bookings = require('./bookings');

const router = express.Router();

router.use(bookings.path, bookings.router);

module.exports = { path: '/', router };
