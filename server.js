// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Welcome / Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Campus Connect - Student Management System API',
    endpoints: {
      getAllStudents: 'GET /api/students',
      getStudentById: 'GET /api/students/:id',
      createStudent: 'POST /api/students',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id',
    },
  });
});

// Mount student API routes
app.use('/api/students', studentRoutes);

// 404 Fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find route: ${req.method} ${req.originalUrl}`,
  });
});

// Set PORT from environment or fallback to 5000
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
  console.log(` Test the API at: http://localhost:${PORT}`);
});
