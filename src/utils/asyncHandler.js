/*
|--------------------------------------------------------------------------
| asyncHandler Utility
|--------------------------------------------------------------------------
| This function removes the need to write try/catch blocks
| inside every async controller.
|
| It automatically catches any error thrown inside an async
| function and forwards it to the global error handler.
*/

const asyncHandler = (fn) => {
  /*
  | fn = async controller function
  | Example:
  | async (req, res) => { ... }
  */

  return (req, res, next) => {
    /*
    | Promise.resolve():
    | - Executes the async function
    | - Converts returned value into a promise
    |
    | .catch(next):
    | - If any error occurs,
    |   it passes the error to Express using next(error)
    */
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
