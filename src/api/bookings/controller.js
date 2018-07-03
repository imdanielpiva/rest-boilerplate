const Booking = require('./model');
const _ = require('lodash');

module.exports = {
  params(request, response, next, id) {
    Booking.findById(id)
      .then((booking) => {
        if (!booking) {
          return next({ ok: false, message: 'NotFound' });
        }
  
        request.booking = booking;
  
        next();
      })
      .catch(next);
  },

  post(request, response, next) {
    const { body: booking } = request;

    Booking.create(booking)
      .then((success) => {
        response
          .status(200)
          .json(success);
      })
      .catch(next);
  },

  getAll(request, response) {
    Booking.find()
      .then((bookings) => {
        response
          .status(200)
          .json(200);
      })
      .catch(next);
  },

  getById(request, response) {
    const { booking } = request;
  
    response
      .status(200)
      .json({ ok: true, data: booking });
  },

  update(request, response, next) {
    const { booking, body: newBooking } = request;
  
    _.merge(booking, newBooking);
  
    booking.save()
      .then((error, success) => {
        if (error) {
          return next(error);
        }
  
        response
          .status(200)
          .json({ ok: true, data: success });
      })
      .catch(next);
  },

  delete(request, response, next) {
    const { category } = request;

    category.remove()
      .then((error, success) => {
        if (error) {
          return next(error);
        }

        response
          .status(200)
          .json({ ok: true, data: success });
      })
      .catch(next);
  }
};
