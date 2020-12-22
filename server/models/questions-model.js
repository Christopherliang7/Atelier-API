const db = require('../database/qa-database.js').questionsDbConnection;

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
        throw new Error('Problem getting Questions!');
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
        throw new Error('Problem posting Question!');
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
        throw new Error('Problem selecting Question as helpful!');
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
        throw new Error('Problem reporting Question!');
      } else {
        callback(null, result);
      }
    });
  }
};
