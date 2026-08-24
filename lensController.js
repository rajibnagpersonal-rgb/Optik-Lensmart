const Lens = require('../models/Lens');

// @desc Get all lenses
// @route GET /api/lenses
exports.getAllLenses = async (req, res) => {
  try {
    const lenses = await Lens.find({ isAvailable: true }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: lenses.length, data: lenses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc Create new Lens (Admin)
// @route POST /api/lenses
exports.createLens = async (req, res) => {
  try {
    const lens = await Lens.create(req.body);
    res.status(201).json({ success: true, data: lens });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc Update Lens Price / Info (Admin)
// @route PUT /api/lenses/:id
exports.updateLens = async (req, res) => {
  try {
    const lens = await Lens.findOneAndUpdate({ lensId: req.params.id }, req.body, { new: true, runValidators: true });
    if (!lens) return res.status(404).json({ success: false, message: 'Lens not found' });
    res.status(200).json({ success: true, data: lens });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc Delete Lens (Admin)
// @route DELETE /api/lenses/:id
exports.deleteLens = async (req, res) => {
  try {
    const lens = await Lens.findOneAndDelete({ lensId: req.params.id });
    if (!lens) return res.status(404).json({ success: false, message: 'Lens not found' });
    res.status(200).json({ success: true, message: 'Lens deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
