exports.responseSuccess = (res, statusCode, data, message = "Success") => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

exports.responseError = (res, statusCode, error, message = "Error") => {
  return res.status(statusCode).json({
    status: "error",
    message,
    error,
  });
};

exports.responseNotFound = (res, message = "Not Found") => {
  return res.status(404).json({
    status: "error",
    message,
  });
};
