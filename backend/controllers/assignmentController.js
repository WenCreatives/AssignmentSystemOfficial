const Assignment = require('../models/assignment.model');

exports.createAssignment = async (req, res) => {
  try {
    const { title, description, due_date, student_ids } = req.body;
    
    const assignmentId = await Assignment.createAssignment({
      title,
      description,
      created_by: req.user.id,
      due_date
    });

    await Assignment.assignToStudents(assignmentId, student_ids);

    res.status(201).send({ 
      message: 'Assignment created and assigned successfully',
      assignmentId 
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    let assignments;
    if (req.user.role === 'admin') {
      assignments = await Assignment.getAssignmentsForAdmin(req.user.id);
    } else {
      assignments = await Assignment.getAssignmentsForStudent(req.user.id);
    }
    res.send(assignments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getAssignmentSubmissions = async (req, res) => {
  try {
    const submissions = await Assignment.getAssignmentSubmissions(req.params.id);
    res.send(submissions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const { submission_text } = req.body;
    await Assignment.submitAssignment(
      req.user.id,
      req.params.id,
      submission_text
    );
    res.send({ message: 'Assignment submitted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};