const errorsSender = (err, req, res, next) => {
  const errorCode = err.statusCode || 500;
  const errorMsg = err.message || 'Internal Server Error';
  res.status(errorCode).send({ message: errorMsg });
  next();
};

module.exports = errorsSender;
