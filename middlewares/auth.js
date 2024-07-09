const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ message: 'Invalid token.' });

    req.user = decoded;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).send({ message: 'Access denied. Admins only.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  authenticateToken,
  isAdmin,
};
