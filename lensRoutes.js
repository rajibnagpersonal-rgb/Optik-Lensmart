const express = require('express');
const router = express.Router();
const Lens = require('../models/Lens');

router.get('/', async (req, res) => {
  try {
    const lenses = await Lens.find({});
    res.json({ success: true, count: lenses.length, data: lenses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/:lensId', async (req, res) => {
  try {
    const updated = await Lens.findOneAndUpdate(
      { lensId: req.params.lensId },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;