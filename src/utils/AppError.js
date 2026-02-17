/*
|--------------------------------------------------------------------------
| Custom Application Error Class
|--------------------------------------------------------------------------
| Extends the built-in JavaScript Error object.
| Used to create consistent, meaningful application errors.
*/

class AppError extends Error {
  constructor(message, statusCode) {
    // Call parent Error constructor
    super(message);

    // HTTP status code (e.g. 400, 401, 404, 500)
    this.statusCode = statusCode;

    // Flag to identify operational (expected) errors
    // Helps distinguish app errors vs system errors
    this.isOperational = true;

    /*
    | Maintains proper stack trace (optional but recommended)
    | Ensures error stack points to correct place
    */
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
