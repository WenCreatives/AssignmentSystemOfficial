const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.send({
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        full_name: user.full_name,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, password, role, full_name, email } = req.body;
    
    // Prevent creating admin accounts through signup
    if (role === 'admin') {
      return res.status(403).send({ error: 'Cannot create admin account' });
    }

    const userId = await User.createUser({
      username,
      password,
      role: role || 'student',
      full_name,
      email
    });

    const user = await User.findOne({ id: userId });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).send({
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        full_name: user.full_name,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};