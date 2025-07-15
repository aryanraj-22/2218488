module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || token !== "your-secret-token") {
    return res.status(401).json({ message: "invalid authorization token" });
  }
  next();
};
