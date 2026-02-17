import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Task Validation Rules
|--------------------------------------------------------------------------
| These rules validate task-related request data
| BEFORE it reaches the controller.
*/

// Validation for creating a task
export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Task title is required"),

  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be either pending or completed")
];

// Validation for updating a task
export const updateTaskValidation = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Task title cannot be empty"),

  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be either pending or completed")
];
