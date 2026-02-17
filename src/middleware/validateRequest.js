import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Validation Result Middleware
|--------------------------------------------------------------------------
| Collects validation errors and stops request if invalid.
*/

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  // If validation errors exist
  if (!errors.isEmpty()) {
    // Send first validation error message
    throw new AppError(errors.array()[0].msg, 400);
  }

  // No validation errors → continue
  next();
};

export default validateRequest;
