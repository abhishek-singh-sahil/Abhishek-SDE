const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getMyEnquiries,
  getMyEnquiryDetails,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { protectUser, protectAdmin, optionalUser } = require('../middleware/auth');

router.post('/', optionalUser, createEnquiry);
router.get('/me', protectUser, getMyEnquiries);
router.get('/me/:id', protectUser, getMyEnquiryDetails);

router.get('/', protectAdmin, getAllEnquiries);
router.put('/:id', protectAdmin, updateEnquiryStatus);
router.delete('/:id', protectAdmin, deleteEnquiry);

module.exports = router;
