/*
|--------------------------------------------------------------------------
| Global Error Handling Middleware
|--------------------------------------------------------------------------
| This middleware catches ALL errors passed via next(error).
|
| It must be the LAST middleware in app.js.
*/

const errorHandler = (err, req, res, next) => {
  /*
  | If error has a statusCode (AppError),
  | use it. Otherwise default to 500 (Server Error).
  */
  const statusCode = err.statusCode || 500;

  /*
  | Send standardized JSON error response
  | This ensures frontend always receives
  | predictable error format.
  */
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error"
  });
};

export default errorHandler;


/* ***How error flow works****
Controller
  ↓ throw new AppError()
asyncHandler
  ↓ next(error)
errorHandler
  ↓ JSON response
asyncHandler catches errors → AppError creates errors → errorHandler sends errors

*/