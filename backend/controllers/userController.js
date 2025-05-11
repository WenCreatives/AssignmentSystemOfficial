const User = require('../models/user.model');

exports.getStudents = async (req, res) => {
  try {
    const students = await User.getStudents();
    res.send(students);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email } = req.body;

    await pool.query(
      'UPDATE users SET full_name = ?, email = ? WHERE id = ?',
      [full_name, email, id]
    );

    res.send({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};