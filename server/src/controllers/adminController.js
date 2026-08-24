const { Enquiry, Project, User, Message, Service, BlogPost } = require('../models');

const getDashboardStats = async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'New' });
    const inProgressEnquiries = await Enquiry.countDocuments({ status: 'In Progress' });
    const completedEnquiries = await Enquiry.countDocuments({ status: 'Completed' });

    const totalProjects = await Project.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalMessages = await Message.countDocuments();
    const unreadMessages = await Message.countDocuments({ isRead: false });
    const totalServices = await Service.countDocuments();
    const totalBlogPosts = await BlogPost.countDocuments();

    const enquiryStatusBreakdown = await Enquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const latestEnquiries = await Enquiry.find()
      .populate('user', 'name email avatar')
      .sort('-createdAt')
      .limit(5);

    const latestMessages = await Message.find().sort('-createdAt').limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalEnquiries,
        newEnquiries,
        inProgressEnquiries,
        completedEnquiries,
        totalProjects,
        totalUsers,
        totalMessages,
        unreadMessages,
        totalServices,
        totalBlogPosts,
      },
      enquiryStatusBreakdown,
      latestEnquiries,
      latestMessages,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort('-createdAt');
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { role, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, name },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUser,
  deleteUser,
};
