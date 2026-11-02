const Student = require('../models/studentModel');

/**
 * @desc    Create a new student
 * @route   POST /api/students
 * @access  Public
 */
const createStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, branch, semester } = req.body;

    // Check if required fields are present in request body
    if (!name || !rollNumber || !email || !branch || !semester) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, rollNumber, email, branch, semester',
      });
    }

    // Check if a student with the same roll number or email already exists
    const existingStudent = await Student.findOne({
      $or: [{ rollNumber: rollNumber.trim().toUpperCase() }, { email: email.trim().toLowerCase() }],
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this roll number or email already exists',
      });
    }

    // Create new student
    const student = await Student.create({
      name,
      rollNumber,
      email,
      branch,
      semester,
    });

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: student,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    // Handle duplicate key error (code 11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `A student with this ${field} already exists`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating student',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all students
 * @route   GET /api/students
 * @access  Public
 */
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching students',
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single student by ID
 * @route   GET /api/students/:id
 * @access  Public
 */
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    // If the provided ID is not a valid MongoDB ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid student ID format: ${req.params.id}`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching student',
      error: error.message,
    });
  }
};

/**
 * @desc    Update student details
 * @route   PUT /api/students/:id
 * @access  Public
 */
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Find student by ID and update with request body
    // runValidators ensures schema validations run on updates
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true, // returns the updated document instead of the old one
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student not found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid student ID format: ${req.params.id}`,
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `A student with this ${field} already exists`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating student',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a student
 * @route   DELETE /api/students/:id
 * @access  Public
 */
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: student,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid student ID format: ${req.params.id}`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting student',
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
