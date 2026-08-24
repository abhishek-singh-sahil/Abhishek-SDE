const { Enquiry } = require('../models');

const createEnquiry = async (req, res) => {
  const {
    projectType,
    description,
    budget,
    timeline,
    referenceWebsite,
    attachmentUrl,
    preferredContact,
    guestInfo,
  } = req.body;

  try {
    let userRef;
    let finalGuestInfo;

    if (req.user) {
      userRef = req.user._id;
    } else {
      if (!guestInfo || !guestInfo.name || !guestInfo.email) {
        return res.status(400).json({
          success: false,
          message: 'Please login or provide contact details (name and email) to start a project.',
        });
      }
      finalGuestInfo = guestInfo;
    }

    const newEnquiry = new Enquiry({
      user: userRef,
      guestInfo: finalGuestInfo,
      projectType,
      description,
      budget,
      timeline,
      referenceWebsite,
      attachmentUrl,
      preferredContact,
      status: 'New',
      timelineEvents: [
        {
          status: 'Submitted',
          note: 'Enquiry submitted successfully.',
          updatedBy: req.user ? req.user.name : guestInfo.name,
          timestamp: new Date(),
        },
      ],
    });

    await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully!',
      data: newEnquiry,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getMyEnquiries = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const enquiries = await Enquiry.find({ user: req.user._id }).sort('-createdAt');
    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getMyEnquiryDetails = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const enquiry = await Enquiry.findOne({ _id: req.params.id, user: req.user._id });
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('user', 'name email avatar')
      .sort('-createdAt');
    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateEnquiryStatus = async (req, res) => {
  const { status, adminNotes, timelineNote } = req.body;

  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    const oldStatus = enquiry.status;

    if (adminNotes !== undefined) {
      enquiry.adminNotes = adminNotes;
    }

    if (status && status !== oldStatus) {
      enquiry.status = status;
      enquiry.timelineEvents.push({
        status,
        note: timelineNote || `Status updated from ${oldStatus} to ${status}.`,
        updatedBy: req.admin ? req.admin.username : 'Admin',
        timestamp: new Date(),
      });
    }

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createEnquiry,
  getMyEnquiries,
  getMyEnquiryDetails,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
