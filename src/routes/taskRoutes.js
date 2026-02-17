import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import { createTaskValidation, updateTaskValidation } from "../validators/taskValidators.js";
import validateRequest from "../middleware/validateRequest.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // protect all routes below

router.route("/")
  .post(createTaskValidation, validateRequest, createTask)
  .get(getTasks);

router.route("/:id")
  .put(updateTaskValidation, validateRequest, updateTask)
  .delete(deleteTask);
//Flow after apply validation Route → Validation Rules → validateRequest(middleware) → Controller
export default router;
