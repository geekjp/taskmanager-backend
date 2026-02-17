/*
|--------------------------------------------------------------------------
| Standard API Response Helper
|--------------------------------------------------------------------------
| Ensures all APIs return the same response structure.
*/

const sendResponse = (
  res,
  {
    statusCode = 200,
    success = true,
    message = "Request successful",
    data = null
  }
) => {
  res.status(statusCode).json({
    success,
    message,
    data
  });
};

export default sendResponse;
