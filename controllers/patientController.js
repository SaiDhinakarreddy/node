// patientController.js
const db = require('../database/db');

exports.getPatientsForToday = (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const query = 'SELECT * FROM patient WHERE DATE(appointment_date) = ?';

    db.query(query, [today], (err, results) => {
        if (err) {
            console.error('Error retrieving patients for today', err);
            res.status(500).json({ message: 'Error retrieving patients for today' });
            return;
        }
        res.json(results);
    });
};
