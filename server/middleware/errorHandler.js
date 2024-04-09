const errorHandler = (err, req, res, next) => {
    // Check if the error is a JWT authentication error
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Handle other types of errors
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  module.exports = errorHandler;