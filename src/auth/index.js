const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../api/bookings/model');
const config = require('../config');

const checkToken = expressJwt({ secret: config.secrets.jwt });

modules.exports = {
  decodeToken() {
    return (req, res, next) => {
      // make it optional to place token on query string
      // if it is, place it on the headers where it should be
      // so checkToken can see it. See follow the 'Bearer 034930493' format
      // so checkToken can see it and decode it
  
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
  
      // this will call next if token is valid
      // and send error if its not. It will attached
      // the decoded token to req.user
      checkToken(req, res, next);
    };
  },

  getFreshUser() {
    return (req, res, next) => {
      User.findById(req.user._id)
        .then(function(user) {
          if (!user) {
            // if no user is found it was not
            // it was a valid JWT but didn't decode
            // to a real user in our DB. Either the user was deleted
            // since the client got the JWT, or
            // it was a JWT from some other source
            res.status(401).send('Unauthorized');
          } else {
            // update req.user with fresh user from
            // stale token data
            req.user = user;
            next();
          }
        }, function(err) {
          next(err);
        });
    }
  },

  verifyUser() {
    return function(req, res, next) {
      const { username, password } = req.body;
  
      // if no username or password then send
      if (!username || !password) {
        res.status(400).send('You need a username and password');
        return;
      }
  
      // look user up in the DB so we can check
      // if the passwords match for the username
  
      User.findOne({ username })
        .then((user) => {
          if (!user) {
            res.status(401).send('No user with the given username');
          } else {
            // checking the passowords here
            if (!user.authenticate(password)) {
              res.status(401).send('Wrong password');
            } else {
              // if everything is good,
              // then attach to req.user
              // and call next so the controller
              // can sign a token from the req.user._id
              req.user = user;
              next();
            }
          }
        })
        .catch(next);
    }
  },

  // util method to sign tokens on signup

  signToken(id) {
    return jwt.sign(
      { _id: id },
      config.secrets.jwt,
      { expiresInMinutes: config.expireTime }
    );
  }
};
