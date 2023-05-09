const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later",
  };

  if (err.name === "ValidationError") {
    error.statusCode = StatusCodes.BAD_REQUEST;
    error.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  //Unique email error
  if (err.code && err.code === 11000) {
    error.statusCode = StatusCodes.BAD_REQUEST;
    error.message = `${Object.keys(err.keyValue)} Field has to be unique`;
  }

  res.status(error.statusCode).json({ message: error.message });
};

module.exports = errorHandlerMiddleware;
