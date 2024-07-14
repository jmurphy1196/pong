const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD
});


module.exports = {
    redisClient
}