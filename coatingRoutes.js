const express = require('express');
const router = express.Router();
const Coating = require('../models/Coating');

router.get('/', async (req, res) => {
  try {
    const coatings = await Coating.find({});
    res.json({ success: true, count: coatings.length, data: coatings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/:coatingId', async (req, res) => {
  try {
    const updated = await Coating.findOneAndUpdate(
      { coatingId: req.params.coatingId },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;