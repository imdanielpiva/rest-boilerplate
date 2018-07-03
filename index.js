const config = require('./src/config');
const server = require('./src');
const log = require('debug')('@BOOTSTRAPING');

log('Running');

server.listen(config.port, () => {
  log(`App running. Open up the at localhost:${config.port}`);
});
