const Coating = require('../models/Coating');

// @desc Get all coatings
// @route GET /api/coatings
exports.getAllCoatings = async (req, res) => {
  try {
    const coatings = await Coating.find({ isAvailable: true }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: coatings.length, data: coatings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Create new Coating (Admin)
// @route POST /api/coatings
exports.createCoating = async (req, res) => {
  try {
    const coating = await Coating.create(req.body);
    res.status(201).json({ success: true, data: coating });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc Update Coating Price / Details (Admin)
// @route PUT /api/coatings/:id
exports.updateCoating = async (req, res) => {
  try {
    const coating = await Coating.findOneAndUpdate({ coatingId: req.params.id }, req.body, { new: true });
    if (!coating) return res.status(404).json({ success: false, message: 'Coating not found' });
    res.status(200).json({ success: true, data: coating });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc Delete Coating (Admin)
// @route DELETE /api/coatings/:id
exports.deleteCoating = async (req, res) => {
  try {
    const coating = await Coating.findOneAndDelete({ coatingId: req.params.id });
    if (!coating) return res.status(404).json({ success: false, message: 'Coating not found' });
    res.status(200).json({ success: true, message: 'Coating removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
