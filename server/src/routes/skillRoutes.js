const express = require('express');
const router = express.Router();
const { Skill } = require('../models');
const { protectAdmin } = require('../middleware/auth');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/genericController');

// Public routes
router.get('/', getAll(Skill));
router.get('/:id', getOne(Skill));

// Admin routes
router.post('/', protectAdmin, createOne(Skill));
router.put('/:id', protectAdmin, updateOne(Skill));
router.delete('/:id', protectAdmin, deleteOne(Skill));

module.exports = router;
