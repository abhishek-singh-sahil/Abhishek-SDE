const jwt = require('jsonwebtoken');
const { User, Admin } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecretjwt12345';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'devadminsecretjwt12345';

// Protect normal users (clients)
const protectUser = async (req, res, next) => {
  let token = '';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
  }
};

// Optional user context
const optionalUser = async (req, res, next) => {
  let token = '';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      req.user = user;
    }
    next();
  } catch (error) {
    next();
  }
};

// Protect admin panel endpoints
const protectAdmin = async (req, res, next) => {
  let token = '';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, admin token missing' });
  }

  try {
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Admin account not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized, invalid admin token' });
  }
};

module.exports = {
  protectUser,
  optionalUser,
  protectAdmin,
};
