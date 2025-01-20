const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // Debug: Log the token and secret
    console.log('Token received:', token);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Log the decoded payload

    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message); // Log error details
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;
