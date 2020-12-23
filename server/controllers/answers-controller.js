const {
  modelsGetAnswers, 
  modelsPostAnswer, 
  modelsHelpfulAnswer, 
  modelsReportAnswer, 
} = require('../models/answers-model');

const redisClient = require('../database/qa-redis').client;
const { promisify } = require('util');
const getPromise = promisify(redisClient.get).bind(redisClient);

module.exports = {
  getAnswers: (req, res) => {
    const { question_id } = req.params;
    getPromise(`Answers ${question_id}`)
      .then((data) => { 
        if (data !== null) {
          let result = JSON.parse(data);
          res.json(result);
        } else {
          modelsGetAnswers(question_id, (error, result) => {
            if (error) {
              res.status(500).send('Error getting answers!');
            } else {
              redisClient.setex(`Answers ${question_id}`, 3600, JSON.stringify(result));
              res.send(result);
            }
          });
        }
      });
  },

  postAnswer: (req, res) => {
    const params = [req.params.question_id, req.body.body, req.body.answerer_name, req.body.answerer_email];
    modelsPostAnswer(params, (error, result) => {
      if (error) {
        res.status(500).send('Error posting answers!');
      } else {
        res.send();
      }
    });
  },

  helpfulAnswer: (req, res) => {
    modelsHelpfulAnswer(req.params.answer_id, (error, result) => {
      if (error) {
        res.status(500).send('Error selecting answer as helpful!');
      } else {
        res.send();
      }
    });
  },

  reportAnswer: (req, res) => {
    modelsReportAnswer(req.params.answer_id, (error, result) => {
      if (error) {
        res.status(500).send('Error reporting answers!');
      } else {
        res.send();
      }
    });
  }
};