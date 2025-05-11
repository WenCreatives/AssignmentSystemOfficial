const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const userController = require('../controllers/userController');

router.get('/students', auth, role('admin'), userController.getStudents);
router.put('/:id', auth, userController.updateUser);

module.exports = router;