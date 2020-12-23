const {
  modelsGetAnswers, 
  modelsPostAnswer, 
  modelsHelpfulAnswer, 
  modelsReportAnswer, 
} = require('../models/answers-model');

const redisClient = require('../database/qa-redis').client;

module.exports = {
  getAnswers: (req, res) => {
    const { question_id } = req.params;
    modelsGetAnswers(question_id, (error, result) => {
      if (error) {
        res.status(500).send('Error getting answers!');
      } else {
        redisClient.setex(`Answer ${question_id}`, 3600, JSON.stringify(result));
        res.send(result);
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