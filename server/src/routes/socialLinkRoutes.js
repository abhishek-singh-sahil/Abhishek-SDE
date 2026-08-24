const express = require('express');
const router = express.Router();
const { SocialLink } = require('../models');
const { protectAdmin } = require('../middleware/auth');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/genericController');

router.get('/', getAll(SocialLink, { isActive: true }));
router.get('/admin/all', protectAdmin, getAll(SocialLink));
router.post('/', protectAdmin, createOne(SocialLink));
router.put('/:id', protectAdmin, updateOne(SocialLink));
router.delete('/:id', protectAdmin, deleteOne(SocialLink));

module.exports = router;
