import express from "express";
import cors from "cors";

// Feature route modules
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Middleware
import protect from "./middleware/authMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";

// Create the Express application instance
// This `app` object represents your backend server
const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
| These middleware run for EVERY incoming request
*/

// Enables Cross-Origin Resource Sharing
// Allows frontend (React / Postman) to communicate with backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);


// Parses incoming JSON request bodies
// Attaches parsed data to req.body
// If invalid JSON is sent, request fails here
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Route Mounting (Feature Modules)
|--------------------------------------------------------------------------
| app.use() is used to CONNECT route modules to base URLs
*/

// Any request starting with /api/auth
// is forwarded to authRoutes (login, register, etc.)
app.use("/api/auth", authRoutes);

/*
|--------------------------------------------------------------------------
| Basic Routes
|--------------------------------------------------------------------------
*/

// Health check route
// Used to verify server is running
app.get("/", (req, res) => {
  res.send("API is running...");
});


/*
|--------------------------------------------------------------------------
| Task Routes
|--------------------------------------------------------------------------
| All task-related APIs are grouped under /api/tasks
| Authentication is handled inside taskRoutes using router.use(protect)
*/

app.use("/api/tasks", taskRoutes);

/*
|--------------------------------------------------------------------------
| Global Error Handler (MUST BE LAST)
|--------------------------------------------------------------------------
| Catches errors from:
| - Controllers
| - Middleware
| - Async handlers
| Order matters: this must come AFTER all routes
*/

app.use(errorHandler);

// Export app to be used by server.js
export default app;
