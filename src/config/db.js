import mongoose from "mongoose";

/*
|--------------------------------------------------------------------------
| MongoDB Connection Utility
|--------------------------------------------------------------------------
| This file is responsible ONLY for connecting the application
| to the MongoDB database using Mongoose.
|
| Keeping DB logic separate makes the app:
| - cleaner
| - easier to maintain
| - easier to test
*/

// Async function to establish database connection
const connectDB = async () => {
  try {
    /*
    |----------------------------------------------------------------------
    | Connect to MongoDB
    |----------------------------------------------------------------------
    | mongoose.connect() establishes a connection to MongoDB.
    | - Connection string is read from environment variables
    | - Returns a promise
    | - await ensures app waits for DB before continuing
    */
    await mongoose.connect(process.env.MONGO_URI);

    // If connection is successful, log confirmation
    console.log("MongoDB connected");
  } catch (error) {
    /*
    |----------------------------------------------------------------------
    | Error Handling
    |----------------------------------------------------------------------
    | If MongoDB connection fails:
    | - Log the error for debugging
    | - Exit the Node.js process
    |
    | Why exit?
    | Running the app without DB connection can cause
    | unpredictable errors and data loss.
    */

    console.error("MongoDB connection failed:", error.message);

    // Exit process with failure code
    process.exit(1);
  }
};

// Export function so it can be used in server.js
export default connectDB;


/* If asked:

“How do you handle MongoDB connection in Node.js?”

You can say:

“I use a separate database utility that connects using Mongoose, reads connection string from environment variables, and exits the process if the connection fails to prevent the app from running in an unstable state.”

That’s a strong professional answer ✅ */