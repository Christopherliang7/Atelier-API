const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

client.on('connect', () => {
  console.log(`Connected to Redis on port ${REDIS_PORT}!`);
});

module.exports = { client };