const userModel = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const result = await userModel.createUser(req.body);
    res.status(201).json({ message: 'User registered successfully', result });
  } catch (error) {
    console.error(error);
    if (error instanceof UserExistsError) { 
      res.status(401).json({ error: 'User already exists' });
  } else {
      res.status(500).json({ error: 'Internal server error' });
  }
  //   res.status(500).json({ error: 'user already exits' });
  }
};

exports.loginUser = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    const user = await userModel.loginUser(emailOrPhone, password);

    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

