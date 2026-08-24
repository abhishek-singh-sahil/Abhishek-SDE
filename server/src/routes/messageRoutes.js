const express = require('express');
const router = express.Router();
const { Message } = require('../models');
const { protectAdmin } = require('../middleware/auth');
const {
  createOne,
  getAll,
  updateOne,
  deleteOne,
} = require('../controllers/genericController');

router.post('/', createOne(Message));
router.get('/', protectAdmin, getAll(Message));
router.put('/:id', protectAdmin, updateOne(Message));
router.delete('/:id', protectAdmin, deleteOne(Message));

module.exports = router;
