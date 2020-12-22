const mysql = require('mysql2');
const { mysqlPassword } = require('../config.js');

questionsDbConnection = mysql.createConnection({
  user: 'root',
  password: mysqlPassword,
  database: 'QuestionsAnswers',
  // host: 'mysql1',
  // port: '3306',
});

questionsDbConnection.connect(function (error) {
  if (error) {
    console.log('Error connecting to Questions_Db: ', error);
  } else {
    console.log('Connected to Questions Db!');
  }
});

// questionsDbConnection = mysql.createPool({
//   user: 'root',
//   password: mysqlPassword,
//   database: 'QuestionsAnswers',
//   host: '127.0.0.1',
//   port: '3306',
//   connectionLimit: 10
// });

// questionsDbConnection.getConnection(function (error) {
//   if (error) {
//     console.log('Error connecting to Questions_Db: ', error);
//   } else {
//     console.log('Connected to Questions Db!');
//   }
// });

module.exports = { questionsDbConnection };