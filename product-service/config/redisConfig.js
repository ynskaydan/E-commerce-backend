const redis = require('redis');
require('dotenv').config();
const redisClient = redis.createClient({
    host: process.env.host, 
    port: 6379 
});

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

module.exports = redisClient;