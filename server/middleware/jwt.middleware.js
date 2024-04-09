const { expressjwt: jwt } = require("express-jwt");

const secretKey = process.env.JWT_SECRET;
// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: secretKey,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

// Error handling middleware for JWT authentication errors
function jwtErrorHandler(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      // JWT authentication failed
      return res.status(401).json({ error: "Unauthorized" });
    }
    // For other types of errors, pass them to the next middleware
    next(err);
  }

// Export the middleware so that we can use it to create protected routes
module.exports = {isAuthenticated, jwtErrorHandler};
