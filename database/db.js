const mysql = require('mysql2');




// const mysql = require('mysql2/promise');

// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'Gitam@2019',
//   database: 'myhealth_local',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });


// db.getConnection()
//   .then((connection) => {
//     console.log('Connected to MySQL database');
//     connection.release();
//   })
//   .catch((error) => {
//     console.error('Error connecting to MySQL database:', error);
//   });

// module.exports = db;
 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gitam@2019',
    database: 'myhealth_local',
});
 
db.connect((err) => { 
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});
 
module.exports = db;