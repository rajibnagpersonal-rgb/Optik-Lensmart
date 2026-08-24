const Content = require('../models/Content');

// @desc Get Dynamic Page Content (Homepage, Terms, HelpDesk)
// @route GET /api/content/:page
exports.getPageContent = async (req, res) => {
  try {
    const content = await Content.findOne({ page: req.params.page });
    if (!content) return res.status(404).json({ success: false, message: 'Content not found' });
    res.status(200).json({ success: true, data: content.data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Update Page Content Live (Admin)
// @route POST /api/content/:page
exports.updatePageContent = async (req, res) => {
  try {
    const content = await Content.findOneAndUpdate(
      { page: req.params.page },
      { data: req.body },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, message: `${req.params.page} updated live!`, data: content.data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
