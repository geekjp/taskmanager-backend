import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/*
|--------------------------------------------------------------------------
| Authentication Middleware (Protect Routes)
|--------------------------------------------------------------------------
| This middleware:
| - Checks if request contains a valid JWT token
| - Verifies the token
| - Fetches the logged-in user
| - Attaches user data to req.user
|
| If authentication fails, request is blocked.
*/

const protect = async (req, res, next) => {
  try {
    let token;

    /*
    |--------------------------------------------------------------------------
    | 1. Extract Token from Authorization Header
    |--------------------------------------------------------------------------
    | Expected header format:
    | Authorization: Bearer <JWT_TOKEN>
    */

    // DEBUG: Log all headers (for learning/debugging only)
    console.log("HEADERS RECEIVED:", req.headers);

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Split "Bearer <token>" and extract token part
      token = req.headers.authorization.split(" ")[1];
    }

    // DEBUG: Log extracted token
    console.log("TOKEN EXTRACTED:", token);

    /*
    |--------------------------------------------------------------------------
    | 2. Check if Token Exists
    |--------------------------------------------------------------------------
    | If no token is found, user is not authenticated
    */
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token provided"
      });
    }

    /*
    |--------------------------------------------------------------------------
    | 3. Verify JWT Token
    |--------------------------------------------------------------------------
    | jwt.verify():
    | - Checks token signature
    | - Checks expiration
    | - Decodes payload if valid
    */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // DEBUG: Log decoded token payload
    console.log("DECODED TOKEN:", decoded);

    /*
    |--------------------------------------------------------------------------
    | 4. Fetch User from Database
    |--------------------------------------------------------------------------
    | decoded.id comes from token payload created during login
    | Password is excluded for security reasons
    */
    req.user = await User.findById(decoded.id).select("-password");

    /*
    |--------------------------------------------------------------------------
    | 5. Continue Request Flow
    |--------------------------------------------------------------------------
    | If everything is valid, move to the next middleware or controller
    */
    next();
  } catch (error) {
    /*
    |--------------------------------------------------------------------------
    | Token Verification Failed
    |--------------------------------------------------------------------------
    | Possible reasons:
    | - Invalid token
    | - Expired token
    | - Wrong JWT_SECRET
    */

    // DEBUG: Log JWT error
    console.log("JWT ERROR:", error.message);

    res.status(401).json({
      message: "Not authorized, token failed"
    });
  }
};

export default protect;
