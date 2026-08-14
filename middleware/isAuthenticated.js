// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the route
  }
  // User is not logged in, return 401 Unauthorized
  return res.status(401).json({ message: 'Unauthorized. Please login first.' });
};

module.exports = isAuthenticated;
