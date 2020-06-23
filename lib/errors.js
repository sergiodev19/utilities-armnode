class AssertionError extends Error {
  constructor(message) {
    super();
    this.statusCode = 500;
    this.message = message;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.statusCode = 404;
    this.message = message;
  }
}

class AccessError extends Error {
  constructor(message) {
    super();
    this.statusCode = 403;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(statusCode || 500).json({
    success: false,
    data: null,
    message
  });
};

module.exports = {
  AssertionError,
  NotFoundError,
  AccessError,
  errorHandler
};