const express = require('express');
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// Route: /api/students
router.route('/')
  .post(createStudent)    // Create a new student
  .get(getAllStudents);   // Get all students

// Route: /api/students/:id
router.route('/:id')
  .get(getStudentById)    // Get single student by ID
  .put(updateStudent)     // Update student by ID
  .delete(deleteStudent); // Delete student by ID

module.exports = router;
