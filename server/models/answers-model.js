const db = require('../database/qa-database.js').questionsDbConnection;

module.exports = {
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
        console.log('Error with getAnswers query: ', error);
        throw new Error('Problem getting Answers!');
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
        throw new Error('Problem posting Answers!');
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
        throw new Error('Problem selecting Answer as helpful!');
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
        throw new Error('Problem reporting Answer!');
      } else {
        callback(null, result);
      }
    });
  },
};