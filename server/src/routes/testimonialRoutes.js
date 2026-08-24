const express = require('express');
const router = express.Router();
const { Testimonial } = require('../models');
const { protectAdmin } = require('../middleware/auth');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/genericController');

// Public routes
router.get('/', getAll(Testimonial, { isPublished: true }));

// Admin routes
router.get('/admin/all', protectAdmin, getAll(Testimonial));
router.post('/', protectAdmin, createOne(Testimonial));
router.put('/:id', protectAdmin, updateOne(Testimonial));
router.delete('/:id', protectAdmin, deleteOne(Testimonial));

module.exports = router;
