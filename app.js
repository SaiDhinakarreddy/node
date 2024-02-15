const express = require('express');
const session = require('express-session');
const cors = require('cors');
const uuid = require('uuid').v4;

const app = express();
const port = 9000;

// Set up session secret
const sessionSecret = uuid();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session middleware
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// Import routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes'); 

app.use('/', authRoutes);
app.use('/', patientRoutes); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
