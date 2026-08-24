const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models');
const { protectAdmin } = require('../middleware/auth');
const {
  getAll,
  getOne,
  getOneBySlug,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/genericController');

router.get('/', getAll(BlogPost, { status: 'Published' }));
router.get('/:id', getOne(BlogPost));
router.get('/slug/:slug', getOneBySlug(BlogPost));

router.get('/admin/all', protectAdmin, getAll(BlogPost));
router.post('/', protectAdmin, createOne(BlogPost));
router.put('/:id', protectAdmin, updateOne(BlogPost));
router.delete('/:id', protectAdmin, deleteOne(BlogPost));

module.exports = router;
