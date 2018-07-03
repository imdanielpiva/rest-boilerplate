const bodyParser = require('body-parser');
const morgan = require('morgan');

function setMiddlewares(server, options = {}) {
  // server.use(morgan('combined'));
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
}

module.exports = setMiddlewares;
