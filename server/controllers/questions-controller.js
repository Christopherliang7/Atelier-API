const { 
  modelsGetQuestions, 
  modelsPostQuestion, 
  modelsHelpfulQuestion, 
  modelsReportQuestion, 
} = require('../models/questions-model');

const redisClient = require('../database/qa-redis').client;
const { promisify } = require('util');
const getPromise = promisify(redisClient.get).bind(redisClient);

module.exports = {
  getQuestions: (req, res) => {
    const { product_id } = req.params;
    getPromise(`Question ${product_id}`)
      .then((data) => { 
        if (data !== null) {
          let result = JSON.parse(data);
          res.json(result);
        } else {
          modelsGetQuestions(product_id, (error, result) => {
            if (error) {
              res.status(500).send('Error with getting questions!');
            } else {
              redisClient.setex(`Question ${product_id}`, 3600, JSON.stringify(result));
              res.send(result);
            }
          });
        }
      })
      .catch((error) => console.log('Error with Redis GetQuestions:', error));
  },

  postQuestion: (req, res) => {
    const params = [req.params.product_id, req.body.body, req.body.asker_name, req.body.asker_email];
    modelsPostQuestion(params, (error, result) => {
      if (error) {
        res.status(500).send('Error with posting questions!');
      } else {
        res.send();
      }
    });
  },

  helpfulQuestion: (req, res) => {
    modelsHelpfulQuestion(req.params.question_id, (error, result) => {
      if (error) {
        res.status(500).send('Error selecting question as helpful!');
      } else {
        res.send();
      }
    });
  },

  reportQuestion: (req, res) => {
    modelsReportQuestion(req.params.question_id, (error, result) => {
      if (error) {
        res.status(500).send('Error reporting question!');
      } else {
        res.send();
      }
    });
  },

  getTesting: (req, res) => {
    res.send('loaderio-50cc7d52eb08cd9649d5ad0f65194c0e');
  }
};