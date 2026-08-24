const express = require('express');
const router = express.Router();
const CmsText = require('../models/CmsText');

// Get text by page
router.get('/:pageKey', async (req, res) => {
  try {
    let doc = await CmsText.findOne({ pageKey: req.params.pageKey });
    if (!doc) {
      doc = await CmsText.create({ pageKey: req.params.pageKey, content: {} });
    }
    res.json({ success: true, data: doc.content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update/Save text live
router.post('/:pageKey', async (req, res) => {
  try {
    const updated = await CmsText.findOneAndUpdate(
      { pageKey: req.params.pageKey },
      { $set: { content: req.body } },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: updated.content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;