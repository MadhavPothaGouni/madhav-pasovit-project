const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("ERROR: MONGO_URI is not set in .env. Please set it.");
    process.exit(1);
  }

  try {
    // Mask username/password in logs for safety
    const masked = uri.replace(/:\/\/(.*?):(.*?)@/, '://<user>:<pass>@');
    console.log("Connecting to MongoDB:", masked);

    // Modern mongoose — no need for useNewUrlParser/useUnifiedTopology
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
