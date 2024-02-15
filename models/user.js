const db = require('../database/db');

function createUser(user) {
  return new Promise((resolve, reject) => {
    const {
      email,
      phone,
      password,
      Confirm_password,
      First_name,
      Last_name,
      Gender,
      Role,
    } = user;

    if (
      email === undefined ||
      phone === undefined ||
      password === undefined ||
      Confirm_password === undefined ||
      First_name === undefined ||
      Last_name === undefined ||
      Gender === undefined ||
      Role === undefined
    ) {
      // Handle the case where any required parameter is undefined
      reject(new Error('One or more parameters are undefined'));
      return;
    }

    const Updated_on = new Date();

    const registrationTableQuery =
      'INSERT INTO user (email, phone, password, Confirm_password, First_name, Last_name, Gender, Role, Updated_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.execute(
      registrationTableQuery,
      [
        email,
        phone,
        password,
        Confirm_password,
        First_name,
        Last_name,
        Gender,
        Role,
        Updated_on,
      ],
      (err, registrationTableResult) => {
        if (err) {
          console.error('Error executing MySQL query for user:', err);
          reject(err);
          return;
        }

        resolve(registrationTableResult);
      }
    );
  });
}

function loginUser(emailOrPhone, password) {
  return new Promise((resolve, reject) => {
    const loginQuery =
      'SELECT * FROM user WHERE (email = ? OR phone = ?) AND password = ?';

    db.execute(loginQuery, [emailOrPhone, emailOrPhone, password], (err, loginResult) => {
      if (err) {
        console.error('Error executing MySQL query for login:', err);
        reject(err);
        return;
      }

      if (loginResult.length === 1) {
        // Login successful
        const user = loginResult[0];

        // Log the login attempt
        const logLoginQuery =
          'INSERT INTO login_table (user_id, email, phone, password, login_time) VALUES (?, ?, ?, ?, NOW())';

        db.execute(
          logLoginQuery,
          [user.User_Id, user.email, user.phone, password],
          (logErr) => {
            if (logErr) {
              console.error('Error logging login attempt:', logErr);
              // Log error but do not reject the main login promise
            }
          }
        );

        resolve(user);
      } else {
        // No matching user found
        resolve(null);
      }
    });
  });
}

module.exports = { createUser, loginUser };
