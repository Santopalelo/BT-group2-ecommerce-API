const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  console.log(err.message);
  return res.status(status).json(err.message || `server error`);
};

module.exports = errorHandler;
