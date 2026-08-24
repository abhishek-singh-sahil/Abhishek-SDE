const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const { User, Admin } = require('../models');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'devsecretjwt12345';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'devadminsecretjwt12345';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const signToken = (id, secret) => {
  return jwt.sign({ id }, secret, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ success: false, message: 'Google idToken is required' });
  }

  try {
    let payload;
    
    if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'your-google-oauth-client-id.apps.googleusercontent.com') {
      console.log('Google Client ID not configured. Running mock OAuth login.');
      try {
        const mockData = JSON.parse(idToken);
        payload = {
          email: mockData.email || 'guest@example.com',
          name: mockData.name || 'Mock Guest',
          picture: mockData.avatar || 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Guest',
          sub: 'mock-google-id-' + (mockData.email || 'guest'),
        };
      } catch (err) {
        payload = {
          email: 'guest@example.com',
          name: 'Mock Guest',
          picture: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Guest',
          sub: 'mock-google-id-guest',
        };
      }
    } else {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    }

    if (!payload || !payload.email) {
      return res.status(400).json({ success: false, message: 'Invalid token payload' });
    }

    const { email, name, picture, sub } = payload;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name: name || email.split('@')[0],
        avatar: picture || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${email}`,
        role: 'user',
      });
    } else if (!user.googleId) {
      user.googleId = sub;
      if (picture && !user.avatar) user.avatar = picture;
      await user.save();
    }

    const token = signToken(user._id.toString(), JWT_SECRET);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('OAuth Verification Error:', error);
    res.status(401).json({ success: false, message: 'Google Authentication failed', error: error.message });
  }
};

const registerAdmin = async (req, res) => {
  const { username, email, password, adminKey } = req.body;

  const adminCount = await Admin.countDocuments();
  if (adminCount > 0 && adminKey !== process.env.JWT_SECRET) {
    return res.status(403).json({ success: false, message: 'Registration disabled. Admin already exists.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      username,
      email,
      passwordHash,
      role: 'superadmin',
    });

    const token = signToken(admin._id.toString(), ADMIN_JWT_SECRET);

    res.status(201).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(admin._id.toString(), ADMIN_JWT_SECRET);

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

const getAdminMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: {
      id: req.admin?._id,
      username: req.admin?.username,
      email: req.admin?.email,
      role: req.admin?.role,
    },
  });
};

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      passwordHash,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      role: 'user',
    });

    const token = signToken(user._id.toString(), JWT_SECRET);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(user._id.toString(), JWT_SECRET);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

const logoutAdmin = (req, res) => {
  res.clearCookie('adminToken');
  res.status(200).json({ success: true, message: 'Logged out from Admin successfully' });
};

const changeAdminPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Old and new passwords are required' });
  }

  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect old password' });
    }

    const salt = await bcrypt.genSalt(10);
    admin.passwordHash = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  googleLogin,
  userRegister,
  userLogin,
  registerAdmin,
  adminLogin,
  getMe,
  getAdminMe,
  logoutUser,
  logoutAdmin,
  changeAdminPassword,
};
