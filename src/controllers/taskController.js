import Task from "../models/taskModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import sendResponse from "../utils/sendResponse.js";

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    throw new AppError("Task title is required", 400);
  }

  const task = await Task.create({
    title,
    description,
    user: req.user._id,
  });

  sendResponse(res, {
    statusCode: 201,
    message: "Task created successfully",
    data: {
      task,
    },
  });
});

// @desc    Get logged-in user's tasks
// @route   GET /api/tasks
// @access  Private
/* req.user → comes from authMiddleware
Tasks are always user-specific
No user ID in request body → security best practice */
// @desc    Get logged-in user's tasks (with pagination & filters)
// @route   GET /api/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  // 1. Extract query params with defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;

  // 2. Calculate skip value
  const skip = (page - 1) * limit;

  // 3. Build filter object
  const filter = { user: req.user._id };

  if (status) {
    filter.status = status;
  }

  // 4. Fetch tasks with pagination, filtering & sorting

  //"user" → field name in Task schema
  //"name email" → select ONLY these fields from User
  const tasks = await Task.find(filter)
    .populate("user", "name email")
    .sort({ createdAt: -1 }) // newest first
    .skip(skip)
    .limit(limit);

  // 5. Count total tasks (for frontend pagination)
  const totalTasks = await Task.countDocuments(filter);

  // 6. Send response
  res.status(200).json({
    success: true,
    page,
    limit,
    totalTasks,
    totalPages: Math.ceil(totalTasks / limit),
    tasks,
  });

  sendResponse(res, {
  message: "Tasks fetched successfully",
  data: {
    items: tasks,
    meta: {
      page,
      limit,
      totalItems: totalTasks,
      totalPages: Math.ceil(totalTasks / limit)
    }
  }
});

});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  // 🔐 Ownership check
  //Why use toString() becoz MongoDB ObjectId ≠ JS string Convert both → compare safely
  if (task.user.toString() !== req.user._id.toString()) {
    throw new AppError("Not authorized to update this task", 403);
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;

  const updatedTask = await task.save();

  sendResponse(res, {
  message: "Task updated successfully",
  data: {
    task: updatedTask
  }
});

});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  // 🔐 Ownership check
  if (task.user.toString() !== req.user._id.toString()) {
    throw new AppError("Not authorized to delete this task", 403);
  }

  await task.deleteOne();

 sendResponse(res, {
  message: "Task deleted successfully"
});

});
