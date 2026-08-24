const express = require('express');
const router = express.Router();
const {
  googleLogin,
  userRegister,
  userLogin,
  adminLogin,
  registerAdmin,
  getMe,
  getAdminMe,
  logoutUser,
  logoutAdmin,
} = require('../controllers/authController');
const { protectUser, protectAdmin } = require('../middleware/auth');

router.post('/google', googleLogin);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/admin/login', adminLogin);
router.post('/admin/register', registerAdmin);

router.get('/me', protectUser, getMe);
router.get('/admin/me', protectAdmin, getAdminMe);

router.post('/logout', logoutUser);
router.post('/admin/logout', logoutAdmin);

module.exports = router;
