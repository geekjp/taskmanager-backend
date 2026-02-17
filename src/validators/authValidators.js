import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Auth Validation Rules
|--------------------------------------------------------------------------
| These rules validate incoming request data
| BEFORE it reaches the controller.
*/

export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
];

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];
