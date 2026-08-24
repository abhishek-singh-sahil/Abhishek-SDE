const express = require('express');
const router = express.Router();
const { Service } = require('../models');
const { protectAdmin } = require('../middleware/auth');
const {
  getAll,
  getOne,
  getOneBySlug,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/genericController');

// Public routes
router.get('/', getAll(Service, { isActive: true }));
router.get('/:id', getOne(Service));
router.get('/slug/:slug', getOneBySlug(Service));

// Admin routes
router.get('/admin/all', protectAdmin, getAll(Service));
router.post('/', protectAdmin, createOne(Service));
router.put('/:id', protectAdmin, updateOne(Service));
router.delete('/:id', protectAdmin, deleteOne(Service));

module.exports = router;
