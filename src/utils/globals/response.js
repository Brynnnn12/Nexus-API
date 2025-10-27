exports.responseSuccess = (res, statusCode, data, message = "Success") => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

exports.responseError = (res, statusCode, error, message = "Error") => {
  let errorDetail = error;
  if (error instanceof Error) {
    errorDetail = error.stack;
  } else if (!error) {
    errorDetail = message;
  }
  return res.status(statusCode).json({
    status: "error",
    message,
    error: errorDetail,
  });
};

exports.responseNotFound = (res, message = "Not Found") => {
  return res.status(404).json({
    status: "error",
    message,
  });
};
