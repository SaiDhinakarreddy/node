// patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Ensure that patientController.getPatientsForToday is properly exported and defined
router.get('/', patientController.getPatientsForToday);

module.exports = router;
