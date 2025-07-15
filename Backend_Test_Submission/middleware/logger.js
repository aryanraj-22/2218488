module.exports = (req, res, next) => {
  const log = {
    stack: 'backend',
    level: 'info',
    package: 'middleware',
    message: `${req.method} ${req.originalUrl}`
  };
  console.log(JSON.stringify(log));
  next();
};
