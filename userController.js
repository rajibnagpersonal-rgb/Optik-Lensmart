const User = require('../models/User');

// @desc Google OAuth / Profile Sync
// @route POST /api/users/sync
exports.syncUserProfile = async (req, res) => {
  try {
    const { googleId, name, email, phone, age, address } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        googleId,
        name,
        email,
        phone: phone || '',
        age: age || 24,
        address: address || ''
      });
    } else {
      if (name) user.name = name;
      if (phone) user.phone = phone;
      if (age) user.age = age;
      if (address) user.address = address;
      await user.save();
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc Get Current Profile
// @route GET /api/users/profile
exports.getUserProfile = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User profile not found' });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
