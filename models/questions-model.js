const mysql = require('mysql2');
const { mysqlPassword } = require('../config.js');

questionsDbConnection = mysql.createConnection({
  user: 'root',
  password: mysqlPassword,
  database: 'QuestionsAnswers',
  // host: 'mysql2sdc',
  port: '3306',
});

questionsDbConnection.connect(function (error) {
  if (error) {
    console.log('Error connecting to Questions_Db: ', error);
  } else {
    console.log('Connected to Questions Db!');
  }
});

const db = questionsDbConnection;

module.exports = {
  modelsGetQuestions: (product_id, callback) => {
    const getQuestionsQuery = `SELECT id, product_id, body, date_written, asker_name, asker_email, reported, helpful
     FROM Questions
     WHERE product_id = ${product_id};`;
    // Initial Query Time:  1615 ms
    // After Indexing: 6.9 ms
    db.query(getQuestionsQuery, (error, result) => {
      if (error) {
        console.log('Error with getQuestions query: ', error);
      } else {
        callback(null, result);
      }
    });
  },
  modelsPostQuestion: (params, callback) => {
    let date = new Date().toISOString().slice(0, 10);
    const postQuestionsQuery = `INSERT INTO Questions (product_id, body, date_written, asker_name, asker_email, reported, helpful)
     VALUES (?, ?, ${JSON.stringify(date)}, ?, ?, 0, 0);`;
    // Initial Query Time: 5610 ms
    // After Indexing: 6.1 ms
    db.query(postQuestionsQuery, params, (error, result) => {
      if (error) {
        console.log('Error with postQuestions query: ', error);
      } else {
        callback(null, result);
      }
    });
  },
  modelsHelpfulQuestion: (question_id, callback) => {
    const putHelpfulQuestionQuery = `UPDATE Questions
     SET helpful = helpful + 1
     WHERE id = ${question_id};`;
    // Query Time After Indexing: 8.2 ms
    db.query(putHelpfulQuestionQuery, (error, result) => {
      if (error) {
        console.log('Error with helpfulQuestions query: ', error);
      } else {
        callback(null, result);
      }
    });
  },
  modelsReportQuestion: (question_id, callback) => {
    const putReportQuestionQuery = `UPDATE Questions
     SET reported = 1
     WHERE id = ${question_id};`;
    // Query Time After Indexing: 5.9 ms
    db.query(putReportQuestionQuery, (error, result) => {
      if (error) {
        console.log('Error with reportQuestions query: ', error);
      } else {
        callback(null, result);
      }
    });
  },
  modelsGetAnswers: (question_id, callback) => {
    const getAnswersQuery = `SELECT *,
      (SELECT JSON_ARRAYAGG((JSON_object('id', Photos.id, 'url', Photos.url)))
	     FROM Photos
       WHERE Photos.answer_id = Answers.id) AS Photos
     FROM Answers
     WHERE Answers.question_id = ${question_id};`;
    // Query Time After Indexing: 6.7 ms
    db.query(getAnswersQuery, (error, result) => {
      if (error) {
        console.log('Error with getQuestions query: ', error);
      } else {
        callback(null, result);
      }
    });
  },
  modelsPostAnswer: (params, callback) => {
    let date = new Date().toISOString().slice(0, 10);
    const postAnswersQuery = 
    `INSERT INTO Answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
    VALUES (?, ?, ${JSON.stringify(date)}, ?, ?, 0, 0);`;
    // Query Time After Indexing: 8.1 ms
    db.query(postAnswersQuery, params, (error, result) => {
      if (error) {
        console.log('Error with postAnswers query: ', error);
      } else {
        callback(null, result);
      }
    });
  },
  modelsHelpfulAnswer: (answer_id, callback) => {
    const putHelpfulAnswerQuery = `UPDATE Answers
     SET helpful = helpful + 1
     WHERE id = ${answer_id};`;
    // Query Time After Indexing: 10 ms
    db.query(putHelpfulAnswerQuery, (error, result) => {
      if (error) {
        console.log('Error with helpfulAnswer query: ', error);
      } else {
        callback(null, result);
      }
    });
  },
  modelsReportAnswer: (answer_id, callback) => {
    const putReportAnswerQuery = `UPDATE Answers
     SET reported = 1
     WHERE id = ${answer_id};`;
    // Query Time After Indexing: 8.2 ms
    db.query(putReportAnswerQuery, (error, result) => {
      if (error) {
        console.log('Error with reportAnswer query: ', error);
      } else {
        callback(null, result);
      }
    });
  },
};
