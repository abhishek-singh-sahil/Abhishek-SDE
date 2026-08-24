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
  changeAdminPassword,
} = require('../controllers/authController');
const { protectUser, protectAdmin } = require('../middleware/auth');

router.post('/google', googleLogin);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/admin/login', adminLogin);
router.post('/admin/register', registerAdmin);
router.put('/admin/change-password', protectAdmin, changeAdminPassword);

router.get('/me', protectUser, getMe);
router.get('/admin/me', protectAdmin, getAdminMe);

router.post('/logout', logoutUser);
router.post('/admin/logout', logoutAdmin);

module.exports = router;
