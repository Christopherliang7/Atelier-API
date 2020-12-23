const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient({
  host: 'redis',
  port: REDIS_PORT
});

client.on('connect', () => {
  console.log(`Connected to Redis on port ${REDIS_PORT}!`);
});

const cacheQuestions = (req, res, next) => {
  const { product_id } = req.params;
  client.get(`Question ${product_id}`, (error, data) => {
    if (error) { throw error; }
    if (data !== null) {
      let result = JSON.parse(data);
      res.json(result);
    } else {
      next();
    }
  });
};

const cacheAnswers = (req, res, next) => {
  const { question_id } = req.params;
  client.get(`Answer ${question_id}`, (error, data) => {
    if (error) { throw error; }
    if (data !== null) {
      let result = JSON.parse(data);
      res.json(result);
    } else {
      next();
    }
  });
};

module.exports = { client, cacheQuestions, cacheAnswers }; 