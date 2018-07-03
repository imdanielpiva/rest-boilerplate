const log = require('debug')('@ERROR REPORTER');

function reporter(error, request, response, next) {
  log('there was an werror');
  log(error);

  if (error.name === 'UnauthorizedError') {
    response
      .status(401)
      .send('Invalid token');

    return;
  }

  response
    .status(500)
    .send();
}

module.exports = reporter;
