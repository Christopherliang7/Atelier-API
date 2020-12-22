const {
  modelsGetAnswers, 
  modelsPostAnswer, 
  modelsHelpfulAnswer, 
  modelsReportAnswer, 
} = require('../models/answers-model');

module.exports = {
  getAnswers: (req, res) => {
    modelsGetAnswers(req.params.question_id, (error, result) => {
      if (error) {
        console.log('Error with getting Answers in Controller: ', error);
        res.status(500).send('Error getting answers!');
      } else {
        res.send(result);
      }
    });
  },

  postAnswer: (req, res) => {
    const params = [req.params.question_id, req.body.body, req.body.answerer_name, req.body.answerer_email];
    modelsPostAnswer(params, (error, result) => {
      if (error) {
        console.log('Error with posting Answers in Controller: ', error);
        res.status(500).send('Error posting answers!');
      } else {
        res.send();
      }
    });
  },

  helpfulAnswer: (req, res) => {
    modelsHelpfulAnswer(req.params.answer_id, (error, result) => {
      if (error) {
        console.log('Error with updating helpful answers: ', error);
        res.status(500).send('Error selecting answer as helpful!');
      } else {
        res.send();
      }
    });
  },

  reportAnswer: (req, res) => {
    modelsReportAnswer(req.params.answer_id, (error, result) => {
      if (error) {
        console.log('Error with reporting answers: ', error);
        res.status(500).send('Error reporting answers!');
      } else {
        res.send();
      }
    });
  }
};