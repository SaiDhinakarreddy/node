// const db = require('../database/db');
// // Get patients for the current date
// async function getPatientsForCurrentDate() {
//   try {
//     const currentDate = new Date().toISOString().split('T')[0];
//     const query = 'SELECT * FROM patient WHERE appointment_date = ?';
//     const [rows] = await db.execute(query, [currentDate]);

//     // console.log('Rows:', rows); 

//     // Check if rows is an array or falsy
//     const patients = Array.isArray(rows) ? rows : (rows ? [rows] : []);

//     return patients;
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     throw error;
//   }
// }

// module.exports = { getPatientsForCurrentDate };
