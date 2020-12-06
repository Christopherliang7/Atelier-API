const router = require('express').Router();
const QuestionsController = require('../controllers/Questions/questions-controller.js');
// const ReviewsController = require('../controllers/Reviews');

// routing for Questions & Answers
router.get('/qa/:product_id', QuestionsController.getQuestions);
router.get('/qa/:question_id/answers', QuestionsController.getAnswers);
router.post('/qa/:product_id', QuestionsController.postQuestion);
router.post('/qa/:question_id/answers', QuestionsController.postAnswer);
router.put('/qa/question/:question_id/helpful', QuestionsController.helpfulQuestion);
router.put('/qa/question/:question_id/report', QuestionsController.reportQuestion);
router.put('/qa/answer/:answer_id/helpful', QuestionsController.helpfulAnswer);
router.put('/qa/answer/:answer_id/report', QuestionsController.reportAnswer);

// routing for Reviews


module.exports = router;