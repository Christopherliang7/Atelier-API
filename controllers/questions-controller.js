const { 
  modelsGetQuestions, 
  modelsPostQuestion, 
  modelsHelpfulQuestion, 
  modelsReportQuestion, 
} = require('../models/questions-model');

module.exports = {
  getQuestions: (req, res) => {
    modelsGetQuestions(req.params.product_id, (error, result) => {
      if (error) {
        console.log('Error with getting Questions in Controller: ', error);
        res.status(500).send('Error with getting questions!');
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
        res.status(500).send('Error with posting questions!');
      } else {
        res.send();
      }
    });
  },

  helpfulQuestion: (req, res) => {
    modelsHelpfulQuestion(req.params.question_id, (error, result) => {
      if (error) {
        console.log('Error with updating helpful question: ', error);
        res.status(500).send('Error selecting question as helpful!');
      } else {
        res.send();
      }
    });
  },

  reportQuestion: (req, res) => {
    modelsReportQuestion(req.params.question_id, (error, result) => {
      if (error) {
        console.log('Error with reporting question: ', error);
        res.status(500).send('Error reporting question!');
      } else {
        res.send();
      }
    });
  }
};