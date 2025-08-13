const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json("You must be logged in to perform this action.");
};

module.exports = {
  isAuthenticated
};