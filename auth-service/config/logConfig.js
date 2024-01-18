const winston = require('winston');
require('dotenv').config();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log'})
  ]
});

module.exports = logger;