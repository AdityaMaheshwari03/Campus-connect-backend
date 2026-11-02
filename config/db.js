const mongoose = require('mongoose');

/**
 * Connects to MongoDB Atlas using the connection string from environment variables.
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error(' Error: MONGO_URI is not defined in your .env file.');
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(` MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
