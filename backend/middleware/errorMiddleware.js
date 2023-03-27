const ApiErrorClass = require('../error/ApiError');

const errorHandler = (err, req, res, next) => {

  if (err instanceof ApiErrorClass) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }
  if (!err.message) err.message = 'Something went wrong';

  res.status(500).json({ error: err.message });
}

module.exports = errorHandler;
