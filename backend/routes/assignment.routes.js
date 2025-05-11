const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const assignmentController = require('../controllers/assignmentController');

router.post('/', auth, role('admin'), assignmentController.createAssignment);
router.get('/', auth, assignmentController.getAssignments);
router.get('/:id/submissions', auth, role('admin'), assignmentController.getAssignmentSubmissions);
router.post('/:id/submit', auth, role('student'), assignmentController.submitAssignment);

module.exports = router;