import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import sendResponse from "../utils/sendResponse.js";


/*
|--------------------------------------------------------------------------
| Register User Controller
|--------------------------------------------------------------------------
| @route   POST /api/auth/register
| @access  Public
|
| Handles new user registration
*/

export const registerUser = asyncHandler(async (req, res) => {
  // Extract data sent from client
  const { name, email, password } = req.body;

  /*
  |--------------------------------------------------------------------------
  | 1. Seperate validation removed as now we have common validator
  |--------------------------------------------------------------------------
  |
  */

  /*
  |--------------------------------------------------------------------------
  | 2. Check if User Already Exists
  |--------------------------------------------------------------------------
  | Prevents duplicate accounts using same email
  */
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  /*
  |--------------------------------------------------------------------------
  | 3. Hash Password
  |--------------------------------------------------------------------------
  | Password is never stored in plain text.
  | bcrypt adds salt + hashing for security.
  */
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  /*
  |--------------------------------------------------------------------------
  | 4. Create User in Database
  |--------------------------------------------------------------------------
  */
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  /*
  |--------------------------------------------------------------------------
  | 5. Send Success Response
  |--------------------------------------------------------------------------
  | Password is NOT returned to client
  */
 sendResponse(res, {
  statusCode: 201,
  message: "User registered successfully",
  data: {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  }
});

});

/*
|--------------------------------------------------------------------------
| Login User Controller
|--------------------------------------------------------------------------
| @route   POST /api/auth/login
| @access  Public
|
| Handles user authentication
*/

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  /*
  |--------------------------------------------------------------------------
  | 1.Seperate validation removed as now we have common validator
  |--------------------------------------------------------------------------
  */

  /*
  |--------------------------------------------------------------------------
  | 2. Check if User Exists
  |--------------------------------------------------------------------------
  | Email is normalized to lowercase
  */
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  /*
  |--------------------------------------------------------------------------
  | 3. Compare Password
  |--------------------------------------------------------------------------
  | bcrypt compares plain password with hashed password
  */
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  /*
  |--------------------------------------------------------------------------
  | 4. Generate JWT Token
  |--------------------------------------------------------------------------
  | Token contains user ID and is signed using JWT_SECRET
  */
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  /*
  |--------------------------------------------------------------------------
  | 5. Send Login Response
  |--------------------------------------------------------------------------
  */
 sendResponse(res, {
  message: "Login successful",
  data: {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  }
});

});
