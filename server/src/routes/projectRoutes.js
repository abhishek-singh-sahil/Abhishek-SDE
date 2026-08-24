const express = require('express');
const router = express.Router();
const { Project } = require('../models');
const { protectAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const {
  getAll,
  getOne,
  getOneBySlug,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/genericController');

// Public routes
router.get('/', getAll(Project, { isPublished: true }));
router.get('/:id', getOne(Project));
router.get('/slug/:slug', getOneBySlug(Project));

// Admin routes
router.get('/admin/all', protectAdmin, getAll(Project));
router.post('/', protectAdmin, createOne(Project));
router.put('/:id', protectAdmin, updateOne(Project));
router.delete('/:id', protectAdmin, deleteOne(Project));

// Image upload route
router.post('/upload', protectAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ success: true, url: fileUrl });
});

module.exports = router;
