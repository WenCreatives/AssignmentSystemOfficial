const Model = require('./db.model');
const pool = require('../config/db');

class Assignment extends Model {
  constructor() {
    super('assignments');
  }

  async createAssignment(assignmentData) {
    return super.create(assignmentData);
  }

  async assignToStudents(assignmentId, studentIds) {
    const values = studentIds.map(studentId => [assignmentId, studentId]);
    await pool.query('INSERT INTO student_assignments (assignment_id, student_id) VALUES ?', [values]);
  }

  async getAssignmentsForStudent(studentId) {
    const [rows] = await pool.query(`
      SELECT a.*, sa.is_completed, sa.completed_at, sa.submission_text, sa.id as student_assignment_id
      FROM assignments a
      JOIN student_assignments sa ON a.id = sa.assignment_id
      WHERE sa.student_id = ?
      ORDER BY a.due_date ASC
    `, [studentId]);
    return rows;
  }

  async getAssignmentsForAdmin(adminId) {
    const [rows] = await pool.query(`
      SELECT a.*, COUNT(sa.student_id) as assigned_count, 
             SUM(sa.is_completed) as completed_count
      FROM assignments a
      LEFT JOIN student_assignments sa ON a.id = sa.assignment_id
      WHERE a.created_by = ?
      GROUP BY a.id
      ORDER BY a.created_at DESC
    `, [adminId]);
    return rows;
  }

  async getAssignmentSubmissions(assignmentId) {
    const [rows] = await pool.query(`
      SELECT u.id as student_id, u.full_name, u.email, 
             sa.is_completed, sa.completed_at, sa.submission_text
      FROM student_assignments sa
      JOIN users u ON sa.student_id = u.id
      WHERE sa.assignment_id = ?
    `, [assignmentId]);
    return rows;
  }

  async submitAssignment(studentId, assignmentId, submissionText) {
    await pool.query(`
      UPDATE student_assignments 
      SET is_completed = TRUE, 
          completed_at = NOW(), 
          submission_text = ?
      WHERE student_id = ? AND assignment_id = ?
    `, [submissionText, studentId, assignmentId]);
  }
}

module.exports = new Assignment();