const { 
  modelsGetQuestions, 
  modelsGetAnswers, 
  modelsPostQuestion, 
  modelsPostAnswer, 
  modelsHelpfulQuestion, 
  modelsReportQuestion, 
  modelsHelpfulAnswer, 
  modelsReportAnswer } = require('../models/questions/questions-model');

module.exports = {
  getQuestions: (req, res) => {
    modelsGetQuestions(req.params.product_id, (error, result) => {
      if (error) {
        console.log('Error with getting Questions in Controller: ', error);
        res.sendStatus(500);
      } else {
        res.send(result);
      }
    });
  },
  postQuestion: (req, res) => {
    const params = [req.params.product_id, req.body.body, req.body.asker_name, req.body.asker_email];
    modelsPostQuestion(params, (error, result) => {
      if (error) {
        console.log('Error with posting Questions in Controller: ', error);
        res.sendStatus(500);
      } else {
        res.send();
      }
    });
  },
  helpfulQuestion: (req, res) => {
    modelsHelpfulQuestion(req.params.question_id, (error, result) => {
      if (error) {
        console.log('Error with updating helpful question: ', error);
      } else {
        res.send();
      }
    });
  },
  reportQuestion: (req, res) => {
    modelsReportQuestion(req.params.question_id, (error, result) => {
      if (error) {
        console.log('Error with reporting question: ', error);
      } else {
        res.send();
      }
    });
  },
  getAnswers: (req, res) => {
    modelsGetAnswers(req.params.question_id, (error, result) => {
      if (error) {
        console.log('Error with getting Questions in Controller: ', error);
        res.sendStatus(500);
      } else {
        res.send(result);
      }
    });
  },
  postAnswer: (req, res) => {
    const params = [req.params.question_id, req.body.body, req.body.answerer_name, req.body.answerer_email];
    modelsPostAnswer(params, (error, result) => {
      if (error) {
        console.log('Error with posting Questions in Controller: ', error);
        res.sendStatus(500);
      } else {
        res.send();
      }
    });
  },
  helpfulAnswer: (req, res) => {
    modelsHelpfulAnswer(req.params.answer_id, (error, result) => {
      if (error) {
        console.log('Error with updating helpful question: ', error);
      } else {
        res.send();
      }
    });
  },
  reportAnswer: (req, res) => {
    modelsReportAnswer(req.params.answer_id, (error, result) => {
      if (error) {
        console.log('Error with reporting question: ', error);
      } else {
        res.send();
      }
    });
  }
};