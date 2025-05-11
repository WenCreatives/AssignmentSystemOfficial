const Model = require('./db.model');
const bcrypt = require('bcryptjs');

class User extends Model {
  constructor() {
    super('users');
  }

  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return super.create({
      ...userData,
      password: hashedPassword
    });
  }

  async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  async getStudents() {
    return super.findAll({ role: 'student' });
  }
}

module.exports = new User();