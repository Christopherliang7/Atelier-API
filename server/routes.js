const router = require('express').Router();
const QuestionsController = require('../controllers/questions-controller.js');
const AnswersController = require('../controllers/answers-controller.js');

// Questions
router.get('/qa/:product_id', QuestionsController.getQuestions);
router.post('/qa/:product_id', QuestionsController.postQuestion);
router.put('/qa/question/:question_id/helpful', QuestionsController.helpfulQuestion);
router.put('/qa/question/:question_id/report', QuestionsController.reportQuestion);

// Answers
router.get('/qa/:question_id/answers', AnswersController.getAnswers);
router.post('/qa/:question_id/answers', AnswersController.postAnswer);
router.put('/qa/answer/:answer_id/helpful', AnswersController.helpfulAnswer);
router.put('/qa/answer/:answer_id/report', AnswersController.reportAnswer);

module.exports = router;
