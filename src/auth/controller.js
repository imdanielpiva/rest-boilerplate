const Booking = require('../api/bookings');
const signToken = require('./').signToken;

exports.signin = function(request, response, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume

  const token = signToken(req.user._id);

  response
    .status(200)
    .json({ token });
};